import aboutData from "../data/about.json";

export default function AboutPage() {
  const { about } = aboutData;

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">{about.title}</h1>
          <p className="text-lg text-gray-600">{about.subtitle}</p>

          <img
            src={about.image}
            alt="hero"
            className="w-full h-[350px] object-cover rounded-xl mt-8 shadow"
          />
        </div>
      </section>

      {/* All Sections */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {about.sections.map((section) => (
          <div key={section.id} className="space-y-6">
            {/* Section Title */}
            <h2 className="text-3xl font-semibold">{section.title}</h2>

            {/* Section Content Blocks */}
            <div className="space-y-6">
              {section.contentBlocks.map((block, index) => {
                switch (block.type) {
                  case "heading":
                    return (
                      <h3
                        key={index}
                        className="text-2xl font-semibold text-gray-800"
                      >
                        {block.text}
                      </h3>
                    );

                  case "text":
                    return (
                      <p key={index} className="text-gray-700 leading-relaxed">
                        {block.text}
                      </p>
                    );

                  case "image":
                    return (
                      <img
                        key={index}
                        src={block.src}
                        alt={block.alt}
                        className="w-full rounded-lg shadow-md object-cover"
                      />
                    );

                  case "list":
                    return (
                      <ul key={index} className="list-disc pl-6 space-y-2">
                        {block.items.map((item, i) => (
                          <li
                            key={i}
                            className="text-gray-700 leading-relaxed"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    );

                  case "quote":
                    return (
                      <blockquote
                        key={index}
                        className="border-l-4 border-blue-500 pl-4 italic text-gray-600"
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
