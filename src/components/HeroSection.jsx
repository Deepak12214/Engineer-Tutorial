import React from "react";
import heroData from "../data/hero.json";
import { FiPlay } from "react-icons/fi";

export default function HeroSection() {
  const {
    title,
    highlight,
    subtitle,
    primaryCTA,
    secondaryCTA,
    trustedLine,
    supportLine,
    brands,
    imageUrl
  } = heroData;

  return (
    <section className="transition-colors bg-bg-main">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE CONTENT */}
        <div className="space-y-8">

          {/* Heading */}
          <h1
            className="
              text-4xl md:text-5xl lg:text-6xl 
              font-extrabold leading-tight
            "
            style={{ color: "var(--color-text-primary)" }}
          >
            {title}
            <br />
            <span
              style={{
                color: "var(--color-accent)"
              }}
            >
              {highlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg max-w-xl"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {subtitle}
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 pt-3">

            {/* Primary */}
            <button
              className="px-7 py-3 font-semibold rounded-xl shadow-md transition"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "#fff"
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--color-accent-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--color-accent)")
              }
            >
              {primaryCTA}
            </button>

            {/* Secondary */}
            <button
              className="flex items-center gap-2 px-7 py-3 rounded-xl font-semibold transition"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-text-primary)"
              }}
            >
              <FiPlay
                style={{
                  color: "var(--color-accent)"
                }}
              />
              {secondaryCTA}
            </button>
          </div>

          {/* Trusted Line */}
          <p
            className="text-sm font-medium pt-4"
            style={{ color: "var(--color-text-secondary)" }}
          >
            ⭐ {trustedLine}
          </p>

          {/* Brand Logos */}
          <p
            className="text-sm font-medium"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {supportLine}
          </p>

          <div className="flex items-center gap-6 mt-2">
            {brands.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt="brand"
                className="h-6 opacity-80 dark:invert dark:opacity-90"
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="hidden lg:flex justify-center lg:justify-end">
          <img
            src={imageUrl}
            alt="hero graphic"
            className="w-full max-w-md lg:max-w-xl drop-shadow-xl"
          />
        </div>

      </div>
    </section>
  );
}
