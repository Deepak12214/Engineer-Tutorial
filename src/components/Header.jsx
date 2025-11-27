import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
import siteData from "../data/site.json";
import coursesData from "../data/courses.json";
import { FiSun, FiMoon } from "react-icons/fi";

export default function Header() {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  const { site } = siteData;
  const { courses } = coursesData;

  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);

  const openTimerRef = useRef(null);
  const closeTimerRef = useRef(null);

  /* Cleanup timers */
  useEffect(() => {
    return () => {
      clearTimeout(openTimerRef.current);
      clearTimeout(closeTimerRef.current);
    };
  }, []);

  /* Desktop hover open */
  const handleMouseEnter = (label) => {
    clearTimeout(closeTimerRef.current);
    openTimerRef.current = setTimeout(() => {
      setOpenDropdown(label);
    }, 80);
  };

  const handleMouseLeave = (label) => {
    clearTimeout(openTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setOpenDropdown((curr) => (curr === label ? null : curr));
    }, 150);
  };

  /* Keyboard */
  const handleFocus = (label) => {
    clearTimeout(closeTimerRef.current);
    setOpenDropdown(label);
  };

  const handleBlur = (label) => {
    closeTimerRef.current = setTimeout(() => {
      setOpenDropdown((curr) => (curr === label ? null : curr));
    }, 150);
  };

  /* Mobile nav */
  const toggleMobile = () => {
    setMobileOpen((s) => !s);
    if (mobileOpen) setMobileDropdownOpen(null);
  };

  const toggleMobileDropdown = (label) => {
    setMobileDropdownOpen((prev) => (prev === label ? null : label));
  };

  return (
    <header className="sticky top-0 z-50 bg-bg-main text-text-primary border-b border-border shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            {site.logo ? (
              <img
                src={site.logo}
                alt="logo"
                className="h-30 rounded-md object-cover dark:brightness-0 dark:invert"
                onError={(e) => {
                  e.currentTarget.src = "/fallback-logo.png";
                }}
              />
            ) : (
              <span className="text-3xl">🎯</span>
            )}

            <span className="hidden sm:block text-xl font-bold text-text-primary">
              {site.title}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {site.headerLinks.map((link) => {
              const isDropdown = link.type === "dropdown";
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
                        className="flex items-center space-x-1 font-medium text-text-primary dark:text-text-primary hover:text-accent transition-colors"
                      >
                        <span>{label}</span>
                        <svg
                          className={`w-4 h-4 transition-transform ${
                            openDropdown === label ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {openDropdown === label && (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-bg-surface border border-border rounded-lg shadow-xl py-2 transition-colors">
                          {link.items.map((item) => {
                            const course = courses.find(
                              (c) => c.id === item.courseId
                            );
                            return (
                              <Link
                                key={item.courseId}
                                to={course?.defaultRoute || "/"}
                                className="block px-4 py-3 hover:bg-border/20 transition-colors"
                              >
                                <div className="flex items-start space-x-3">
                                  <span className="text-2xl">
                                    {course?.icon}
                                  </span>
                                  <div>
                                    <div className="font-medium text-text-primary hover:text-accent">
                                      {item.label}
                                    </div>
                                    <div className="text-sm text-text-secondary mt-1">
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
                      className="font-medium text-text-primary hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA + Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="
    ml-4 flex items-center justify-center
    w-10 h-10 rounded-full
    bg-bg-surface
    border border-border
    hover:bg-border/20
    transition-all duration-300
  "
            >
              {theme === "dark" ? (
                <FiSun className="text-accent text-lg" />
              ) : (
                <FiMoon className="text-accent text-lg" />
              )}
            </button>

            <button className="px-6 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors shadow-sm">
              {site.cta.primary}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-text-primary"
            onClick={toggleMobile}
            aria-expanded={mobileOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  mobileOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-bg-main border-t border-border px-4 py-4 text-text-primary transition-colors">
          <div className="flex flex-col gap-3">
            {site.headerLinks.map((link) => {
              const label = link.label;

              if (link.type === "dropdown") {
                return (
                  <div key={label}>
                    <button
                      onClick={() => toggleMobileDropdown(label)}
                      className="w-full flex items-center justify-between px-2 py-2 font-medium"
                    >
                      <span>{label}</span>
                      <svg
                        className={`w-5 h-5 transition-transform ${
                          mobileDropdownOpen === label ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {mobileDropdownOpen === label && (
                      <div className="mt-2 pl-4 space-y-1">
                        {link.items.map((item) => {
                          const course = courses.find(
                            (c) => c.id === item.courseId
                          );
                          return (
                            <Link
                              key={item.courseId}
                              to={course.defaultRoute}
                              className="block px-2 py-2 rounded hover:bg-border/20"
                              onClick={() => setMobileOpen(false)}
                            >
                              <div className="font-medium">{item.label}</div>
                              <div className="text-xs text-text-secondary">
                                {item.description}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={label}
                  to={link.path}
                  className="block px-2 py-2 font-medium hover:bg-border/20 rounded"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              );
            })}

            {/* Mobile CTA */}
            <button className="w-full px-4 py-2 rounded-md border border-accent text-accent">
              {site.cta.secondary}
            </button>
            <button className="w-full px-4 py-2 rounded-md bg-accent text-white">
              {site.cta.primary}
            </button>

            {/* Theme Toggle Mobile */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="mt-3 p-2 rounded-md bg-bg-surface border border-border hover:bg-border/20"
            >
              {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
