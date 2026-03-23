import { NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import mammoth from "mammoth";

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

// ─── Strip only block-level tags, KEEP <strong> <a> <em> ─────────────────────
function stripBlockTags(html) {
  return html
    .replace(/<\/?p[^>]*>/gi, "")
    .replace(/<br\s*\/?>/gi, " ")
    .trim();
}

// ─── Plain text only (used for headings / meta / FAQ lines) ──────────────────
function toPlainText(html) {
  return html.replace(/<[^>]+>/g, "").trim();
}

// ─── FAQ exact match: "faq" or "faqs" only ───────────────────────────────────
function isFaqHeading(text) {
  return /^faqs?$/i.test(text.trim());
}

// ─── Extract meta fields from plain text block ────────────────────────────────
function extractMetaFromText(text, blog) {
  if (!text) return;
  const lines = toPlainText(text).split(/\n/).map(l => l.trim()).filter(Boolean);

  for (const line of lines) {
    const mt = line.match(/^Meta\s+Title\s*:\s*(.+)/i);
    const md = line.match(/^Meta\s+D[ei]s[ck]?ription\s*:\s*(.+)/i);
    if (mt) { blog.metaTitle = mt[1].trim(); continue; }
    if (md) { blog.metaDescription = md[1].trim(); continue; }
  }

  // Title always comes from metaTitle
  blog.title = blog.metaTitle;
  blog.intro = blog.metaDescription;
}

// ─── MAIN PARSER ──────────────────────────────────────────────────────────────
//
// Works on raw mammoth HTML output directly.
// Does NOT strip <strong> or <a href> — only strips block tags (<p>, <br>).
//
// Your doc format:
//   Meta Title: ...
//   Meta Description: ...
//
//   Heading text (h2)
//   Paragraph with <strong>bold</strong> and <a href="...">links</a>
//
//   FAQs (h2)
//   Question
//   Answer

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

  // ── Case 1: Word doc has real Heading styles → mammoth outputs <h2> tags ──
  if (/<h[1-6][\s>]/i.test(html)) {
    return parseByHtmlTags(html, blog);
  }

  // ── Case 2: Doc uses (h2) plain-text markers ──────────────────────────────
  // Split the HTML on (hN) markers — BUT keep the HTML intact for paragraphs
  // so <strong> and <a href> are preserved.
  //
  // mammoth outputs each paragraph as <p>...</p>
  // So the HTML looks like:
  //   <p>Meta Title: ...</p>
  //   <p>Meta Description: ...</p>
  //   <p>A Neighbourhood School (h2)</p>
  //   <p>Being located... <strong>bold</strong> <a href="...">link</a></p>
  //   <p>Depth Over Pace (h2)</p>
  //   <p>One thing we noticed...</p>
  //   <p>FAQs (h2)</p>
  //   <p>Question text</p>
  //   <p>Answer text</p>

  // Extract all <p> blocks in order
  const paraRe = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  const paras  = [];
  let m;
  while ((m = paraRe.exec(html)) !== null) {
    paras.push({
      innerHtml: m[1],                      // raw HTML inside <p> — has <strong>, <a>
      plainText: toPlainText(m[1]).trim(),  // plain text — for heading/meta detection
    });
  }

  if (!paras.length) return blog;

  // ── Find meta block: all paras before the first (hN) marker ──────────────
  const firstHeadingIdx = paras.findIndex(p => /\(h[1-6]\)/i.test(p.plainText));
  const metaParas = firstHeadingIdx === -1 ? paras : paras.slice(0, firstHeadingIdx);

  const introLines = [];
  for (const p of metaParas) {
    const mt = p.plainText.match(/^Meta\s+Title\s*:\s*(.+)/i);
    const md = p.plainText.match(/^Meta\s+D[ei]s[ck]?ription\s*:\s*(.+)/i);
    if (mt) { blog.metaTitle = mt[1].trim(); continue; }
    if (md) { blog.metaDescription = md[1].trim(); continue; }
    // Any non-meta para before first heading = intro
    if (p.plainText) introLines.push(stripBlockTags(p.innerHtml));
  }

  // Title always = metaTitle
  blog.title = blog.metaTitle;
  // Intro = explicit paras if any, else fall back to metaDescription
  blog.intro = introLines.length ? introLines.join(" ") : blog.metaDescription;

  if (firstHeadingIdx === -1) return blog;

  // ── Walk remaining paras: headings and content ────────────────────────────
  let inFaq          = false;
  let pendingQ       = null;
  let currentSection = null;

  for (let i = firstHeadingIdx; i < paras.length; i++) {
    const { innerHtml, plainText } = paras[i];

    // ── Is this para a heading? (contains (hN) marker) ──────────────────
    const headingMatch = plainText.match(/^(.*?)\s*\(h([1-6])\)\s*$/i);

    if (headingMatch) {
      const headingText = headingMatch[1].trim();
      const level       = parseInt(headingMatch[2]);

      // H1 → blog title
      if (level === 1) {
        blog.title = headingText || blog.metaTitle;
        continue;
      }

      // FAQ heading
      if (isFaqHeading(headingText)) {
        inFaq = true;
        if (currentSection) { blog.sections.push(currentSection); currentSection = null; }
        continue;
      }

      // Regular section heading
      if (currentSection) blog.sections.push(currentSection);
      currentSection = { heading: headingText, paragraphs: [] };
      inFaq = false;
      continue;
    }

    // ── Regular paragraph ────────────────────────────────────────────────
    if (!plainText) continue;

    // Also detect "FAQs" as a standalone paragraph (no (h2) marker needed)
    if (isFaqHeading(plainText)) {
      inFaq = true;
      if (currentSection) { blog.sections.push(currentSection); currentSection = null; }
      continue;
    }

    if (inFaq) {
      // Each <p> is one Q or A — but sometimes Q+A are in same para separated by newline
      // Split by newline and treat alternating lines as Q then A
      const faqLines = plainText.split(/\n/).map(l => l.trim()).filter(Boolean);
      for (const line of faqLines) {
        if (pendingQ === null) pendingQ = line;
        else {
          blog.faqs.push({ question: pendingQ, answer: line });
          pendingQ = null;
        }
      }
      continue;
    }

    // Normal paragraph — keep innerHtml so <strong> and <a href> are preserved
    const paraContent = stripBlockTags(innerHtml);
    if (!currentSection) {
      // Before any section — append to intro
      blog.intro = blog.intro
        ? blog.intro + " " + paraContent
        : paraContent;
    } else {
      currentSection.paragraphs.push(paraContent);
    }
  }

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
      tag:      m[1].toLowerCase(),
      innerHtml: m[3],
      text:     toPlainText(m[3]),
    });
  }
  if (!blocks.length) return blog;

  // Block 0 = meta
  extractMetaFromText(blocks[0].text, blog);

  let currentSection = null;
  const introLines   = [];
  let inFaq          = false;
  let pendingQ       = null;
  let titleFound     = !!blog.title;

  for (let i = 1; i < blocks.length; i++) {
    const { tag, innerHtml, text } = blocks[i];
    if (!text) continue;
    const isHeading = /^h[1-6]$/.test(tag);

    if (tag === "h1" && !titleFound) {
      blog.title = text; titleFound = true; continue;
    }

    if (isFaqHeading(text)) {
      inFaq = true;
      if (currentSection) { blog.sections.push(currentSection); currentSection = null; }
      continue;
    }

    if (inFaq) {
      if (pendingQ === null) pendingQ = text;
      else { blog.faqs.push({ question: pendingQ, answer: text }); pendingQ = null; }
      continue;
    }

    if (isHeading) {
      if (currentSection) blog.sections.push(currentSection);
      currentSection = { heading: text, paragraphs: [] };
      continue;
    }

    // Paragraph — keep innerHtml so <strong> and <a href> are preserved
    if (!currentSection) introLines.push(innerHtml.trim());
    else currentSection.paragraphs.push(innerHtml.trim());
  }

  if (currentSection) blog.sections.push(currentSection);
  if (introLines.length) blog.intro = introLines.join(" ");
  return blog;
}

// ─── GET /api/blogs — serves blogsData.json to client components ────────────────

export async function GET() {
  try {
    const data = await readBlogsJson();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({}, { status: 500 });
  }
}

// ─── POST /api/blogs — receives docx + images, writes to blogsData.json ─────────

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

    // Save images
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