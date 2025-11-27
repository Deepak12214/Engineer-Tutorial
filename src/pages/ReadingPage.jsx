// src/pages/ReadingPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ContentRenderer from "../components/ContentRenderer";
import { loadCourseData } from "../utils/loadSystemDesign";

export default function ReadingPage() {
  const { courseId, sectionId, topicId } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const el = document.getElementById("content-area");
    if (el) el.scrollTo({ top: 0, behavior: "smooth" });
  }, [topicId]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    loadCourseData(courseId || "system-design")
      .then((data) => {
        if (!mounted) return;
        setCourseData(data);

        // find section
        const section = data.sections.find((s) => s.id === sectionId) || data.sections[0];

        // find topic
        const topic = section?.topics.find((t) => t.id === topicId) || section?.topics?.[0];

        if (!topic) {
          // navigate to first valid route if current invalid
          const safeSection = section;
          const safeTopic = safeSection?.topics?.[0];
          if (safeSection && safeTopic) {
            navigate(`/learn/${data.id}/${safeSection.id}/${safeTopic.id}`, { replace: true });
          } else {
            navigate("/", { replace: true });
          }
          return;
        }

        setCurrentTopic(topic);
      })
      .catch((err) => {
        console.error("loadCourseData failed:", err);
        navigate("/", { replace: true });
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [courseId, sectionId, topicId, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-bg-main transition-colors">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 mx-auto mb-4"
            style={{
              borderTopColor: "var(--color-accent)",
              borderBottomColor: "rgba(0,0,0,0.08)",
            }}
          />
          <p className="text-text-secondary text-lg">Loading content...</p>
        </div>
      </div>
    );
  }

  if (!courseData || !currentTopic) return null;

  // flatten topics for prev/next across course
  const allTopics = courseData.sections.flatMap((s) => s.topics.map((t) => ({ ...t, sectionId: s.id })));
  const currentIndex = allTopics.findIndex((t) => t.id === currentTopic.id);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  const currentSection = courseData.sections.find((s) => s.id === (sectionId || courseData.sections[0].id));

  return (
    <div className="flex h-[calc(100vh-4.1rem)] overflow-hidden bg-bg-main text-text-primary transition-colors">
      <Sidebar course={courseData} activeSectionId={sectionId} activeTopicId={topicId} />

      <main id="content-area" className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-8">
            <span>{courseData.title}</span>

            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>

            <span>{currentSection?.title}</span>

            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>

            <span className="font-medium text-text-primary">
              {currentTopic.heading || currentTopic.title || currentTopic.id}
            </span>
          </nav>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-text-primary">
            {currentTopic.heading || currentTopic.title}
          </h1>

          {/* Article */}
          <article className="prose prose-lg max-w-none text-text-primary">
            <ContentRenderer
              blocks={Array.isArray(currentTopic.blocks) ? currentTopic.blocks : []}
              content={currentTopic}
            />
          </article>

          {/* Prev / Next */}
          <div className="flex items-center justify-between mt-16 pt-8 border-t transition-colors" style={{ borderTopColor: "var(--color-border)" }}>
            {prevTopic ? (
              <button
                onClick={() => navigate(`/learn/${courseData.id}/${prevTopic.sectionId}/${prevTopic.id}`)}
                className="flex items-center space-x-2 text-accent hover:text-accent-hover font-medium group"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <div className="text-left">
                  <div className="text-xs text-text-secondary">Previous</div>
                  <div className="text-text-primary">{prevTopic.heading || prevTopic.title}</div>
                </div>
              </button>
            ) : (
              <div />
            )}

            {nextTopic ? (
              <button
                onClick={() => navigate(`/learn/${courseData.id}/${nextTopic.sectionId}/${nextTopic.id}`)}
                className="flex items-center space-x-2 text-accent hover:text-accent-hover font-medium group"
              >
                <div className="text-right">
                  <div className="text-xs text-text-secondary">Next</div>
                  <div className="text-text-primary">{nextTopic.heading || nextTopic.title}</div>
                </div>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
