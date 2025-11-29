// ================================
import { FiCopy, FiCheck, FiZoomIn, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
function parseInline(text) {
  if (!text) return text;

  const tokens = [];
  let i = 0;

  while (i < text.length) {
    // ***bold+italic***
    if (text.startsWith('***', i)) {
      const end = text.indexOf('***', i + 3);
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
    if (text.startsWith('**', i)) {
      const end = text.indexOf('**', i + 2);
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
    if (text.startsWith('_', i)) {
      const end = text.indexOf('_', i + 1);
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
    if (text.startsWith('~~', i)) {
      const end = text.indexOf('~~', i + 2);
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
        <span className="text-xs font-medium text-gray-300 uppercase">{language}</span>
        <button onClick={copyToClipboard} className="text-gray-300 hover:text-white transition">
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
          <div className="font-medium">{parseInline(block.title || "Note")}</div>
          <div className="text-sm mt-1">{parseInline(block.text)}</div>
        </div>
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

    // TEXT
    if (block.text) {
      return (
        <p key={idx} className="text-lg leading-relaxed my-4 text-text-secondary">
          {parseInline(block.text)}
        </p>
      );
    }

    // IMAGE
    if (block.image) {
      return (
        <div
          key={idx}
          className="my-6 overflow-hidden rounded-xl shadow-lg relative bg-bg-surface border border-border transition-colors"
        >
          <img src={block.image.src} alt={block.image.alt} className="w-full h-auto" />
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
        <ul key={idx} className="mb-4 space-y-2">
          {block.list.map((item, i) => (
            <li key={i} className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-accent mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3-10l-4 4-2-2" />
              </svg>
              <span className="text-text-primary">{parseInline(item)}</span>
            </li>
          ))}
        </ul>
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



      {/* FULLSCREEN IMAGE MODAL */}
      {modalImage && (
        <div
          onClick={() => setModalImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl w-full max-h-[90vh]"
          >
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-3 right-3 bg-bg-surface border border-border text-text-primary rounded-full p-2 shadow"
            >
              <FiX />
            </button>

            <img
              src={modalImage.src}
              alt={modalImage.alt}
              className="w-full h-full object-contain rounded-md"
            />

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
