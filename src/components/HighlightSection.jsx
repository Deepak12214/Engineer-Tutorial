import React from "react";
import highlightData from "../data/highlight.json";

export default function HighlightSection() {
  const { highlight } = highlightData;

  return (
    <section className="py-16 bg-bg-main transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* CARD */}
        <div
          className="
            rounded-3xl overflow-hidden 
            grid grid-cols-1 lg:grid-cols-3
            bg-bg-surface
            border border-border
            shadow-xl transition-colors
          "
        >
          {/* LEFT IMAGE */}
          <div className="lg:col-span-1">
            <img
              src={highlight.imageUrl}
              alt={highlight.name}
              className="w-full h-full object-cover min-h-80"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-2 p-8">
            <h3 className="text-2xl font-bold text-text-primary">
              {highlight.name}
            </h3>

            <div className="text-sm text-text-secondary mt-1">
              {highlight.role}
            </div>

            <p className="text-text-secondary mt-4 leading-relaxed">
              {highlight.description}
            </p>

            {highlight.cta && (
              <a
                href={highlight.cta.href || "#"}
                className="
                  inline-block mt-6 px-6 py-3 rounded-lg font-semibold
                  bg-accent text-white
                  hover:bg-accent-hover 
                  transition shadow-md
                "
              >
                {highlight.cta.label}
              </a>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
