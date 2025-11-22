import { useParams, Link } from "react-router-dom";
import blogsData from "../data/blogs.json";

export default function BlogDetails() {
  const { id } = useParams();
  const blog = blogsData.blogs.find((b) => b.id === id);

  if (!blog) {
    return <h1 className="text-center text-3xl pt-20">Blog Not Found</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      <Link to="/blogs" className="text-blue-600 underline">
        ← Back to Blogs
      </Link>

      <h1 className="text-4xl font-bold mt-4 mb-2">{blog.title}</h1>
      <p className="text-gray-600">{blog.subtitle}</p>

      <div className="flex items-center gap-4 mt-6">
        <img
          src={blog.authorAvatar}
          className="w-14 h-14 rounded-full"
        />

        <div>
          <p className="font-semibold">{blog.author}</p>
          <p className="text-sm text-gray-500">
            {blog.date} • {blog.readTime}
          </p>
        </div>
      </div>

      <img
        src={blog.image}
        className="w-full h-[350px] object-cover rounded-xl mt-8"
      />

      <div className="mt-10 space-y-8">
        {blog.contentBlocks.map((block, i) => {
          if (block.type === "heading")
            return <h2 key={i} className="text-3xl font-bold">{block.text}</h2>;

          if (block.type === "text")
            return <p key={i} className="text-lg leading-relaxed">{block.text}</p>;

          if (block.type === "image")
            return (
              <img
                key={i}
                src={block.src}
                alt={block.alt}
                className="rounded-lg w-full"
              />
            );

          if (block.type === "list")
            return (
              <ul key={i} className="list-disc ml-6 space-y-1">
                {block.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            );

          if (block.type === "quote")
            return (
              <blockquote
                key={i}
                className="border-l-4 border-blue-500 pl-4 italic text-gray-700"
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
