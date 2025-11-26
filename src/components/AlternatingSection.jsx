import data from "../data/alternating.json";

export default function AlternatingSection() {
  return (
    <section className="w-full py-20">
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
              {/* Text Section */}
              <div className="flex-1 space-y-5">
                <h3 className="text-3xl font-bold text-gray-900 leading-snug">
                  {sec.title}
                </h3>

                <p className="text-gray-600 text-lg max-w-xl leading-relaxed">
                  {sec.description}
                </p>

                {sec.cta && (
                  <a
                    href={sec.cta.href}
                    className="inline-flex items-center gap-2 bg-[#1f2d5a] hover:bg-[#162040] text-white px-5 py-3 rounded-md shadow-sm transition"
                  >
                    {sec.cta.label}
                  </a>
                )}
              </div>

              {/* Image Section */}
              <div className="flex-1">
                <div className="rounded-2xl overflow-hidden shadow-xl bg-white">
                  <img
                    src={sec.imageUrl}
                    alt={sec.title}
                    className="w-full h-80 object-cover"
                    onError={(e) =>
                      (e.currentTarget.src = "https://via.placeholder.com/600x400")
                    }
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
