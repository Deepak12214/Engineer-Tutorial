import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import siteData from '../data/site.json';
import coursesData from '../data/courses.json';

export default function Header() {
  const { site } = siteData;
  const { courses } = coursesData;

  // dropdown state
  const [openDropdown, setOpenDropdown] = useState(null);
  const openTimerRef = useRef(null);
  const closeTimerRef = useRef(null);

  // mobile menu state
  const [mobileOpen, setMobileOpen] = useState(false);
  // mobile dropdown expanded (index by label)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      clearTimeout(openTimerRef.current);
      clearTimeout(closeTimerRef.current);
    };
  }, []);

  // Hover enter: open immediately (but cancel any close timer)
  const handleMouseEnter = (label) => {
    clearTimeout(closeTimerRef.current);
    // small debounce to avoid accidental opens; makes UX smoother
    openTimerRef.current = setTimeout(() => {
      setOpenDropdown(label);
    }, 80); // 80ms open delay
  };

  // Hover leave: close after short delay to avoid flicker
  const handleMouseLeave = (label) => {
    clearTimeout(openTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      // only close if same label is open
      setOpenDropdown((current) => (current === label ? null : current));
    }, 180); // 180ms close delay
  };

  // For keyboard accessibility: open on focus, close on blur
  const handleFocus = (label) => {
    clearTimeout(closeTimerRef.current);
    setOpenDropdown(label);
  };
  const handleBlur = (label) => {
    // delay close so keyboard navigation between items works
    closeTimerRef.current = setTimeout(() => {
      setOpenDropdown((current) => (current === label ? null : current));
    }, 160);
  };

  // Mobile toggles
  const toggleMobile = () => {
    setMobileOpen((s) => !s);
    // reset mobile dropdown state when closing mobile menu
    if (mobileOpen) setMobileDropdownOpen(null);
  };

  const toggleMobileDropdown = (label) => {
    setMobileDropdownOpen((prev) => (prev === label ? null : label));
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            {site.logo ? (
              <img
                src={site.logo}
                alt="logo"
                className="w-10 h-10 rounded-md object-cover"
                onError={(e) => { e.currentTarget.src = '/fallback-logo.png'; }}
              />
            ) : (
              <span className="text-3xl">{/* fallback emoji or icon */}🎯</span>
            )}
            <span className="hidden sm:block text-xl font-bold text-gray-900">
              {site.title}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {site.headerLinks.map((link) => {
              const isDropdown = link.type === 'dropdown';
              const label = link.label;

              return (
                <div
                  key={label}
                  className="relative"
                  onMouseEnter={() => isDropdown && handleMouseEnter(label)}
                  onMouseLeave={() => isDropdown && handleMouseLeave(label)}
                >
                  {isDropdown ? (
                    <>
                      <button
                        type="button"
                        aria-haspopup="true"
                        aria-expanded={openDropdown === label}
                        onFocus={() => handleFocus(label)}
                        onBlur={() => handleBlur(label)}
                        className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                      >
                        <span>{label}</span>
                        <svg
                          className={`w-4 h-4 transition-transform ${openDropdown === label ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Dropdown */}
                      {openDropdown === label && (
                        <div
                          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 pointer-events-auto"
                          onMouseEnter={() => { clearTimeout(closeTimerRef.current); }}
                          onMouseLeave={() => handleMouseLeave(label)}
                        >
                          {link.items.map((item) => {
                            const course = courses.find((c) => c.id === item.courseId);
                            return (
                              <Link
                                key={item.courseId}
                                to={course?.defaultRoute || '/'}
                                className="block px-4 py-3 hover:bg-blue-50 transition-colors group"
                              >
                                <div className="flex items-start space-x-3">
                                  <span className="text-2xl">{course?.icon}</span>
                                  <div>
                                    <div className="font-medium text-gray-900 group-hover:text-blue-600">
                                      {item.label}
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">
                                      {item.description}
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
              {site.cta.primary}
            </button>
          </div>

          {/* mobile hamburger */}
          <button
            className="md:hidden text-gray-700 p-2"
            onClick={toggleMobile}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {/* simple hamburger icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 px-4 py-4">
          <div className="flex flex-col gap-3">
            {site.headerLinks.map((link) => {
              const label = link.label;
              if (link.type === 'dropdown') {
                return (
                  <div key={label} className="w-full">
                    <button
                      type="button"
                      className="w-full flex items-center justify-between font-medium px-2 py-2"
                      onClick={() => toggleMobileDropdown(label)}
                      aria-expanded={mobileDropdownOpen === label}
                    >
                      <span>{label}</span>
                      <svg className={`w-5 h-5 transition-transform ${mobileDropdownOpen === label ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {mobileDropdownOpen === label && (
                      <div className="mt-2 pl-4 space-y-1">
                        {link.items.map((item) => {
                          const course = courses.find((c) => c.id === item.courseId);
                          return (
                            <Link
                              key={item.courseId}
                              to={course?.defaultRoute || '/'}
                              className="block px-2 py-2 rounded hover:bg-gray-100"
                              onClick={() => setMobileOpen(false)}
                            >
                              <div className="font-medium">{item.label}</div>
                              <div className="text-xs text-gray-500">{item.description}</div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              // simple link
              return (
                <Link key={label} to={link.path} className="block px-2 py-2 font-medium hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
                  {label}
                </Link>
              );
            })}

            {/* CTAs in mobile */}
            <div className="mt-2 flex flex-col gap-2">
              <button className="w-full px-4 py-2 rounded-md border border-blue-600 text-blue-600" onClick={() => setMobileOpen(false)}>
                {site.cta.secondary}
              </button>
              <button className="w-full px-4 py-2 rounded-md bg-blue-600 text-white" onClick={() => setMobileOpen(false)}>
                {site.cta.primary}
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
