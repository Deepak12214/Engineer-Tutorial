import { FiCopy, FiCheck } from "react-icons/fi";
import { useState } from "react";

export default function ContentRenderer({ blocks }) {
  const CodeBlock = ({ language, content }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    };

    return (
      <div className="my-6 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
        <div className="bg-gray-900 px-4 py-2 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-300 uppercase">
            {language}
          </span>

          <button onClick={copyToClipboard} className="text-gray-300 hover:text-white transition">
            {copied ? <FiCheck size={18} /> : <FiCopy size={18} />}
          </button>
        </div>

        <pre className="bg-gray-950 p-4 overflow-x-auto">
          <code className="text-sm text-gray-200 font-mono">{content}</code>
        </pre>
      </div>
    );
  };

  const renderBlock = (block, index) => {
    return (
      <div key={index} className="my-10">

        {/* Heading */}
        {block.heading && (
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{block.heading}</h2>
        )}

        {/* Text */}
        {block.text && (
          <p className="text-lg text-gray-700 leading-relaxed mb-4">{block.text}</p>
        )}

        {/* Image */}
        {block.image && (
          <div className="my-6 overflow-hidden rounded-xl shadow-lg">
            <img
              src={block.image.src}
              alt={block.image.alt || "image"}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* List */}
        {block.list && Array.isArray(block.list) && (
          <ul className="mb-4 space-y-2">
            {block.list.map((item, i) => (
              <li key={i} className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-600 mt-1"
                  fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3-10l-4 4-2-2" />
                </svg>
                <span className="text-gray-800">{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* MULTIPLE CODE BLOCKS */}
        {block.code && Array.isArray(block.code) && block.code.map((c, i) => (
          <CodeBlock key={i} language={c.language} content={c.content} />
        ))}

      </div>
    );
  };

  return <div className="max-w-4xl">{blocks.map(renderBlock)}</div>;
}
