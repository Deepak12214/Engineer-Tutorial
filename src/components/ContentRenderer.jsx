// ================================
import { FiCopy, FiCheck, FiZoomIn, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
function parseInline(text) {
  if (!text) return text;

  const tokens = [];
  let i = 0;

  while (i < text.length) {
    // 🔥 HANDLE NEW LINE
    if (text[i] === "\n") {
      tokens.push(<br key={`br-${i}`} />);
      i++;
      continue;
    }
    // ***bold+italic***
    if (text.startsWith("***", i)) {
      const end = text.indexOf("***", i + 3);
      if (end !== -1) {
        tokens.push(
          <span key={i} className="font-bold italic text-text-primary">
            {text.slice(i + 3, end)}
          </span>
        );
        i = end + 3;
        continue;
      }
    }

    // **bold**
    if (text.startsWith("**", i)) {
      const end = text.indexOf("**", i + 2);
      if (end !== -1) {
        tokens.push(
          <strong key={i} className="text-text-primary">
            {text.slice(i + 2, end)}
          </strong>
        );
        i = end + 2;
        continue;
      }
    }

    // _italic_
    if (text.startsWith("_", i)) {
      const end = text.indexOf("_", i + 1);
      if (end !== -1) {
        tokens.push(
          <em key={i} className="text-text-primary italic">
            {text.slice(i + 1, end)}
          </em>
        );
        i = end + 1;
        continue;
      }
    }

    // ~~strike~~
    if (text.startsWith("~~", i)) {
      const end = text.indexOf("~~", i + 2);
      if (end !== -1) {
        tokens.push(
          <span key={i} className="line-through text-red-500">
            {text.slice(i + 2, end)}
          </span>
        );
        i = end + 2;
        continue;
      }
    }

    // External & Internal [[text|url]]
    if (text.startsWith("[[", i)) {
      const end = text.indexOf("]]", i + 2);
      if (end !== -1) {
        const inside = text.slice(i + 2, end);
        const [label, href] = inside.split("|");

        const isExternal = href.startsWith("http");

        tokens.push(
          isExternal ? (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover underline"
            >
              {label}
            </a>
          ) : (
            <Link
              key={i}
              to={href}
              className="text-accent hover:text-accent-hover underline"
            >
              {label}
            </Link>
          )
        );

        i = end + 2;
        continue;
      }
    }

    // Default: push normal character
    tokens.push(text[i]);
    i++;
  }

  return tokens;
}

function CodeBlock({ language, content }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-border bg-bg-surface shadow-md transition-colors">
      <div className="px-4 py-2 flex items-center justify-between bg-[#0b0e14]">
        <span className="text-xs font-medium text-gray-300 uppercase">
          {language}
        </span>
        <button
          onClick={copyToClipboard}
          className="text-gray-300 hover:text-white transition"
        >
          {copied ? <FiCheck size={18} /> : <FiCopy size={18} />}
        </button>
      </div>
      <pre className="bg-[#0a0c10] p-4 overflow-x-auto">
        <code className="text-sm text-gray-200 font-mono">{content}</code>
      </pre>
    </div>
  );
}

