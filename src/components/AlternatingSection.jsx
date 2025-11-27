import data from "../data/alternating.json";

export default function AlternatingSection() {
  return (
    <section className="w-full py-20 bg-bg-main transition-colors">
      <div className="max-w-7xl mx-auto px-6 space-y-28">

        {data.sections.map((sec, idx) => {
          const reverse = sec.reverse;

          return (
            <div
              key={idx}
              className={`flex flex-col-reverse lg:flex-row items-center gap-12 ${
                reverse ? "lg:flex-row-reverse" : ""
              }`}
            >

              {/* TEXT SECTION */}
              <div className="flex-1 space-y-5">
                <h3 className="text-3xl font-bold text-text-primary leading-snug transition-colors">
                  {sec.title}
                </h3>

                <p className="text-text-secondary text-lg max-w-xl leading-relaxed transition-colors">
                  {sec.description}
                </p>

                {sec.cta && (
                  <a
                    href={sec.cta.href}
                    className="
                      inline-flex items-center gap-2
                      px-5 py-3 rounded-lg font-medium
                      bg-accent
                      hover:bg-accent-hover
                      text-white shadow-md
                      transition-all duration-300
                    "
                  >
                    {sec.cta.label}
                  </a>
                )}
              </div>

              {/* IMAGE SECTION */}
              <div className="flex-1">
                <div
                  className="
                    rounded-2xl overflow-hidden
                    shadow-xl 
                    bg-bg-surface
                    border border-border
                    transition-colors
                  "
                >
                  <img
                    src={sec.imageUrl}
                    alt={sec.title}
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>

            </div>
          );
        })}

      </div>
    </section>
  );
}

