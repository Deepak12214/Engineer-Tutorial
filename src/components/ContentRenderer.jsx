// src/components/ContentRenderer.jsx
import { FiCopy, FiCheck, FiZoomIn, FiX } from "react-icons/fi";
import { useEffect, useState } from "react";

/**
 * ContentRenderer
 * props:
 *  - blocks: array of small blocks (heading, text, image, list, code, badge)
 *  - content: optional parent object (for meta like content.points)
 */

function CodeBlock({ language, content }) {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <div className="my-6 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
      <div className="bg-gray-900 px-4 py-2 flex items-center justify-between">
        <span className="text-xs font-medium text-gray-300 uppercase">{language}</span>
        <button onClick={copyToClipboard} className="text-gray-300 hover:text-white transition">
          {copied ? <FiCheck size={18} /> : <FiCopy size={18} />}
        </button>
      </div>
      <pre className="bg-gray-950 p-4 overflow-x-auto">
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
    // Badge block
    if (block.badge) {
      const color =
        block.badge === "success" ? "bg-green-50 border-green-200 text-green-800" :
        block.badge === "danger" ? "bg-red-50 border-red-200 text-red-800" :
        "bg-yellow-50 border-yellow-200 text-yellow-800";
      return (
        <div key={idx} className={`p-4 rounded-md border ${color} my-6`}>
          <div className="font-medium">{block.title || "Note"}</div>
          <div className="text-sm mt-1">{block.text}</div>
        </div>
      );
    }

    // heading
    if (block.heading) {
      return <h2 key={idx} className="text-3xl font-bold text-gray-900 my-6">{block.heading}</h2>;
    }

    // text
    if (block.text) {
      return <p key={idx} className="text-lg text-gray-700 leading-relaxed my-4">{block.text}</p>;
    }

    // image
    if (block.image) {
      return (
        <div key={idx} className="my-6 overflow-hidden rounded-xl shadow-lg relative">
          <img src={block.image.src} alt={block.image.alt || "image"} className="w-full h-auto" />
          <button
            onClick={() => openImage(block.image)}
            className="absolute right-3 bottom-3 bg-white rounded-md p-2 shadow hover:scale-105 transition"
            aria-label="Open image"
          >
            <FiZoomIn />
          </button>
        </div>
      );
    }

    // list
    if (block.list && Array.isArray(block.list)) {
      return (
        <ul key={idx} className="mb-4 space-y-2">
          {block.list.map((item, i) => (
            <li key={i} className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-blue-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3-10l-4 4-2-2" />
              </svg>
              <span className="text-gray-800">{item}</span>
            </li>
          ))}
        </ul>
      );
    }

    // code blocks array
    if (block.code && Array.isArray(block.code)) {
      return block.code.map((c, i) => <CodeBlock key={i} language={c.language} content={c.content} />);
    }

    return null;
  };

  return (
    <>
      <div className="max-w-4xl">
        {/* optional parent content points */}
        {content.points && Array.isArray(content.points) && (
          <ul className="mb-6 space-y-2">
            {content.points.map((p, i) => (
              <li key={i} className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3-10l-4 4-2-2" />
                </svg>
                <span className="text-gray-800">{p}</span>
              </li>
            ))}
          </ul>
        )}

        {blocks.map(renderBlock)}
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div
          onClick={() => setModalImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2"
        >
          <div onClick={(e) => e.stopPropagation()} className="relative max-w-6xl w-full h-full max-h-[90vh]">
            <button onClick={() => setModalImage(null)} className="absolute top-3 right-3 z-60 bg-white rounded-full p-2 shadow">
              <FiX />
            </button>
            <img src={modalImage.src} alt={modalImage.alt || "image"} className="w-full h-full object-contain rounded-md" />
            {/* optional caption */}
            {modalImage.caption && <div className="mt-2 text-center text-sm text-white">{modalImage.caption}</div>}
          </div>
        </div>
      )}
    </>
  );
}
