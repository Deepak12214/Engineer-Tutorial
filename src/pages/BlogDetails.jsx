import { useParams, Link } from "react-router-dom";
import blogsData from "../data/blogs.json";

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
    <div
      className="
        max-w-4xl mx-auto px-4 py-10
        bg-bg-main
        text-text-primary
        transition-colors
      "
    >
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

      <p className="text-text-secondary">
        {blog.subtitle}
      </p>

      {/* AUTHOR */}
      <div className="flex items-center gap-4 mt-6">
        <img
          src={blog.authorAvatar}
          className="w-14 h-14 rounded-full object-cover"
        />

        <div>
          <p className="font-semibold">{blog.author}</p>
          <p className="text-sm text-text-secondary">
            {blog.date} • {blog.readTime}
          </p>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div
        className="
          rounded-xl overflow-hidden mt-8
          bg-bg-surface
          border border-border
        "
      >
        <img
          src={blog.image}
          className="w-full h-[350px] object-cover"
        />
      </div>

      {/* BLOG CONTENT */}
      <div className="mt-10 space-y-8">
        {blog.contentBlocks.map((block, i) => {
          // HEADING
          if (block.type === "heading")
            return (
              <h2
                key={i}
                className="text-3xl font-bold text-text-primary"
              >
                {block.text}
              </h2>
            );

          // PARAGRAPH
          if (block.type === "text")
            return (
              <p
                key={i}
                className="
                  text-lg leading-relaxed
                  text-text-secondary
                "
              >
                {block.text}
              </p>
            );

          // INLINE IMAGE
          if (block.type === "image")
            return (
              <img
                key={i}
                src={block.src}
                alt={block.alt}
                className="
                  rounded-lg w-full
                  border border-border
                  bg-bg-surface
                "
              />
            );

          // LIST
          if (block.type === "list")
            return (
              <ul
                key={i}
                className="
                  list-disc ml-6 space-y-1
                  text-text-secondary
                "
              >
                {block.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            );

          // QUOTE
          if (block.type === "quote")
            return (
              <blockquote
                key={i}
                className="
                  border-l-4 pl-4 italic
                  text-text-secondary
                  border-accent
                "
              >
                {block.text}
              </blockquote>
            );

          return null;
        })}
      </div>
    </div>
  );
}
