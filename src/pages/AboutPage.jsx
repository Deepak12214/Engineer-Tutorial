import aboutData from "../data/about.json";

export default function AboutPage() {
  const { about } = aboutData;

  return (
    <div
      className="
        w-full min-h-screen
        bg-bg-main
        text-text-primary
        transition-colors
      "
    >
      {/* --------------------
          HERO SECTION
      --------------------- */}
      <section
        className="
          w-full py-16
          bg-bg-surface
          border-b border-border
        "
      >
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">
            {about.title}
          </h1>

          <p className="text-lg text-text-secondary">
            {about.subtitle}
          </p>

          <div
            className="
              mt-8 rounded-xl overflow-hidden shadow-lg
              bg-bg-main
              border border-border
            "
          >
            <img
              src={about.image}
              alt="hero"
              className="w-full h-[350px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* --------------------
          CONTENT SECTIONS
      --------------------- */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {about.sections.map((section) => (
          <div key={section.id} className="space-y-6">

            {/* Section Title */}
            <h2 className="text-3xl font-semibold text-text-primary">
              {section.title}
            </h2>

            <div className="space-y-6">
              {section.contentBlocks.map((block, index) => {
                switch (block.type) {
                  // ========================
                  // HEADING
                  // ========================
                  case "heading":
                    return (
                      <h3
                        key={index}
                        className="
                          text-2xl font-semibold
                          text-text-primary
                        "
                      >
                        {block.text}
                      </h3>
                    );

                  // ========================
                  // PARAGRAPH TEXT
                  // ========================
                  case "text":
                    return (
                      <p
                        key={index}
                        className="
                          leading-relaxed
                          text-text-secondary
                        "
                      >
                        {block.text}
                      </p>
                    );

                  // ========================
                  // IMAGE
                  // ========================
                  case "image":
                    return (
                      <div
                        key={index}
                        className="
                          rounded-lg overflow-hidden shadow
                          bg-bg-surface
                          border border-border
                        "
                      >
                        <img
                          src={block.src}
                          alt={block.alt}
                          className="w-full object-cover"
                        />
                      </div>
                    );

                  // ========================
                  // LIST
                  // ========================
                  case "list":
                    return (
                      <ul
                        key={index}
                        className="
                          list-disc pl-6 space-y-2
                          text-text-secondary
                        "
                      >
                        {block.items.map((item, i) => (
                          <li key={i} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    );

                  // ========================
                  // QUOTE
                  // ========================
                  case "quote":
                    return (
                      <blockquote
                        key={index}
                        className="
                          border-l-4 pl-4 italic
                          text-text-secondary
                          border-accent
                        "
                      >
                        {block.text}
                      </blockquote>
                    );

                  default:
                    return null;
                }
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
