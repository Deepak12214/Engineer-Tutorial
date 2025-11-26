// src/components/Sidebar.jsx
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Sidebar({ course, activeSectionId, activeTopicId }) {
  // guard: if course not provided yet, render nothing (or a placeholder)
  if (!course) {
    return null;
  }

  const { topicId: paramTopicId } = useParams();

  // initialize expandedSections from course safely
  const [expandedSections, setExpandedSections] = useState(() =>
    Array.isArray(course.sections) ? course.sections.map((s) => s.id) : []
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const containerRef = useRef(null);

  // If course changes (new data loaded), ensure expandedSections reflects it
  useEffect(() => {
    if (Array.isArray(course.sections)) {
      setExpandedSections(course.sections.map((s) => s.id));
    }
  }, [course]);

  // Auto-expand the section containing the active topic (from props or params)
  useEffect(() => {
    const activeTopic = activeTopicId || paramTopicId;
    if (!activeTopic) return;

    const secWithActive = course.sections.find((s) =>
      Array.isArray(s.topics) ? s.topics.some((t) => t.id === activeTopic) : false
    );
    if (secWithActive && !expandedSections.includes(secWithActive.id)) {
      setExpandedSections((prev) => (prev.includes(secWithActive.id) ? prev : [...prev, secWithActive.id]));
    }
    // we intentionally do not include expandedSections in deps to avoid loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTopicId, paramTopicId, course]);

  // Auto-scroll active topic into view when it changes
  useEffect(() => {
    // small timeout so DOM updates first
    const id = requestAnimationFrame(() => {
      const el = containerRef.current?.querySelector(".topic-active");
      if (el && typeof el.scrollIntoView === "function") {
        el.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    });
    return () => cancelAnimationFrame(id);
  }, [activeTopicId, paramTopicId, course]);

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    );
  };

  return (
    <>
      {/* Mobile hamburger */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none"
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar wrapper: left side overflow hidden so page layout safe */}
      <aside
        className={`fixed md:relative z-40 top-0 left-0 h-full w-80 bg-gray-50 border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Inner scrolling container */}
        <div
          ref={containerRef}
          className="h-full p-6 mt-16 md:mt-0 overflow-y-auto"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{course.title}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {course.sections.reduce((total, s) => total + (s.topics?.length || 0), 0)} topics
            </p>
          </div>

          <nav className="space-y-2">
            {course.sections.map((section) => {
              const isExpanded = expandedSections.includes(section.id);
              return (
                <div key={section.id} className="border border-gray-200 rounded-lg bg-white overflow-hidden">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold text-gray-900">{section.title}</span>
                    </div>

                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-gray-100">
                      {Array.isArray(section.topics) &&
                        section.topics.map((topic, index) => {
                          const isActive = topic.id === (activeTopicId || paramTopicId);
                          return (
                            <Link
                              key={topic.id}
                              to={`/learn/${course.id}/${section.id}/${topic.id}`}
                              onClick={() => setMobileOpen(false)}
                              className={`block px-4 py-3 border-l-4 transition-all ${isActive ? "bg-blue-50 border-blue-600 text-blue-700 font-medium topic-active" : "border-transparent hover:bg-gray-50 hover:border-gray-300 text-gray-700"}`}
                            >
                              <div className="flex items-center space-x-3 ml-8">
                                <span className="text-xs font-semibold text-gray-400">{String(index + 1).padStart(2, "0")}</span>
                                <span className="flex-1">{topic.heading || topic.title}</span>
                                {isActive && (
                                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-900">Course Progress</span>
              <span className="text-xs text-blue-600">Coming soon</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "0%" }} />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
