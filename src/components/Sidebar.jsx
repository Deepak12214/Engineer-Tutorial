// src/components/Sidebar.jsx
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Sidebar({ course, activeSectionId, activeTopicId }) {
  if (!course) return null;

  const { topicId: paramTopicId } = useParams();
  const [expandedSections, setExpandedSections] = useState(() =>
    Array.isArray(course.sections) ? course.sections.map((s) => s.id) : []
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (Array.isArray(course.sections)) {
      setExpandedSections(course.sections.map((s) => s.id));
    }
  }, [course]);

  useEffect(() => {
    const activeTopic = activeTopicId || paramTopicId;
    if (!activeTopic) return;

    const secWithActive = course.sections.find((s) =>
      Array.isArray(s.topics)
        ? s.topics.some((t) => t.id === activeTopic)
        : false
    );

    if (secWithActive && !expandedSections.includes(secWithActive.id)) {
      setExpandedSections((prev) =>
        prev.includes(secWithActive.id) ? prev : [...prev, secWithActive.id]
      );
    }
    // eslint-disable-next-line
  }, [activeTopicId, paramTopicId, course]);

  // Auto-scroll
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const el = containerRef.current?.querySelector(".topic-active");
      if (el) el.scrollIntoView({ block: "center", behavior: "smooth" });
    });
    return () => cancelAnimationFrame(id);
  }, [activeTopicId, paramTopicId, course]);

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <>
      {/* Mobile Button */}
      <div className="md:hidden absolute pt-2 left-4 z-50">
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="p-2 rounded-md 
          bg-bg-surface 
          text-text-primary
          border border-border
          hover:bg-border/20 transition"
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar container */}
      <aside
        className={`
          absolute md:relative z-40 top-0 left-0 
          h-[calc(100vh-4rem)] w-80 
          bg-bg-surface
          border-r border-border
          transform transition-transform duration-300 
          ${mobileOpen ? "translate-x-0 pb-10" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Scroll container */}
        <div
          ref={containerRef}
          className="h-full p-6 mt-16 md:mt-0 overflow-y-auto"
        >
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-text-primary">
              {course.title}
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              {course.sections.reduce(
                (total, s) => total + (s.topics?.length || 0),
                0
              )}{" "}
              topics
            </p>
          </div>

          {/* Nav */}
          <nav className="space-y-2">
            {course.sections.map((section) => {
              const isExpanded = expandedSections.includes(section.id);

              return (
                <div
                  key={section.id}
                  className="
                    border rounded-lg overflow-hidden
                    bg-bg-main
                    border-border
                  "
                >
                  {/* Section Button */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="
                      w-full flex items-center justify-between p-4 
                      text-text-primary
                      hover:bg-border/10
                      transition
                    "
                  >
                    <span className="font-semibold">
                      {section.title}
                    </span>

                    <svg
                      className={`w-5 h-5 text-text-secondary transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Topics */}
                  {isExpanded && (
                    <div className="border-t border-border">
                      {Array.isArray(section.topics) &&
                        section.topics.map((topic, index) => {
                          const isActive =
                            topic.id === (activeTopicId || paramTopicId);

                          return (
                            <Link
                              key={topic.id}
                              to={`/learn/${course.id}/${section.id}/${topic.id}`}
                              onClick={() => setMobileOpen(false)}
                              className={`
                                block px-4 py-3 border-l-4 transition
                                ${
                                  isActive
                                    ? "bg-accent/15 border-accent text-accent font-medium topic-active"
                                    : "border-transparent hover:bg-border/10 hover:border-border text-text-secondary"
                                }
                              `}
                            >
                              <div className="flex items-center space-x-3 ml-8">
                                <span className="text-xs font-semibold text-text-secondary">
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className="flex-1">
                                  {topic.heading || topic.title}
                                </span>

                                {isActive && (
                                  <svg
                                    className="w-4 h-4 text-accent"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
