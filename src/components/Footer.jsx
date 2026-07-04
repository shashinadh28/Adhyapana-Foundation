import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Youtube, ArrowRight, Linkedin } from 'lucide-react';

const quickLinks = [
  ['Home', '/'],
  ['About Us', '/about'],
  ['Campaigns', '/#make-difference'],
  ['Donate', '/donate'],
  ['Gallery', '/gallery'],
  ['Contact', '/contact'],
];

const programs = [
  '  Special Need kids support',
  'Orphan Education',
  'Community Services',
  'widowed Kids Welfare',
];

const socials = [
  { icon: Facebook,  href: 'https://www.facebook.com/AdhyapanaNGO/', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/adhyapana_foundation/', label: 'Instagram' },
  { icon: Linkedin,  href: 'https://www.linkedin.com/company/adhyapana-foundation/', label: 'LinkedIn' },
  { icon: Youtube,   href: '#', label: 'YouTube' },
];

export default function Footer() {
  const nav = useNavigate();

  const handleLink = (path) => {
    if (path.startsWith('/#')) {
      const id = path.replace('/#', '');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      nav(path);
    }
  };

  return (
    <footer id="contact" className="relative overflow-hidden" style={{ background: '#111111' }}>

      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent, #F5A623 40%, #2E8B7A 60%, transparent)' }} />

      {/* Subtle dot pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10 pt-16 pb-8">

        {/* ── 4-column grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand column */}
          <div>
            <Link to="/" className="inline-block mb-5">
              <motion.img
                src="/Adhyapana_Foundation_Logo.webp"
                alt="Adhyapana Foundation"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.2 }}
                className="h-12 w-auto object-contain"
                style={{
                  filter: 'brightness(0) invert(1)',   /* white logo on dark bg */
                  maxWidth: 170,
                }}
              />
            </Link>
            <p className="font-body text-[13px] leading-relaxed mb-5"
              style={{ color: 'rgba(255,255,255,0.42)' }}>
              Empowering every child through education, love, and community.
            </p>
            <div className="flex gap-2.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, backgroundColor: '#F5A623' }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.55)' }}
                >
                  <Icon size={13} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body font-bold text-white text-[12px] mb-5 uppercase tracking-[0.2em]">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(([label, path]) => (
                <li key={label}>
                  <button
                    onClick={() => handleLink(path)}
                    className="font-body text-[13px] transition-colors duration-200 text-left"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                    onMouseEnter={e => (e.target.style.color = '#F5A623')}
                    onMouseLeave={e => (e.target.style.color = 'rgba(255,255,255,0.45)')}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-body font-bold text-white text-[12px] mb-5 uppercase tracking-[0.2em]">
              Programs
            </h4>
            <ul className="space-y-3">
              {programs.map(p => (
                <li key={p}>
                  <button
                    onClick={() => handleLink('/#make-difference')}
                    className="font-body text-[13px] transition-colors duration-200 text-left"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                    onMouseEnter={e => (e.target.style.color = '#F5A623')}
                    onMouseLeave={e => (e.target.style.color = 'rgba(255,255,255,0.45)')}
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-bold text-white text-[12px] mb-5 uppercase tracking-[0.2em]">
              Contact Us
            </h4>
            <div className="space-y-3 mb-5">
              {[
                [MapPin, 'HAL Colony, Gajularamaram, Hyd, TG.'],
                [Mail, 'info@adhyapanafoundation.org'],
                [Phone, '+91 9963624292'],
              ].map(([Icon, text], i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <Icon size={13} className="mt-0.5 flex-shrink-0" style={{ color: '#F5A623' }} />
                  <p className="font-body text-[13px]" style={{ color: 'rgba(255,255,255,0.45)' }}>{text}</p>
                </div>
              ))}
            </div>

            {/* Newsletter */}
            <div className="flex gap-2 mt-4">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-lg px-3 py-2 text-[12px] text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors font-body"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-body text-white rounded-lg px-3 py-2 text-[12px] font-semibold transition-colors"
                style={{ background: '#F5A623' }}
              >
                Join
              </motion.button>
            </div>
          </div>
        </div>

        {/* ── Donate CTA bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="font-body text-[13px] font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Every rupee you give transforms a child's future. 💛
          </p>
          <motion.a
            href="/donate"
            whileHover={{ scale: 1.05, boxShadow: '0 12px 32px rgba(245,166,35,0.45)' }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2.5 font-body font-bold text-white rounded-full px-7 py-3.5 text-[13.5px] tracking-wide flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #F5A623 0%, #E85D26 100%)', boxShadow: '0 4px 18px rgba(245,166,35,0.32)' }}
          >
            <Heart size={14} fill="white" color="white" />
            Donate Now
            <ArrowRight size={13} />
          </motion.a>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5">

          {/* Footer logo */}
          <img
            src="/Adhyapana_Foundation_Logo.webp"
            alt="Adhyapana Foundation"
            className="h-7 w-auto object-contain"
            style={{ filter: 'brightness(0) invert(1)', opacity: 0.35 }}
          />

          <p className="font-body text-[11px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
            © {new Date().getFullYear()} Adhyapana Foundation. All rights reserved.
          </p>

          <p className="font-body text-[11px] flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.28)' }}>
            Made with <Heart size={10} fill="#F5A623" color="#F5A623" /> for every child
          </p>
        </div>
      </div>
    </footer>
  );
}
