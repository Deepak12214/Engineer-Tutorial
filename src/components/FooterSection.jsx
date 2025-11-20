import React from 'react';
import footerData from '../data/footer.json';

export default function FooterSection() {
  const { footer } = footerData;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="text-2xl font-bold">{footer.brand}</div>
          <p className="mt-3 text-gray-300 max-w-sm">{footer.description}</p>
        </div>

        <div>
          <div className="font-semibold mb-3">Links</div>
          <ul className="space-y-2 text-gray-300">
            {footer.links.map((l, i) => (
              <li key={i}><a href={l.url}>{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-3">Follow</div>
          <div className="flex space-x-4">
            {footer.social.map((s, i) => (
              <a key={i} href={s.url} className="text-gray-300">{s.label}</a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 text-gray-400 text-sm py-4 text-center">
        © {new Date().getFullYear()} {footer.brand} · All rights reserved
      </div>
    </footer>
  );
}
