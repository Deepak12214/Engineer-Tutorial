import { useParams, Link } from "react-router-dom";
import blogsData from "../data/blogs.json";
import ContentRenderer from "../components/ContentRenderer";
export default function BlogDetails() {
  const { id } = useParams();
  const blog = blogsData.blogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <h1 className="
        text-center text-3xl pt-20
        text-text-primary
      ">
        Blog Not Found
      </h1>
    );
  }

  return (

      <main id="content-area" className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
                    {/* BACK LINK */}
      <Link
        to="/blogs"
        className="
          text-accent
          hover:text-accent-hover
          font-medium
        "
      >
        ← Back to Blogs
      </Link>

      {/* TITLE */}
      <h1 className="text-4xl font-bold mt-4 mb-2">
        {blog.title}
      </h1>

      <p className="text-text-secondary mb-4">
        {blog.subtitle}
      </p>
                {/* Article */}
                <article className="prose prose-lg max-w-none text-text-primary">
                  <ContentRenderer
                    blocks={Array.isArray(blog.contentBlocks) ? blog.contentBlocks: []}
                    content={blog}
                  />
                </article>
              </div>
            </main>
  );
}
