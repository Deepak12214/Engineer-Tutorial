import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Sidebar({ course }) {
  const { topicId } = useParams();
  const [expandedSections, setExpandedSections] = useState(
    course.sections.map((s) => s.id)
  );
  const [mobileOpen, setMobileOpen] = useState(false); // Hamburger state

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <>
      {/* Hamburger Button for Mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none"
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-40 top-0 left-0 h-full w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="p-6 mt-16 md:mt-0">
          {/* Course Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{course.title}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {course.sections.reduce(
                (total, section) => total + section.topics.length,
                0
              )} topics
            </p>
          </div>

          {/* Sections & Topics */}
          <nav className="space-y-2">
            {course.sections.map((section) => {
              const isExpanded = expandedSections.includes(section.id);

              return (
                <div
                  key={section.id}
                  className="border border-gray-200 rounded-lg bg-white overflow-hidden"
                >
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold text-gray-900">
                        {section.title}
                      </span>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
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

                  {/* Topics List */}
                  {isExpanded && (
                    <div className="border-t border-gray-100">
                      {section.topics.map((topic, index) => {
                        const isActive = topic.id === topicId;

                        return (
                          <Link
                            key={topic.id}
                            to={topic.route}
                            onClick={() => setMobileOpen(false)} // Close on mobile after click
                            className={`block px-4 py-3 border-l-4 transition-all ${
                              isActive
                                ? 'bg-blue-50 border-blue-600 text-blue-700 font-medium'
                                : 'border-transparent hover:bg-gray-50 hover:border-gray-300 text-gray-700'
                            }`}
                          >
                            <div className="flex items-center space-x-3 ml-8">
                              <span className="text-xs font-semibold text-gray-400">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <span className="flex-1">{topic.title}</span>
                              {isActive && (
                                <svg
                                  className="w-4 h-4 text-blue-600"
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

          {/* Progress Indicator */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-900">
                Course Progress
              </span>
              <span className="text-xs text-blue-600">Coming soon</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: '0%' }}
              ></div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

