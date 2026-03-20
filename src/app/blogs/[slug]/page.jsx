import { notFound } from "next/navigation";
import blogsData from "../../../data/blogsData.json";
import IndividualBlogStructure from "../../../components/IndividualBlogStructure";


export default async function BlogPage({ params }) {
  const { slug } = await params;

  const blog = blogsData?.[slug];

  if (!blog) return notFound();

  return (
    <>
   
    <IndividualBlogStructure
      
      sections={blog.sections}
      sideImages={[
        "/assets/blog1.png",
        "/assets/blog2.png",
        "/assets/blog1.png",
        "/assets/blog4.png",
      ]}
      faqs={blog.faqs} 
    />
    </>


  );
}