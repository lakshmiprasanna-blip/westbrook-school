import { NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import mammoth from "mammoth";
export const maxDuration = 60;
export const dynamic = 'force-dynamic';


const DATA_DIR     = path.join(process.cwd(), "persistent-data");
const BLOGS_JSON   = path.join(DATA_DIR, "blogsData.json");
const PUBLIC_BLOGS = path.join(process.cwd(), "public", "assets", "blogs");

// ─── Helpers ──────────────────────────────────────────────────────────────────

function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function readBlogsJson() {
  try {
    if (!existsSync(BLOGS_JSON)) return {};
    return JSON.parse(await readFile(BLOGS_JSON, "utf-8"));
  } catch {
    return {};
  }
}

async function writeBlogsJson(data) {
  if (!existsSync(DATA_DIR)) await mkdir(DATA_DIR, { recursive: true });
  await writeFile(BLOGS_JSON, JSON.stringify(data, null, 2), "utf-8");
}

// ─── Decode HTML entities that mammoth escapes when you type tags in Word ────
function decodeInlineTags(str) {
  return str
    .replace(/&lt;(\/?(strong|em|a|br|span|u|s|b|i)(\s[^&]*)?)&gt;/gi, "<$1>")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"');
}

// ─── Strip only block-level tags, KEEP <strong> <a> <em> ─────────────────────
function stripBlockTags(html) {
  return decodeInlineTags(
    html
      .replace(/<\/?p[^>]*>/gi, "")
      .replace(/<br\s*\/?>/gi, " ")
      .trim()
  );
}

// ─── Plain text only (used for headings / meta / FAQ lines) ──────────────────
function toPlainText(html) {
  return html.replace(/<[^>]+>/g, "").trim();
}

// ─── Strip the ( H2) / (H3) / ( H1) markers from text ───────────────────────
// Your Word doc writes: "A Great School ( H2)" or "Question text (H3)"
// We strip that suffix so stored text is clean: "A Great School"
function stripHMarker(text) {
  return text.replace(/\s*\(\s*H[1-6]\s*\)\s*$/i, "").trim();
}

// ─── FAQ heading detector ─────────────────────────────────────────────────────
// Matches: "FAQs", "FAQ", "FAQs ( H2)", "FAQ (H2)" etc.
function isFaqHeading(text) {
  const t = text.trim().toLowerCase().replace(/['''`]/g, "'");
  return (
    /^faqs?'?s?$/.test(t) ||                          // faq, faqs, faq's
    /^frequently\s+asked\s+questions?$/.test(t) ||    // frequently asked questions
    /^frequently\s+asked\s+q\s*(&|and)\s*a$/.test(t) // frequently asked q&a
  );
}
// ─── Extract Meta Title / Meta Description from ALL blocks ───────────────────
// FIX: Your doc puts Title & Meta Description at the BOTTOM, not the top.
// We scan every block in the document instead of only the first one.
function extractMetaFromAllBlocks(blocks, blog) {
  for (const block of blocks) {
    const text = block.text !== undefined ? block.text : toPlainText(block.innerHtml || "");
    const lines = text.split(/\n/).map(l => l.trim()).filter(Boolean);
    for (const line of lines) {
      // Matches "Title : ..." or "Meta Title : ..."
      const mt = line.match(/^(?:Meta\s+)?Title\s*:\s*(.+)/i);
      // Matches "Meta Description : ..." or "Meta Discription : ..." (typo-safe)
      const md = line.match(/^Meta\s+D[ei]s[ck]?ription\s*:\s*(.+)/i);
      if (mt && !blog.metaTitle)       { blog.metaTitle = mt[1].trim(); }
      if (md && !blog.metaDescription) { blog.metaDescription = md[1].trim(); }
    }
  }
  if (blog.metaTitle && !blog.title) blog.title = blog.metaTitle;
}

// ─── Push a FAQ Q+A pair safely ───────────────────────────────────────────────
function pushFaq(blog, question, answerHtml) {
  const q = stripHMarker(question).trim();
  const a = stripBlockTags(answerHtml).trim();
  if (q) blog.faqs.push({ question: q, answer: a });
}

// ─── Parse one block for FAQ content ─────────────────────────────────────────
// Your doc format: question and answer are in ONE <p>, separated by <br/>
//   e.g. <p><strong>What is X? (H3)<br/></strong>The answer text here.</p>
// Returns updated pendingQ
function parseFaqBlock(innerHtml, plainText, blog, pendingQ) {
  // Split on <br> — mammoth puts Q<br/>A in one <p> in your doc
  const brParts = innerHtml
    .split(/<br\s*\/?>/i)
    .map(p => toPlainText(p).trim())
    .filter(Boolean);

  if (brParts.length >= 2) {
    // Both Q and A are in this single paragraph
    if (pendingQ !== null) {
      // Flush any previous dangling question
      blog.faqs.push({ question: stripHMarker(pendingQ).trim(), answer: "" });
    }
    const q = stripHMarker(brParts[0]);  // remove (H3) from question
    const a = brParts.slice(1).join(" ");
    if (q) blog.faqs.push({ question: q, answer: a });
    return null;
  }

  // Single-line paragraph — alternating Q then A pattern
  if (pendingQ === null) {
    return plainText; // this is the question
  } else {
    pushFaq(blog, pendingQ, innerHtml);
    return null;
  }
}

// ─── MAIN PARSER ──────────────────────────────────────────────────────────────
function parseHtmlToBlog(html) {
  const blog = {
    title:           "",
    metaTitle:       "",
    metaDescription: "",
    intro:           "",
    sideImages:      [],
    bannerImage:     "",
    sections:        [],
    faqs:            [],
  };

  // ── Case 1: Word doc uses real Heading styles → mammoth outputs <h3> etc. ──
  // (Your current doc falls into this case)
  if (/<h[1-6][\s>]/i.test(html)) {
    return parseByHtmlTags(html, blog);
  }

  // ── Case 2: Doc uses plain-text (h2) markers inside <p> tags ─────────────
  const paraRe = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  const paras  = [];
  let m;
  while ((m = paraRe.exec(html)) !== null) {
    paras.push({
      innerHtml: m[1],
      plainText: toPlainText(m[1]).trim(),
    });
  }

  if (!paras.length) return blog;

  // Scan ALL paragraphs for meta (may be anywhere in the doc)
  extractMetaFromAllBlocks(paras, blog);

  const firstHeadingIdx = paras.findIndex(p => /\(h[1-6]\)/i.test(p.plainText));
  const metaParas = firstHeadingIdx === -1 ? paras : paras.slice(0, firstHeadingIdx);

  const introLines = [];
  for (const p of metaParas) {
    const isMeta = /^(?:Meta\s+)?Title\s*:/i.test(p.plainText) ||
                   /^Meta\s+D[ei]s[ck]?ription\s*:/i.test(p.plainText);
    if (!isMeta && p.plainText) introLines.push(stripBlockTags(p.innerHtml));
  }

  blog.intro = introLines.length ? introLines.join(" ") : blog.metaDescription;

  if (firstHeadingIdx === -1) return blog;

  let inFaq          = false;
  let pendingQ       = null;
  let currentSection = null;

  for (let i = firstHeadingIdx; i < paras.length; i++) {
    const { innerHtml, plainText } = paras[i];

    // Skip meta lines and divider lines wherever they appear
    if (/^(?:Meta\s+)?Title\s*:/i.test(plainText) ||
        /^Meta\s+D[ei]s[ck]?ription\s*:/i.test(plainText) ||
        /^—[-—]+$/.test(plainText)) continue;

    const headingMatch = plainText.match(/^(.*?)\s*\(h([1-6])\)\s*$/i);

    if (headingMatch) {
      const headingText = headingMatch[1].trim();
      const level       = parseInt(headingMatch[2]);

      if (level === 1) {
        if (!blog.title) blog.title = headingText || blog.metaTitle;
        continue;
      }

      if (isFaqHeading(headingText) || isFaqHeading(plainText)) {
        inFaq = true;
        if (currentSection) { blog.sections.push(currentSection); currentSection = null; }
        continue;
      }

      if (currentSection) blog.sections.push(currentSection);
      currentSection = { heading: headingText, paragraphs: [] };
      inFaq = false;
      pendingQ = null;
      continue;
    }

    if (!plainText) continue;

    if (isFaqHeading(plainText)) {
      inFaq = true;
      if (currentSection) { blog.sections.push(currentSection); currentSection = null; }
      continue;
    }

    if (inFaq) {
      pendingQ = parseFaqBlock(innerHtml, plainText, blog, pendingQ);
      continue;
    }

    const paraContent = stripBlockTags(innerHtml);
    if (!currentSection) {
      blog.intro = blog.intro ? blog.intro + " " + paraContent : paraContent;
    } else {
      currentSection.paragraphs.push(paraContent);
    }
  }

  if (pendingQ !== null) blog.faqs.push({ question: stripHMarker(pendingQ).trim(), answer: "" });
  if (currentSection) blog.sections.push(currentSection);

  return blog;
}

// ── Case 1: Word doc has real Heading styles ──────────────────────────────────
function parseByHtmlTags(html, blog) {
  const blockRe = /<(h[1-6]|p)([^>]*)>([\s\S]*?)<\/\1>/gi;
  const blocks  = [];
  let m;
  while ((m = blockRe.exec(html)) !== null) {
    blocks.push({
      tag:       m[1].toLowerCase(),
      innerHtml: m[3],
      text:      toPlainText(m[3]),
    });
  }
  if (!blocks.length) return blog;

  // FIX 1: Scan ALL blocks for meta — your doc has Title/Meta at the bottom
  extractMetaFromAllBlocks(blocks, blog);

  let currentSection = null;
  const introLines   = [];
  let inFaq          = false;
  let pendingQ       = null;
  let titleFound     = !!blog.title;

  for (let i = 0; i < blocks.length; i++) {
    const { tag, innerHtml, text } = blocks[i];
    const isHeading = /^h[1-6]$/.test(tag);

    // FIX 2: Skip meta lines and dividers wherever they appear
    if (/^(?:Meta\s+)?Title\s*:/i.test(text) ||
        /^Meta\s+D[ei]s[ck]?ription\s*:/i.test(text) ||
        /^—[-—]+$/.test(text)) continue;

    // FIX 3: Strip ( H2) / ( H3) etc. from all text before using it
    const cleanText = stripHMarker(text);

    // H1 heading element — blog display title
    if (tag === "h1" && !titleFound) {
      blog.title = cleanText; titleFound = true; continue;
    }

    // FIX 4: FAQs heading can be a bold <p> like "FAQs ( H2)" not just <h2>
    if (isFaqHeading(cleanText) || isFaqHeading(text)) {
      inFaq = true;
      if (currentSection) { blog.sections.push(currentSection); currentSection = null; }
      continue;
    }

    // Inside FAQ section
    if (inFaq) {
      // FIX 5: Your FAQ Q+A are in one <p> with <br/> between them
      pendingQ = parseFaqBlock(innerHtml, text, blog, pendingQ);
      continue;
    }

    // Section heading (h2, h3, h4 etc.)
    if (isHeading) {
      if (currentSection) blog.sections.push(currentSection);
      // FIX 6: Store heading WITHOUT the ( H2) marker text
      currentSection = { heading: cleanText, paragraphs: [] };
      inFaq = false;
      pendingQ = null;
      continue;
    }

    // Plain paragraph that has (H1) marker — treat as title
    if (/\(\s*H1\s*\)/i.test(text)) {
      if (!titleFound) { blog.title = cleanText; titleFound = true; }
      continue;
    }

    // Regular paragraph
    if (!currentSection) introLines.push(innerHtml.trim());
    else currentSection.paragraphs.push(innerHtml.trim());
  }

  if (pendingQ !== null) blog.faqs.push({ question: stripHMarker(pendingQ).trim(), answer: "" });
  if (currentSection) blog.sections.push(currentSection);
  if (introLines.length && !blog.intro) blog.intro = introLines.join(" ");
  if (!blog.intro && blog.metaDescription) blog.intro = blog.metaDescription;

  return blog;
}

// ─── GET /api/blogs ───────────────────────────────────────────────────────────

export async function GET() {
  try {
    const data = await readBlogsJson();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({}, { status: 500 });
  }
}

// ─── POST /api/blogs ──────────────────────────────────────────────────────────

export async function POST(request) {
  try {
    const formData       = await request.formData();
    const docxFile       = formData.get("docx");
    const bannerFile     = formData.get("banner");
    const sideImageFiles = formData.getAll("sideImages");
    const customSlug     = (formData.get("slug") || "").trim();

    if (!docxFile || docxFile.size === 0) {
      return NextResponse.json({ error: "No .docx file provided" }, { status: 400 });
    }

    const docxBuffer      = Buffer.from(await docxFile.arrayBuffer());
    const { value: html } = await mammoth.convertToHtml({ buffer: docxBuffer });
    const blog            = parseHtmlToBlog(html);

    const slug = customSlug ? titleToSlug(customSlug) : titleToSlug(blog.metaTitle || blog.title);
    if (!slug) {
      return NextResponse.json(
        { error: "Could not determine slug. Ensure Meta Title exists in the doc or set a custom slug." },
        { status: 400 }
      );
    }

    if (!existsSync(PUBLIC_BLOGS)) await mkdir(PUBLIC_BLOGS, { recursive: true });

    const ts = Date.now();

    if (bannerFile && bannerFile.size > 0) {
      const ext  = bannerFile.name.split(".").pop();
      const name = `${slug}-banner-${ts}.${ext}`;
      await writeFile(
        path.join(PUBLIC_BLOGS, name),
        Buffer.from(await bannerFile.arrayBuffer())
      );
      blog.bannerImage = `/assets/blogs/${name}`;
    }

    const savedSide = [];
    for (let i = 0; i < sideImageFiles.length; i++) {
      const img = sideImageFiles[i];
      if (!img || img.size === 0) continue;
      const ext  = img.name.split(".").pop();
      const name = `${slug}-side-${i + 1}-${ts}.${ext}`;
      await writeFile(
        path.join(PUBLIC_BLOGS, name),
        Buffer.from(await img.arrayBuffer())
      );
      savedSide.push(`/assets/blogs/${name}`);
    }
    blog.sideImages = savedSide;

    const existing = await readBlogsJson();
    const isUpdate = !!existing[slug];
    existing[slug] = blog;
    await writeBlogsJson(existing);

    return NextResponse.json({
      success:       true,
      slug,
      isUpdate,
      title:         blog.title,
      metaTitle:     blog.metaTitle,
      intro:         blog.intro,
      sectionsCount: blog.sections.length,
      faqsCount:     blog.faqs.length,
      sideImages:    blog.sideImages,
      bannerImage:   blog.bannerImage,
    });

  } catch (err) {
    console.error("[upload-blog] ERROR:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// ─── PATCH /api/blogs?slug=xxx ────────────────────────────────────────────────

export async function PATCH(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "slug is required" }, { status: 400 });
    }

    const body = await request.json();
    const { title, intro, metaTitle, metaDescription, sections, faqs } = body;

    const existing = await readBlogsJson();

    if (!existing[slug]) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    existing[slug] = {
      ...existing[slug],
      ...(title           !== undefined && { title }),
      ...(intro           !== undefined && { intro }),
      ...(metaTitle       !== undefined && { metaTitle }),
      ...(metaDescription !== undefined && { metaDescription }),
      ...(sections        !== undefined && { sections }),
      ...(faqs            !== undefined && { faqs }),
      updatedAt: new Date().toISOString(),
    };

    await writeBlogsJson(existing);

    return NextResponse.json(existing[slug]);

  } catch (err) {
    console.error("[edit-blog] ERROR:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// ─── DELETE /api/blogs?slug=xxx ───────────────────────────────────────────────

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

    const existing = await readBlogsJson();
    if (!existing[slug]) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

    delete existing[slug];
    await writeBlogsJson(existing);

    return NextResponse.json({ success: true, slug });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}