import React, { useState } from 'react';
import faqData from '../data/faq.json';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        <p className="text-gray-600 mt-2">Answers to common questions (dummy content).</p>
      </div>

      <div className="space-y-3">
        {faqData.faqs.map((f, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-lg overflow-hidden">
            <button
              onClick={() => toggle(i)}
              className="w-full text-left px-6 py-4 flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{f.question}</div>
              </div>
              <div className="text-gray-400">{openIndex === i ? '−' : '+'}</div>
            </button>

            {openIndex === i && (
              <div className="px-6 pb-6 text-gray-700">{f.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