export default function ContentRenderer({ blocks = [], content = {} }) {
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setModalImage(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openImage = (img) => setModalImage(img);

  const renderBlock = (block, idx) => {
    // BADGE
    if (block.badge) {
      const color =
        block.badge === "success"
          ? "bg-green-100/50 text-green-800 border-green-300"
          : block.badge === "danger"
          ? "bg-red-100/50 text-red-800 border-red-300"
          : "bg-yellow-100/50 text-yellow-800 border-yellow-300";

      return (
        <div
          key={idx}
          className={`p-4 rounded-lg border shadow-sm my-6 ${color} 
            dark:bg-bg-surface dark:text-text-primary dark:border-border`}
        >
          <div className="font-medium">
            {parseInline(block.title || "Note")}
          </div>
          <div className="text-sm mt-1">{parseInline(block.text)}</div>
        </div>
      );
    }
    if (block.gap) {
      return (
        <h2 key={idx} className=" my-14">
          {parseInline(block.gap)}
        </h2>
      );
    }
    if (block.numberedList) {
      return (
        <ol key={idx} className="list-decimal ml-6 space-y-6 text-text-primary">
          {block.numberedList.map((item, i) => (
            <li key={i}>
              {/* Title */}
              <div className="font-semibold text-lg mb-2">
                {parseInline(item.title)}
              </div>

              {/* Sub points */}
              {item.points && (
                <ul className="list-disc ml-6 space-y-2 text-text-secondary">
                  {item.points.map((p, j) => (
                    <li key={j}>{parseInline(p)}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      );
    }

    // HEADING
    if (block.heading) {
      return (
        <h2 key={idx} className="text-3xl font-bold my-6 text-text-primary">
          {parseInline(block.heading)}
        </h2>
      );
    }
    if (block.smallHeading) {
      return (
        <h2 key={idx} className="text-xl font-bold mt-4 mb-1 text-text-primary">
          {parseInline(block.smallHeading)}
        </h2>
      );
    }
    if (block.mediumHeading) {
      return (
        <h2
          key={idx}
          className="text-2xl font-bold mt-4 mb-1 text-text-primary"
        >
          {parseInline(block.mediumHeading)}
        </h2>
      );
    }
    // TEXT
    if (block.text) {
      return (
        <p
          key={idx}
          className="text-lg leading-relaxed my-1  text-text-secondary"
        >
          {parseInline(block.text)}
        </p>
      );
    }
    // TABLE
    if (block.table) {
      const { headers, rows } = block.table;

      return (
        <div key={idx} className="my-8 overflow-x-auto">
          <table className="w-full border-collapse border border-border rounded-lg overflow-hidden">
            <thead className="bg-bg-surface">
              <tr>
                {headers.map((h, i) => (
                  <th
                    key={i}
                    className="border border-border px-4 py-3 text-left text-text-primary font-semibold"
                  >
                    {parseInline(h)}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={rIdx} className="odd:bg-bg-main even:bg-bg-surface">
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className="border border-border px-4 py-3 text-text-secondary align-top"
                    >
                      {parseInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    if (block.line) {
      return <div key={idx} className="my-8 border-t border-2 border-border" />;
    }

    // IMAGE
    if (block.image) {
      return (
        <div
          key={idx}
          className="my-6 mb-8 overflow-hidden rounded-xl shadow-lg relative bg-bg-surface border border-border transition-colors"
        >
          <img
            src={block.image.src}
            alt={block.image.alt}
            className="w-full h-auto"
          />
          <button
            onClick={() => openImage(block.image)}
            className="absolute right-3 bottom-3 bg-bg-surface border border-border text-text-primary rounded-md p-2 shadow hover:scale-105 transition"
          >
            <FiZoomIn />
          </button>
        </div>
      );
    }

    // LIST
    if (block.list) {
      return (
        <ul key={idx} className="mb-4 space-y-2 list-disc ml-6">
          {block.list.map((item, i) => (
            <li key={i} className="text-text-primary">
              {parseInline(item)}
            </li>
          ))}
        </ul>
      );
    }
// ORDERED LIST (1, 2, 3...)
if (block.orderedList) {
  return (
    <ol
      key={idx}
      className="mb-4 space-y-2 ml-6 list-decimal"
    >
      {block.orderedList.map((item, i) => (
        <li key={i} className="text-text-primary">
          {parseInline(item)}
        </li>
      ))}
    </ol>
  );
}

    // MULTIPLE CODE BLOCKS
    if (block.code) {
      return block.code.map((c, i) => (
        <CodeBlock key={i} language={c.language} content={c.content} />
      ));
    }

    return null;
  };

  return (
    <>
      <div className="max-w-4xl">
        {content.points && (
          <ul className="mb-6 space-y-2">
            {content.points.map((p, i) => (
              <li key={i} className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-accent mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3-10l-4 4-2-2" />
                </svg>
                <span className="text-text-primary">{parseInline(p)}</span>
              </li>
            ))}
          </ul>
        )}

        {blocks.map(renderBlock)}
      </div>

      {modalImage && (
        <div
          onClick={() => setModalImage(null)}
          className="fixed inset-0 z-50 bg-black/80"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full h-[100svh] p-3"
          >
            {/* Close */}
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-3 right-3 z-20 bg-bg-surface border border-border text-text-primary rounded-full p-2 shadow"
            >
              <FiX />
            </button>

            {/* IMAGE CONTAINER */}
            <div className="w-full h-full overflow-auto flex items-center justify-center">
              <img
                src={modalImage.src}
                alt={modalImage.alt}
                className="max-h-full w-auto object-contain rounded-lg"
              />
            </div>

            {modalImage.caption && (
              <div className="text-center text-sm mt-2 text-gray-200">
                {modalImage.caption}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
