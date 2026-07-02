import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Home',       path: '/' },
  { label: 'Campaigns',  path: '/#make-difference' },
  { label: 'About',      path: '/about' },
  { label: 'Gallery',    path: '/gallery' },
  { label: 'Blog',       path: '#' },
  { label: 'Contact Us', path: '/#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const loc = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleLink = (p) => {
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'navbar-solid' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">

          {/* ── Logo image ── */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <motion.img
              src="/Adhyapana_Foundation_Logo.webp"
              alt="Adhyapana Foundation"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2 }}
              className="h-11 w-auto object-contain"
              style={{ maxWidth: 180 }}
            />
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="hidden lg:flex items-center gap-7">
            {links.map(l => (
              <Link
                key={l.label}
                to={l.path}
                onClick={() => handleLink(l.path)}
                className={`nav-link text-[13px] font-semibold transition-colors ${
                  loc.pathname === l.path ? 'text-orange-500 active' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* ── Desktop right actions ── */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors text-[13px] font-medium"
            >
              <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center">
                <Phone size={12} className="text-orange-500" />
              </div>
              +91 98765 43210
            </a>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => nav('/donate')}
              className="bg-orange-500 hover:bg-orange-600 text-white text-[12.5px] font-bold px-5 py-2.5 rounded-full transition-all shadow-sm"
              style={{ boxShadow: '0 4px 14px rgba(249,115,22,0.28)' }}
            >
              Donate Now
            </motion.button>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-gray-100 overflow-hidden"
            style={{ background: 'rgba(250,249,246,0.98)', backdropFilter: 'blur(12px)' }}
          >
            {/* Logo in mobile menu */}
            <div className="px-5 pt-4 pb-2 border-b border-gray-100">
              <img
                src="/Adhyapana_Foundation_Logo.webp"
                alt="Adhyapana Foundation"
                className="h-9 w-auto object-contain"
              />
            </div>
            <div className="px-5 py-3 space-y-1">
              {links.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={l.path}
                    onClick={() => handleLink(l.path)}
                    className="block py-2.5 px-3 rounded-lg text-gray-700 font-semibold text-[13px] hover:bg-orange-50 hover:text-orange-500 transition-all"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => { setOpen(false); nav('/donate'); }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white text-[13px] font-bold py-3 rounded-full transition-colors"
                >
                  Donate Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
