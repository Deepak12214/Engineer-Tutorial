// import { Link } from 'react-router-dom';
// import siteData from '../data/site.json';
// import coursesData from '../data/courses.json';

// export default function LandingPage() {
//   const { site } = siteData;
//   const { courses } = coursesData;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       {/* Hero Section */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//         <div className="text-center">
//           {/* Badge */}
//           <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
//             <span className="text-xl">✨</span>
//             <span>Learn from Industry Experts</span>
//           </div>

//           {/* Main Heading */}
//           <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
//             Make learning
//             <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
//               easier with AI
//             </span>
//           </h1>

//           {/* Tagline */}
//           <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
//             Master System Design, Algorithms, and crack interviews at top tech companies.
//             Everything you need in one place.
//           </p>

//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
//             <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:scale-105">
//               {site.cta.primary}
//             </button>
//             <button className="flex items-center space-x-2 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-gray-400 transition-all hover:scale-105">
//               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
//               </svg>
//               <span>{site.cta.secondary}</span>
//             </button>
//           </div>

//           {/* Decorative Image Section */}
//           <div className="relative">
//             <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10"></div>
//             <div className="bg-gradient-to-br from-blue-400 to-purple-400 rounded-3xl shadow-2xl overflow-hidden aspect-video max-w-4xl mx-auto">
//               <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
//                 🎯 Dashboard Preview
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Courses Section */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">Start Learning Today</h2>
//           <p className="text-xl text-gray-600">Choose from our carefully crafted courses</p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8">
//           {courses.map((course) => (
//             <Link
//               key={course.id}
//               to={course.defaultRoute}
//               className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 border-2 border-transparent hover:border-blue-500 hover:scale-105"
//             >
//               <div className="text-5xl mb-4">{course.icon}</div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
//                 {course.title}
//               </h3>
//               <p className="text-gray-600 mb-6">{course.description}</p>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4 text-sm text-gray-500">
//                   <span>📚 {course.totalSections} sections</span>
//                   <span>📝 {course.totalTopics} topics</span>
//                 </div>
//                 <svg
//                   className="w-6 h-6 text-blue-600 group-hover:translate-x-2 transition-transform"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                 </svg>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </section>



//       {/* Features Section */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//         <div className="grid md:grid-cols-3 gap-8">
//           {[
//             { icon: '⚡', title: 'Fast Learning', desc: 'Bite-sized lessons to learn quickly' },
//             { icon: '🎯', title: 'Interview Ready', desc: 'Prepare for top tech interviews' },
//             { icon: '🚀', title: 'Practice Tests', desc: 'Test your knowledge with quizzes' }
//           ].map((feature, i) => (
//             <div key={i} className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
//               <div className="text-5xl mb-4">{feature.icon}</div>
//               <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
//               <p className="text-gray-600">{feature.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }
import React from 'react';
import HeroSection from '../components/HeroSection';
import AlternatingSection from '../components/AlternatingSection';
import ReviewsSection from '../components/ReviewsSection';
import HighlightSection from '../components/HighlightSection';
import FAQSection from '../components/FAQSection';
import FooterSection from '../components/FooterSection';

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <AlternatingSection />
      <ReviewsSection />
      <HighlightSection />
      <FAQSection />
      <FooterSection />
    </div>
  );
}
