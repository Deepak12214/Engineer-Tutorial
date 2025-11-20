import React from 'react';
import data from '../data/alternating.json';

export default function AlternatingSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {data.sections.map((sec, idx) => {
        const reverse = !!sec.reverse;
        return (
          <div
            key={idx}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-10 ${
              reverse ? 'lg:flex-row-reverse' : ''
            }`}
          >
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{sec.title}</h3>
              <p className="text-gray-600 max-w-xl">{sec.description}</p>
              {sec.cta && (
                <a href={sec.cta.href || '#'} className="inline-block mt-4 bg-blue-600 text-white px-5 py-3 rounded-lg">
                  {sec.cta.label}
                </a>
              )}
            </div>

            <div className="w-full">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={sec.imageUrl}
                  alt={sec.title}
                  className="w-full h-64 object-cover"
                  onError={(e)=>{e.currentTarget.src = '/fallback-section.jpg'}}
                />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
