import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ContentRenderer from '../components/ContentRenderer';

export default function ReadingPage() {
  const { courseId, sectionId, topicId } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [topicId]);
  useEffect(() => {
    // Dynamically import the correct course JSON
    const loadCourseData = async () => {
      setLoading(true);
      try {
        const data = await import(`../data/${courseId}.json`);
        setCourseData(data.default);

        // Find the current topic
        const section = data.default.sections.find((s) => s.id === sectionId);
        const topic = section?.topics.find((t) => t.id === topicId);

        if (!topic) {
          navigate('/');
          return;
        }

        setCurrentTopic(topic);
      } catch (error) {
        console.error('Failed to load course data:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, [courseId, sectionId, topicId, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading content...</p>
        </div>
      </div>
    );
  }

  if (!courseData || !currentTopic) {
    return null;
  }

  // Find navigation (previous/next topics)
  const allTopics = courseData.sections.flatMap((s) => s.topics);
  const currentIndex = allTopics.findIndex((t) => t.id === topicId);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar course={courseData} />

      {/* Main Content Area */}
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
            <span>{courseData.title}</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>{courseData.sections.find((s) => s.id === sectionId)?.title}</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium text-gray-900">{currentTopic.title}</span>
          </nav>

          {/* Page Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            {currentTopic.title}
          </h1>

          {/* Content */}
          <article className="prose prose-lg max-w-none">
            <ContentRenderer blocks={currentTopic.contentBlocks} />
          </article>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-16 pt-8 border-t border-gray-200">
            {prevTopic ? (
              <button
                onClick={() => navigate(prevTopic.route)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium group"
              >
                <svg
                  className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-500">Previous</div>
                  <div>{prevTopic.title}</div>
                </div>
              </button>
            ) : (
              <div></div>
            )}

            {nextTopic ? (
              <button
                onClick={() => navigate(nextTopic.route)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium group"
              >
                <div className="text-right">
                  <div className="text-xs text-gray-500">Next</div>
                  <div>{nextTopic.title}</div>
                </div>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}