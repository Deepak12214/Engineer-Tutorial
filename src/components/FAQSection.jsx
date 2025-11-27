import React, { useState } from 'react';
import faqData from '../data/faq.json';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
<section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
  <div className="text-center mb-8">
    <h2 className="text-3xl font-bold text-text-primary">
      Frequently Asked Questions
    </h2>

    <p className="mt-2 text-text-secondary">
      Answers to common questions.
    </p>
  </div>

  <div className="space-y-3">
    {faqData.faqs.map((f, i) => (
      <div
        key={i}
        className="
          rounded-xl border border-border
          bg-bg-surface transition-colors
        "
      >
        <button
          onClick={() => toggle(i)}
          className="w-full text-left px-6 py-4 flex items-center justify-between"
        >
          <div className="font-medium text-text-primary">
            {f.question}
          </div>

          <div className="text-text-secondary">
            {openIndex === i ? "−" : "+"}
          </div>
        </button>

        {openIndex === i && (
          <div className="px-6 pb-6 text-text-secondary">
            {f.answer}
          </div>
        )}
      </div>
    ))}
  </div>
</section>

  );
}
