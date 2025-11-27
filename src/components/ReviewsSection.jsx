import React from "react";
import reviewsData from "../data/reviews.json";

export default function ReviewsSection() {
  const { reviews } = reviewsData;

  return (
    <section className="py-16 bg-bg-main transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-text-primary">
            What learners say
          </h2>
          <p className="text-text-secondary mt-2">
            Real feedback from students (dummy for now).
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="
                p-6 rounded-2xl shadow-sm border 
                bg-bg-surface 
                border-border 
                transition-colors
              "
            >
              {/* User Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={r.imageUrl}
                  alt={r.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-text-primary">
                    {r.name}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {r.role}
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="mt-4 text-text-secondary leading-relaxed">
                {r.text}
              </p>

              {/* Rating */}
              <div className="mt-4 flex items-center">
                <div className="text-yellow-400">★★★★★</div>
                <div className="text-xs text-text-secondary ml-3">
                  Verified learner
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
