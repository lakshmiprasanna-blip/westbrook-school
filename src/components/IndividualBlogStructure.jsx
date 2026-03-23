"use client";

import Image from "next/image";
import PageBanner from "./PageBanner";
import Internationalschool from "../app/about/Internationalschool";
import FAQSection from "./FAQSection";
import LearningSpacesSection from "./LearningSpacesSection";
import { useLayoutEffect, useRef, useEffect, useState } from "react";
import Lenis from "lenis";

// ── REMOVED: import blogsData from "../data/blogsData.json"
// Blogs are now fetched from /api/blogs so newly uploaded posts are
// included in "Recently Viewed" without a rebuild.

export default function IndividualBlogStructure({
  title = "",
  intro = "",
  sections = [],
  sideImages = [],
  faqs = [],
  slug = "",
  bannerImage = "",
}) {
  const stackRef = useRef(null);
  const [recentBlogs, setRecentBlogs] = useState([]);

  // ── Track recently viewed + build sidebar list ────────────────────────────
  useEffect(() => {
    if (!slug) return;

    const KEY = "recentlyViewedBlogs";
    const stored = JSON.parse(localStorage.getItem(KEY) || "[]");
    const updated = [slug, ...stored.filter((s) => s !== slug)].slice(0, 6);
    localStorage.setItem(KEY, JSON.stringify(updated));

    // Fetch latest blogsData from server (reads persistent-data/blogsData.json)
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((blogsData) => {
        const recent = updated
          .filter((s) => s !== slug)
          .slice(0, 3)
          .map((s) => {
            const blog = blogsData[s];
            if (!blog) return null;
            return {
              title: blog.title,
              image: blog.sideImages?.[0] || "/assets/blog1.png",
              slug: s,
            };
          })
          .filter(Boolean);

        setRecentBlogs(recent);
      })
      .catch(() => {
        // Silently fail — recently viewed is non-critical
      });
  }, [slug]);

  // ── Lenis scroll stack ────────────────────────────────────────────────────
  useLayoutEffect(() => {
    if (!stackRef.current || sideImages.length === 0) return;

    const cards = Array.from(stackRef.current.querySelectorAll(".stack-card"));
    if (cards.length === 0) return;

    const lenis = new Lenis();

    const updateCards = () => {
      cards.forEach((card, i) => {
        const rect    = card.getBoundingClientRect();
        const windowH = window.innerHeight;
        const dist    = 100 - rect.top;
        const progress = Math.max(0, Math.min(dist / (windowH * 0.4), 1));
        const scale    = 1 - (cards.length - 1 - i) * 0.05 * progress;
        const translateY = -(cards.length - 1 - i) * 10 * progress;
        card.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        card.style.zIndex    = String(i + 1);
      });
    };

    lenis.on("scroll", updateCards);

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    updateCards();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [sideImages]);

  return (
    <>
      <div className="pt-[70px] lg:pt-[80px]">
        <PageBanner image={bannerImage || "/assets/banner1.webp"} />
      </div>

      <Internationalschool
        title={title}
        highlightTitle={true}
        bgClass="bg-offwhite"
        titleMaxWidth="max-w-full"
        titleClass="text-[22px] sm:text-[28px] md:text-[42px] font-semibold mb-4 leading-tight"
        paragraphMaxWidth="max-w-[950px]"
        paragraphs={[intro]}
        textClass="text-[15px] sm:text-[16px] !md:text-[16px] md:leading-[25px] text-[#555]"
      />

      <section className="w-full py-12 md:py-16">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-10 items-start">

            {/* LEFT — blog content */}
            <div className="w-full lg:w-2/3">
              <div className="space-y-8">
                {sections.map((section, index) => (
                  <div key={index}>
                    <h3 className="text-primary mb-2">{section.heading}</h3>

                    {/* Mobile: show image after every other heading */}
                    {index % 2 === 0 && sideImages[index / 2] && (
                      <div className="relative w-full h-[300px] overflow-hidden rounded-md mb-4 lg:hidden">
                        <Image
                          src={sideImages[index / 2]}
                          alt={`blog image ${index / 2 + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="space-y-4">
                      {section.paragraphs.map((para, i) => (
                        <p
                          key={i}
                          className="blog-content text-[15px] md:text-[16px] leading-[26px] text-dark"
                          dangerouslySetInnerHTML={{ __html: para }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — sticky scroll stack (desktop only) */}
            <div className="hidden lg:block w-full lg:w-1/3">
              <div className="flex flex-col">
                {sideImages.map((img, i) => (
                  <div
                    key={i}
                    className="sticky overflow-hidden rounded-md w-full"
                    style={{
                      top: `${90 + i * 20}px`,
                      height: "560px",
                      zIndex: i + 1,
                      marginBottom: "24px",
                    }}
                  >
                    <Image
                      src={img}
                      alt={`blog image ${i + 1}`}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQs */}
      {faqs?.length > 0 && <FAQSection faqData={faqs} />}

      {/* Recently Viewed */}
      {recentBlogs.length > 0 && (
        <LearningSpacesSection
          heading="RECENTLY VIEWED"
          data={recentBlogs}
          titleClass="!font-montserrat font-medium !text-[20px] !leading-1.2 text-primary"
          hoverEffect={true}
        />
      )}
    </>
  );
}