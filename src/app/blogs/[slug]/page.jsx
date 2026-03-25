// src/app/blogs/[slug]/page.jsx

import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import IndividualBlogStructure from "../../../components/IndividualBlogStructure";

// Force dynamic: reads persistent-data/blogsData.json fresh on every request.
// New blogs uploaded via /admin/upload-blog go live instantly — no rebuild needed.
export const dynamic = "force-dynamic";

async function getBlog(slug) {
  const jsonPath = path.join(process.cwd(), "persistent-data", "blogsData.json");
  if (!existsSync(jsonPath)) return null;
  try {
    const data = JSON.parse(await readFile(jsonPath, "utf-8"));
    return data[slug] ?? null;
  } catch {
    return null;
  }
}

// ─── Per-page SEO — overrides the static metadata in layout.js ───────────────
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) return { title: "Blog | Westbrook International School" };

  return {
    title:       blog.metaTitle       || blog.title || "Blog | Westbrook International School",
    description: blog.metaDescription || blog.intro || "",
  };
}

export default async function BlogPage({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) return notFound();

  return (
    <IndividualBlogStructure
      bannerImage={blog.bannerImage ?? ""}
      title={blog.title}
      intro={blog.intro}
      sections={blog.sections}
      sideImages={blog.sideImages ?? []}
      faqs={blog.faqs}
      slug={slug}
    />
  );
}