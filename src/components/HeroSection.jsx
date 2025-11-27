import React from "react";
import heroData from "../data/hero.json";

export default function HeroSection() {
  const { title, highlight, subtitle, primaryCTA, secondaryCTA, imageUrl } = heroData;

  return (
    <section className="bg-bg-main transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* LEFT: TEXT */}
          <div className="space-y-6">
            {/* Badge / pill */}
            <div
              className="
                inline-flex items-center
                px-4 py-2 rounded-full text-sm font-medium
                border border-border
                bg-bg-surface
                text-text-primary
                shadow-sm
              "
            >
              <span className="text-xl mr-2">✨</span>
              <span className="whitespace-nowrap">Learn from Industry Experts</span>
            </div>

            {/* Heading */}
            <h1 className="font-bold leading-tight">
              <span className="block text-4xl md:text-5xl lg:text-6xl text-text-primary">
                {title}
              </span>

              {highlight && (
                <span
                  className="block text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, var(--color-accent), var(--color-accent-hover))",
                  }}
                >
                  {highlight}
                </span>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-text-secondary max-w-2xl">
              {subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <a
                href="#"
                className="
                  inline-block px-6 py-3 rounded-xl font-semibold
                  bg-accent hover:bg-accent-hover
                  text-white shadow-md transition
                "
              >
                {primaryCTA}
              </a>

              <a
                href="#"
                className="
                  inline-flex items-center justify-center
                  border-2 px-6 py-3 rounded-xl font-semibold
                  border-border
                  text-text-primary
                  hover:border-accent hover:text-accent
                  transition
                "
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
                {secondaryCTA}
              </a>
            </div>
          </div>

          {/* RIGHT: IMAGE (hidden on small screens) */}
          <div className="hidden lg:block">
            <div
              className="
                rounded-3xl overflow-hidden aspect-video
                bg-bg-surface border border-border
                shadow-2xl
              "
            >
              <img src={imageUrl} alt="Hero" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
