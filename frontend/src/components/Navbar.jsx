import { useEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

// Pill-shaped nav link: maroon text by default, and on hover/active it gets
// a solid maroon oval background with cream text — matches the reference.
const navLink = ({ isActive }) =>
  `rounded-full px-3 py-1.5 text-sm font-medium transition hover:bg-navy hover:text-paper ${
    isActive ? 'bg-navy text-paper' : 'text-navy-600'
  }`;

const dropdownTrigger =
  'flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-navy-600 transition hover:bg-navy hover:text-paper';

const dropdownItem =
  'block rounded-lg px-3 py-2 text-sm text-navy-600 transition hover:bg-navy hover:text-paper';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  // Desktop dropdowns: click to open, stays open until you click elsewhere
  // (or click the trigger again) — no more closing on mouse-leave.
  const [desktopSupportOpen, setDesktopSupportOpen] = useState(false);
  const [desktopLoginOpen, setDesktopLoginOpen] = useState(false);
  const supportRef = useRef(null);
  const loginRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (supportRef.current && !supportRef.current.contains(e.target)) {
        setDesktopSupportOpen(false);
      }
      if (loginRef.current && !loginRef.current.contains(e.target)) {
        setDesktopLoginOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      {/* Floating pill bar — rounded on all sides, inset from the viewport edges, gold outline */}
      <div className="mx-auto max-w-5xl rounded-full border border-amber-400/50 bg-paper shadow-lg">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo} alt="IGCSE Smart School logo" className="h-9 w-9 rounded-full object-cover" />
            <span className="leading-tight">
              <span className="block font-display text-base font-bold text-navy">IGCSE</span>
              <span className="block text-[10px] font-semibold tracking-wide text-amber-600">SMART SCHOOL</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <NavLink to="/" className={navLink} end>Home</NavLink>
            <NavLink to="/about" className={navLink}>About Us</NavLink>
            <NavLink to="/programs" className={navLink}>Programs</NavLink>
            <NavLink to="/admissions" className={navLink}>Admissions</NavLink>

            <div className="relative" ref={supportRef}>
              <button
                type="button"
                className={dropdownTrigger}
                onClick={() => {
                  setDesktopSupportOpen((v) => !v);
                  setDesktopLoginOpen(false);
                }}
                aria-expanded={desktopSupportOpen}
              >
                Support
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" /></svg>
              </button>
              {desktopSupportOpen && (
                <div className="absolute left-0 top-full mt-2 w-44 rounded-xl border border-navy-100 bg-paper p-2 shadow-lg">
                  <Link onClick={() => setDesktopSupportOpen(false)} to="/support" className={dropdownItem}>Support Home</Link>
                  <Link onClick={() => setDesktopSupportOpen(false)} to="/support/faqs" className={dropdownItem}>FAQs</Link>
                  <Link onClick={() => setDesktopSupportOpen(false)} to="/support/feedback" className={dropdownItem}>Feedback</Link>
                  <Link onClick={() => setDesktopSupportOpen(false)} to="/careers" className={dropdownItem}>Careers</Link>
                </div>
              )}
            </div>

            <NavLink to="/contact" className={navLink}>Contact Us</NavLink>

            <div className="relative" ref={loginRef}>
              <button
                type="button"
                className={dropdownTrigger}
                onClick={() => {
                  setDesktopLoginOpen((v) => !v);
                  setDesktopSupportOpen(false);
                }}
                aria-expanded={desktopLoginOpen}
              >
                Login
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" /></svg>
              </button>
              {desktopLoginOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-navy-100 bg-paper p-2 shadow-lg">
                  <Link onClick={() => setDesktopLoginOpen(false)} to="/admin/login" className={dropdownItem}>Admin Login</Link>
                </div>
              )}
            </div>
          </nav>

          <div className="hidden md:block">
            <Link to="/admissions" className="btn-primary !py-2.5 !px-5 text-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mr-1.5">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="2" />
              </svg>
              Apply Now
            </Link>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-navy md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
              <path d="M0 1h22M0 8h22M0 15h22" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu — its own floating rounded panel, sits just below the pill bar */}
      {open && (
        <div className="mx-auto mt-2 max-w-5xl rounded-2xl border border-amber-400/50 bg-paper px-5 pb-5 pt-2 shadow-lg md:hidden">
          <nav className="flex flex-col gap-1">
            <Link onClick={() => setOpen(false)} to="/" className="rounded-lg px-2 py-2.5 text-navy-600 hover:bg-navy hover:text-paper">Home</Link>
            <Link onClick={() => setOpen(false)} to="/about" className="rounded-lg px-2 py-2.5 text-navy-600 hover:bg-navy hover:text-paper">About Us</Link>
            <Link onClick={() => setOpen(false)} to="/programs" className="rounded-lg px-2 py-2.5 text-navy-600 hover:bg-navy hover:text-paper">Programs</Link>
            <Link onClick={() => setOpen(false)} to="/admissions" className="rounded-lg px-2 py-2.5 text-navy-600 hover:bg-navy hover:text-paper">Admissions</Link>
            <button
              className="flex items-center justify-between rounded-lg px-2 py-2.5 text-left text-navy-600"
              onClick={() => setSupportOpen((v) => !v)}
            >
              Support
              <span>{supportOpen ? '−' : '+'}</span>
            </button>
            {supportOpen && (
              <div className="ml-3 flex flex-col gap-1 border-l border-navy-100 pl-3">
                <Link onClick={() => setOpen(false)} to="/support" className="py-1.5 text-sm text-navy-600">Support Home</Link>
                <Link onClick={() => setOpen(false)} to="/support/faqs" className="py-1.5 text-sm text-navy-600">FAQs</Link>
                <Link onClick={() => setOpen(false)} to="/support/feedback" className="py-1.5 text-sm text-navy-600">Feedback</Link>
                <Link onClick={() => setOpen(false)} to="/careers" className="py-1.5 text-sm text-navy-600">Careers</Link>
              </div>
            )}
            <Link onClick={() => setOpen(false)} to="/contact" className="rounded-lg px-2 py-2.5 text-navy-600 hover:bg-navy hover:text-paper">Contact Us</Link>

            <button
              className="flex items-center justify-between rounded-lg px-2 py-2.5 text-left text-navy-600"
              onClick={() => setLoginOpen((v) => !v)}
            >
              Login
              <span>{loginOpen ? '−' : '+'}</span>
            </button>
            {loginOpen && (
              <div className="ml-3 flex flex-col gap-1 border-l border-navy-100 pl-3">
                <Link onClick={() => setOpen(false)} to="/admin/login" className="py-1.5 text-sm text-navy-600">Admin Login</Link>
              </div>
            )}

            <Link onClick={() => setOpen(false)} to="/admissions" className="btn-primary mt-2 text-sm">Apply Now</Link>
          </nav>
        </div>
      )}
    </header>
  );
}