import React from 'react';
import reviewsData from '../data/reviews.json';

export default function ReviewsSection() {
  const { reviews } = reviewsData;

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">What learners say</h2>
          <p className="text-gray-600 mt-2">Real feedback from students (dummy for now).</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="p-6 bg-gray-50 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-4">
                <img
                  src={r.imageUrl}
                  alt={r.name}
                  className="w-14 h-14 rounded-full object-cover"
                  onError={(e)=>{e.currentTarget.src = '/fallback-avatar.jpg'}}
                />
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-sm text-gray-500">{r.role}</div>
                </div>
              </div>

              <p className="text-gray-700 mt-4">{r.text}</p>

              <div className="mt-4 flex items-center">
                {/* simple star rating (static) */}
                <div className="text-yellow-400">★★★★★</div>
                <div className="text-xs text-gray-500 ml-3">Verified learner</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
