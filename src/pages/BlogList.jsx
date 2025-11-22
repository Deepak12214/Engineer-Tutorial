import { useState, useMemo } from "react";
import blogsData from "../data/blogs.json";
import { Link } from "react-router-dom";

export default function BlogList() {
  const blogs = blogsData.blogs;

  // STATES
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 6;

  // extract unique tags for category dropdown
  const categories = useMemo(() => {
    const allTags = blogs.flatMap((b) => b.tags);
    return ["all", ...Array.from(new Set(allTags))];
  }, [blogs]);

  // FILTER BLOGS
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.subtitle.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        blog.tags.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory, blogs]);

  // PAGINATION
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const currentBlogs = useMemo(() => {
    const start = (currentPage - 1) * blogsPerPage;
    return filteredBlogs.slice(start, start + blogsPerPage);
  }, [currentPage, filteredBlogs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">Latest Blogs</h1>

      {/* ---- SEARCH + CATEGORY ---- */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-4 py-2 rounded-lg w-full md:w-1/2"
        />

        {/* CATEGORY FILTER */}
        <select
          className="border px-4 py-2 rounded-lg w-full md:w-1/3"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>
      </div>

      {/* ---- BLOG LIST ---- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentBlogs.map((blog) => (
          <Link
            to={`/blogs/${blog.id}`}
            key={blog.id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-56 object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-600 text-sm mt-2">{blog.subtitle}</p>

              <div className="flex items-center gap-3 mt-4">
                <img
                  src={blog.authorAvatar}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{blog.author}</p>
                  <p className="text-xs text-gray-500">
                    {blog.date} • {blog.readTime}
                  </p>
                </div>
              </div>

              <div className="mt-3 text-yellow-500 text-sm">
                ⭐ {blog.rating}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 px-2 py-1 rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ---- PAGINATION ---- */}
      <div className="flex justify-center gap-3 mt-10">

        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className={`px-4 py-2 rounded-lg border ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Prev
        </button>

        {/* page numbers */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-lg border ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className={`px-4 py-2 rounded-lg border ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
