import PageBanner from "../../components/PageBanner";
import LearningSpacesSection from "../../components/LearningSpacesSection";

async function getBlogs() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/blogs`,
      { cache: "no-store" } // always fetch latest — no caching
    );
    if (!res.ok) return [];
    const data = await res.json();

    // Convert { slug: blogObject } → array for LearningSpacesSection
    return Object.entries(data).map(([slug, blog]) => ({
      title: blog.title || slug,
      image: blog.bannerImage || blog.sideImages?.[0] || "/assets/learningspacessection1.webp",
      slug,
    }));
  } catch {
    return [];
  }
}

export default async function Blogs() {
  const spacesData = await getBlogs();

  return (
    <>
      <div className="pt-[70px] lg:pt-[80px]">
        <PageBanner image="/assets/blogs/Banner.webp" />
      </div>
      <LearningSpacesSection
        heading="BLOGS"
        data={spacesData}
        titleClass="!font-montserrat font-medium !text-[20px] !leading-1.2 text-primary"
        hoverEffect={true}
      />
    </>
  );
}