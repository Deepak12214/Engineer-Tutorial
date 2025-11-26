import React from 'react';
import highlightData from '../data/highlight.json';

export default function HighlightSection() {
  const { highlight } = highlightData;

  return (
    <section className="py-16 bg-linear-to-r from-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <img
              src={highlight.imageUrl}
              alt={highlight.name}
              className="w-full h-full object-cover min-h-80"
            />
          </div>
    
          <div className="lg:col-span-2 p-8">
            <h3 className="text-2xl font-bold">{highlight.name}</h3>
            <div className="text-sm text-gray-500 mt-1">{highlight.role}</div>
            <p className="text-gray-700 mt-4">{highlight.description}</p>

            {highlight.cta && (
              <a href={highlight.cta.href || '#'} className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg">
                {highlight.cta.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
