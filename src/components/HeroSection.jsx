import React from 'react';
import heroData from '../data/hero.json';

export default function HeroSection() {
  const { title, highlight, subtitle, primaryCTA, secondaryCTA, imageUrl } = heroData;

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              <span className="text-xl mr-2">✨</span>
              <span>Learn from Industry Experts</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block">{title}</span>
              {highlight && (
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {highlight}
                </span>
              )}
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl">{subtitle}</p>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <a
                href="#"
                className="inline-block bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
              >
                {primaryCTA}
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center border-2 border-gray-300 px-6 py-3 rounded-xl font-semibold hover:border-gray-400 transition"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
                {secondaryCTA}
              </a>
            </div>
          </div>

          {/* Right: Image (hidden on small screens) */}
          <div className="hidden lg:block">
            <div className="rounded-3xl shadow-2xl overflow-hidden aspect-video bg-gradient-to-br from-blue-400 to-purple-400">
              <img
                src={imageUrl}
                alt="Hero"
                className="w-full h-full object-cover"
                onError={(e)=>{e.currentTarget.src = '/fallback-hero.jpg'}} 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
