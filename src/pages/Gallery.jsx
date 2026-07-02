import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn, Images, Heart } from 'lucide-react';

/* ──────────────────────────────────────────────────────────
   GLOBAL KEYFRAMES  (injected once, reused across sections)
────────────────────────────────────────────────────────── */
const KEYFRAMES = `
@keyframes trainScroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes floatY {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-10px); }
}
@keyframes pulseSoft {
  0%, 100% { opacity: 0.6; }
  50%       { opacity: 1; }
}
`;

/* ──────────────────────────────────────────────────────────
   IMAGE DATA
────────────────────────────────────────────────────────── */
const educationImages = [
  '/Gallery/children-school/3.jpeg',
  '/Gallery/children-school/4.jpeg',
  '/Gallery/children-school/5.jpeg',
  '/Gallery/children-school/6.jpeg',
  '/Gallery/children-school/14.jpeg',
  '/Gallery/children-school/15.jpeg',
  '/Gallery/children-school/17.jpeg',
  '/Gallery/children-school/18.jpeg',
  '/Gallery/children-school/20.jpeg',
  '/Gallery/children-school/22.jpeg',
  '/Gallery/children-school/23.jpeg',
  '/Gallery/children-school/39.jpeg',
  '/Gallery/children-school/57.jpeg',
  '/Gallery/children-school/58.jpeg',
];

const womenImages = [
  '/Gallery/Women-sanitary/56.jpeg',
  '/Gallery/Women-sanitary/81.jpeg',
  '/Gallery/Women-sanitary/82.jpeg',
];

const eventsImages = [
  '/Gallery/12.jpeg', '/Gallery/13.jpeg', '/Gallery/16.jpeg',
  '/Gallery/25.jpeg', '/Gallery/26.jpeg', '/Gallery/30.jpeg',
  '/Gallery/31.jpeg', '/Gallery/32.jpeg', '/Gallery/33.jpeg',
  '/Gallery/34.jpeg', '/Gallery/35.jpeg', '/Gallery/36.jpeg',
  '/Gallery/37.jpeg', '/Gallery/38.jpeg', '/Gallery/40.jpeg',
  '/Gallery/41.jpeg', '/Gallery/42.jpeg', '/Gallery/43.jpeg',
  '/Gallery/44.jpeg', '/Gallery/45.jpeg', '/Gallery/46.jpeg',
  '/Gallery/47.jpeg', '/Gallery/48.jpeg', '/Gallery/49.jpeg',
  '/Gallery/50.jpeg', '/Gallery/51.jpeg', '/Gallery/52.jpeg',
  '/Gallery/53.jpeg', '/Gallery/54.jpeg', '/Gallery/55.jpeg',
  '/Gallery/59.jpeg', '/Gallery/60.jpeg', '/Gallery/61.jpeg',
  '/Gallery/62.jpeg', '/Gallery/63.jpeg', '/Gallery/64.jpeg',
  '/Gallery/65.jpeg', '/Gallery/66.jpeg', '/Gallery/67.jpeg',
  '/Gallery/68.jpeg', '/Gallery/69.jpeg', '/Gallery/70.jpeg',
  '/Gallery/71.jpeg', '/Gallery/72.jpeg', '/Gallery/73.jpeg',
  '/Gallery/74.jpeg', '/Gallery/75.jpeg', '/Gallery/76.jpeg',
  '/Gallery/77.jpeg', '/Gallery/78.jpeg', '/Gallery/79.jpeg',
  '/Gallery/80.jpeg',
];

/* section meta for sticky nav */
const sections = [
  { id: 'children-school', label: 'Education & Children',         accent: '#F5A623' },
  { id: 'women-health',    label: "Women's Health & Hygiene",     accent: '#E84393' },
  { id: 'events-outreach', label: 'Events & Community Outreach',  accent: '#6366f1' },
];

/* ──────────────────────────────────────────────────────────
   LIGHTBOX
────────────────────────────────────────────────────────── */
function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);
  const thumbRef = useRef(null);

  const prev = useCallback(() => setCurrent(c => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent(c => (c + 1) % images.length),                [images.length]);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape')     onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next, onClose]);

  /* scroll active thumb into view */
  useEffect(() => {
    if (!thumbRef.current) return;
    const active = thumbRef.current.children[current];
    active?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [current]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(8,8,8,0.96)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <button onClick={onClose}
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.12)', color: '#fff' }}
        aria-label="Close">
        <X size={18} />
      </button>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 font-body text-[12px] font-semibold tracking-widest px-4 py-1.5 rounded-full"
        style={{ background: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.7)' }}>
        {current + 1} / {images.length}
      </div>

      <button onClick={e => { e.stopPropagation(); prev(); }}
        className="absolute left-3 md:left-6 w-11 h-11 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
        style={{ background: 'rgba(255,255,255,0.13)', color: '#fff' }} aria-label="Previous">
        <ChevronLeft size={22} />
      </button>

      <AnimatePresence mode="wait">
        <motion.img key={current} src={images[current]} alt={`Photo ${current + 1}`}
          initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          onClick={e => e.stopPropagation()}
          className="max-h-[80vh] max-w-[86vw] object-contain rounded-2xl shadow-2xl"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        />
      </AnimatePresence>

      <button onClick={e => { e.stopPropagation(); next(); }}
        className="absolute right-3 md:right-6 w-11 h-11 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
        style={{ background: 'rgba(255,255,255,0.13)', color: '#fff' }} aria-label="Next">
        <ChevronRight size={22} />
      </button>

      {/* Thumbnail strip */}
      <div ref={thumbRef}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-[90vw] overflow-x-auto px-3 py-2 rounded-2xl"
        style={{ background: 'rgba(0,0,0,0.5)', scrollbarWidth: 'none' }}
        onClick={e => e.stopPropagation()}>
        {images.map((img, i) => (
          <button key={i} onClick={() => setCurrent(i)} aria-label={`Thumbnail ${i + 1}`}
            className="flex-shrink-0 rounded-lg overflow-hidden transition-all"
            style={{
              width: 44, height: 32,
              opacity: i === current ? 1 : 0.4,
              outline: i === current ? '2px solid #F5A623' : 'none',
              outlineOffset: 1,
              transform: i === current ? 'scale(1.12)' : 'scale(1)',
            }}>
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────
   HERO  — single right-side image
────────────────────────────────────────────────────────── */
function GalleryHero() {
  const HERO_IMG = '/Gallery/children-school/20.jpeg';

  return (
    <>
      {/* ── MOBILE ── */}
      <section className="relative overflow-hidden py-24 md:hidden"
        style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1.2px, transparent 1.2px)', backgroundSize: '28px 28px' }} />
        <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 9, repeat: Infinity }}
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.30) 0%, transparent 70%)' }} />

        <div className="relative max-w-4xl mx-auto px-5 text-center z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-flex items-center gap-2 text-[11px] font-body font-bold uppercase tracking-[0.28em] mb-5 px-5 py-2.5 rounded-full"
              style={{ background: 'rgba(245,166,35,0.15)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.25)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              Our Gallery
            </span>
            <h1 className="font-playfair font-bold text-white mb-5"
              style={{ fontSize: 'clamp(34px, 10vw, 52px)', lineHeight: 1.06, fontStyle: 'italic' }}>
              Moments That <br /><span style={{ color: '#F5A623' }}>Matter</span>
            </h1>
            {/* Mobile hero image */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mx-auto mb-6 rounded-2xl overflow-hidden"
              style={{ maxWidth: 320, height: 220, boxShadow: '0 16px 40px rgba(0,0,0,0.5)', border: '2px solid rgba(245,166,35,0.3)' }}>
              <img src={HERO_IMG} alt="Children at school" className="w-full h-full object-cover" />
            </motion.div>
            <p className="font-body text-white/60 leading-relaxed max-w-sm mx-auto"
              style={{ fontSize: 'clamp(13px, 1.3vw, 15px)' }}>
              Every photograph tells a story of hope, change, and the lives we have touched together.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full block" style={{ height: 48 }}>
            <path d="M0,60 L1440,60 L1440,20 C1200,58 960,0 720,20 C480,40 240,0 0,20 Z" fill="#FEFAF6" />
          </svg>
        </div>
      </section>

      {/* ── DESKTOP ── */}
      <section className="hidden md:flex relative overflow-hidden items-center"
        style={{ minHeight: 480, background: 'linear-gradient(120deg, #1a1a1a 0%, #262626 60%, #1a1a1a 100%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1.2px, transparent 1.2px)', backgroundSize: '28px 28px' }} />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.13, 0.22, 0.13] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-28 right-0 w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.20) 0%, transparent 70%)' }} />
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, delay: 3 }}
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(46,139,122,0.22) 0%, transparent 70%)' }} />

        {/* Single hero image — right side */}
        <div className="absolute right-0 top-0 bottom-0 w-[44%] pointer-events-none overflow-hidden">
          {/* Left fade overlay */}
          <div className="absolute inset-y-0 left-0 w-32 z-10"
            style={{ background: 'linear-gradient(90deg, #1a1a1a 0%, transparent 100%)' }} />
          {/* Right fade overlay */}
          <div className="absolute inset-y-0 right-0 w-16 z-10"
            style={{ background: 'linear-gradient(270deg, #1a1a1a 0%, transparent 100%)' }} />

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-full flex items-center justify-center px-8"
          >
            <div className="relative w-full" style={{ maxWidth: 460 }}>
              {/* Decorative ring */}
              <div className="absolute -inset-3 rounded-3xl pointer-events-none"
                style={{ border: '2px solid rgba(245,166,35,0.20)', borderRadius: 28 }} />
              {/* Glow */}
              <div className="absolute -inset-6 rounded-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(245,166,35,0.12) 0%, transparent 70%)' }} />

              <motion.div
                style={{ animation: 'floatY 6s ease-in-out infinite' }}
                className="rounded-3xl overflow-hidden"
                style={{
                  borderRadius: 24,
                  boxShadow: '0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(245,166,35,0.25)',
                  aspectRatio: '4/3',
                }}
              >
                <img src={HERO_IMG} alt="Children at school — Adhyapana Foundation"
                  className="w-full h-full object-cover" />
              </motion.div>

              {/* Small badge on image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute -bottom-5 -left-5 px-4 py-2.5 rounded-2xl flex items-center gap-2"
                style={{
                  background: '#F5A623',
                  boxShadow: '0 8px 24px rgba(245,166,35,0.45)',
                }}>
                <Heart size={13} fill="white" color="white" />
                <span className="font-body font-bold text-white text-[12px]">Empowering Children</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Left text */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16 py-20">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[48%] lg:max-w-[44%]">
            <span className="inline-flex items-center gap-2 text-[11px] font-body font-bold uppercase tracking-[0.28em] mb-7 px-4 py-2 rounded-full"
              style={{ background: 'rgba(245,166,35,0.15)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.30)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              Our Gallery
            </span>
            <h1 className="font-playfair font-bold text-white mb-5 leading-[1.06]"
              style={{ fontSize: 'clamp(36px, 4.8vw, 66px)', fontStyle: 'italic' }}>
              Moments That <br /><span style={{ color: '#F5A623' }}>Matter</span>
            </h1>
            <div className="mb-6" style={{ width: 56, height: 3, background: '#F5A623', borderRadius: 2 }} />
            <p className="font-body text-white/60 leading-[1.85]"
              style={{ fontSize: 'clamp(13px, 1.1vw, 15.5px)', maxWidth: 400 }}>
              Every photograph tells a story of hope, change, and the lives we have touched together.
              Browse our sections to witness the impact created by your generosity.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              {[{ value: '69+', label: 'Photos' }, { value: '3', label: 'Programs' }].map(s => (
                <div key={s.label} className="flex items-center gap-2.5 px-4 py-2.5 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)' }}>
                  <span className="font-playfair font-bold text-white text-[18px]">{s.value}</span>
                  <span className="font-body text-white/50 text-[12px]">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full block" style={{ height: 50 }}>
            <path d="M0,60 L1440,60 L1440,20 C1200,58 960,0 720,20 C480,40 240,0 0,20 Z" fill="#FEFAF6" />
          </svg>
        </div>
      </section>
    </>
  );
}

/* ──────────────────────────────────────────────────────────
   STICKY SECTION NAV
────────────────────────────────────────────────────────── */
function SectionNav() {
  const [active, setActive] = useState(0);

  const scrollTo = (id, i) => {
    setActive(i);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-[72px] z-40 py-3"
      style={{ background: 'rgba(254,250,246,0.96)', backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-10 flex items-center gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <div className="flex items-center gap-1.5 mr-2 flex-shrink-0">
          <Images size={14} className="text-orange-400" />
          <span className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Gallery</span>
        </div>
        {sections.map((s, i) => (
          <button key={s.id} onClick={() => scrollTo(s.id, i)}
            className="flex-shrink-0 font-body text-[12px] font-semibold px-4 py-2 rounded-full transition-all whitespace-nowrap"
            style={{
              background: active === i ? s.accent : 'transparent',
              color: active === i ? '#fff' : '#555',
              border: `1.5px solid ${active === i ? s.accent : 'rgba(0,0,0,0.12)'}`,
            }}>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   SECTION 1 — EDUCATION & CHILDREN
   Bigger cards, 2 per view, auto-slide left every 3s
────────────────────────────────────────────────────────── */
function EducationSection() {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [paused, setPaused] = useState(false);
  const [dir, setDir] = useState(1);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const images = educationImages;
  const total  = images.length;
  const VISIBLE = 2;
  const maxIdx  = total - VISIBLE;

  const next = useCallback(() => { setDir(1);  setCurrent(c => c >= maxIdx ? 0 : c + 1); }, [maxIdx]);
  const prev = useCallback(() => { setDir(-1); setCurrent(c => c <= 0 ? maxIdx : c - 1); }, [maxIdx]);
  const goTo = (i) => { setDir(i > current ? 1 : -1); setCurrent(i); };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [paused, next]);

  const visible = Array.from({ length: VISIBLE }, (_, i) => images[(current + i) % total]);

  return (
    <>
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox images={images} startIndex={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>

      <motion.section id="children-school" ref={ref}
        initial={{ opacity: 0, y: 48 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="py-20 relative overflow-hidden"
        style={{ background: '#FEFAF6' }}
        onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>

        {/* Amber glow blob */}
        <div className="absolute pointer-events-none -top-32 -right-32"
          style={{ width: 560, height: 560, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,166,35,0.10) 0%, transparent 70%)' }} />
        <div className="absolute pointer-events-none bottom-0 left-0"
          style={{ width: 320, height: 320, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto px-5 lg:px-10 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
            <div>
              <p className="font-body text-[11px] font-bold uppercase tracking-[0.3em] mb-2" style={{ color: '#F5A623' }}>
                Young Minds, Bright Futures
              </p>
              <div className="mb-4" style={{ width: 36, height: 3, background: '#F5A623', borderRadius: 2 }} />
              <h2 className="font-playfair font-bold text-gray-950 mb-3"
                style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', lineHeight: 1.1 }}>
                Education & <span style={{ color: '#F5A623' }}>Children</span>
              </h2>
              <p className="font-body text-gray-500 leading-[1.8] max-w-lg"
                style={{ fontSize: 'clamp(13.5px, 1.05vw, 15px)' }}>
                Every classroom is a world of possibility. We bring quality education and joyful
                learning experiences to children who need it most.
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="font-body text-[12px] font-semibold tabular-nums" style={{ color: '#F5A623' }}>
                {current + 1}–{Math.min(current + VISIBLE, total)} / {total}
              </span>
              <button onClick={prev} aria-label="Previous"
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                style={{ background: '#fff', boxShadow: '0 2px 14px rgba(0,0,0,0.10)',
                  color: '#F5A623', border: '1.5px solid rgba(245,166,35,0.35)' }}>
                <ChevronLeft size={20} />
              </button>
              <button onClick={next} aria-label="Next"
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                style={{ background: '#F5A623', color: '#fff', boxShadow: '0 4px 16px rgba(245,166,35,0.38)' }}>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Cards — 2-up, big */}
          <div className="overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.div key={current} custom={dir}
                variants={{
                  enter: d => ({ x: d > 0 ? '8%' : '-8%', opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit:  d => ({ x: d > 0 ? '-8%' : '8%', opacity: 0 }),
                }}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-5 sm:grid-cols-2"
              >
                {visible.map((img, i) => {
                  const globalIdx = (current + i) % total;
                  return (
                    <motion.div key={`${current}-${i}`}
                      whileHover={{ y: -8, scale: 1.015 }}
                      transition={{ duration: 0.32, ease: 'easeOut' }}
                      onClick={() => setLightbox(globalIdx)}
                      className="relative rounded-3xl overflow-hidden cursor-zoom-in group"
                      style={{ aspectRatio: '16/11', boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
                        border: '1px solid rgba(0,0,0,0.05)' }}>
                      <img src={img} alt={`Education — photo ${globalIdx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                        style={{ transition: 'transform 0.7s ease' }}
                      />
                      <div className="absolute inset-0 flex items-end justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }}>
                        <div className="w-11 h-11 rounded-full flex items-center justify-center"
                          style={{ background: 'rgba(245,166,35,0.9)', backdropFilter: 'blur(4px)' }}>
                          <ZoomIn size={18} color="#fff" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-[3.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: '#F5A623' }} />
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-7">
            {Array.from({ length: maxIdx + 1 }).map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}
                style={{
                  width: i === current ? 28 : 8, height: 8, borderRadius: 9999,
                  background: i === current ? '#F5A623' : 'rgba(0,0,0,0.15)',
                  transition: 'all 0.3s ease', border: 'none', cursor: 'pointer', padding: 0,
                }} />
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
}

/* ──────────────────────────────────────────────────────────
   FEMALE SVG DECORATION
────────────────────────────────────────────────────────── */
function FemaleDecoration({ side = 'left', color = '#E84393' }) {
  const flip = side === 'right' ? 'scale(-1,1)' : 'scale(1,1)';
  return (
    <svg viewBox="0 0 160 340" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', transform: flip }}>
      {/* Head */}
      <circle cx="80" cy="48" r="28" fill={color} opacity="0.18" />
      <circle cx="80" cy="48" r="22" fill={color} opacity="0.30" />
      {/* Hair */}
      <ellipse cx="80" cy="32" rx="24" ry="14" fill={color} opacity="0.55" />
      <ellipse cx="58" cy="46" rx="8" ry="20" fill={color} opacity="0.40" />
      <ellipse cx="102" cy="46" rx="8" ry="20" fill={color} opacity="0.40" />
      {/* Face */}
      <circle cx="73" cy="50" r="2.5" fill={color} opacity="0.7" />
      <circle cx="87" cy="50" r="2.5" fill={color} opacity="0.7" />
      <path d="M74 58 Q80 63 86 58" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      {/* Neck */}
      <rect x="74" y="70" width="12" height="14" rx="4" fill={color} opacity="0.25" />
      {/* Saree/Dupatta body */}
      <path d="M48,84 Q80,76 112,84 L120,200 Q80,225 40,200 Z" fill={color} opacity="0.14" />
      <path d="M48,84 Q80,76 112,84 L116,180 Q80,205 44,180 Z" fill={color} opacity="0.22" />
      {/* Dupatta drape */}
      <path d="M110,90 Q130,110 125,145 Q120,165 108,172" stroke={color} strokeWidth="5" strokeLinecap="round" opacity="0.35" fill="none" />
      {/* Arms */}
      <path d="M50,92 Q30,120 35,148" stroke={color} strokeWidth="9" strokeLinecap="round" opacity="0.22" fill="none" />
      <path d="M110,92 Q130,120 125,148" stroke={color} strokeWidth="9" strokeLinecap="round" opacity="0.22" fill="none" />
      {/* Bangles */}
      <circle cx="34" cy="148" r="7" stroke={color} strokeWidth="2.5" opacity="0.45" fill="none" />
      <circle cx="126" cy="148" r="7" stroke={color} strokeWidth="2.5" opacity="0.45" fill="none" />
      {/* Skirt / lower */}
      <path d="M44,195 Q60,280 55,340" stroke={color} strokeWidth="14" strokeLinecap="round" opacity="0.18" fill="none" />
      <path d="M116,195 Q100,280 105,340" stroke={color} strokeWidth="14" strokeLinecap="round" opacity="0.18" fill="none" />
      {/* Bindi */}
      <circle cx="80" cy="43" r="3" fill={color} opacity="0.75" />
      {/* Earrings */}
      <ellipse cx="58" cy="58" rx="3" ry="5" fill={color} opacity="0.55" />
      <ellipse cx="102" cy="58" rx="3" ry="5" fill={color} opacity="0.55" />
      {/* Necklace */}
      <path d="M65,82 Q80,90 95,82" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.55" fill="none" />
      <circle cx="80" cy="90" r="3" fill={color} opacity="0.65" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────
   SECTION 2 — WOMEN'S HEALTH  (feminine theme, big images)
────────────────────────────────────────────────────────── */
function WomensSection() {
  const [lightbox, setLightbox] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <>
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox images={womenImages} startIndex={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>

      <motion.section id="women-health" ref={ref}
        initial={{ opacity: 0, y: 48 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #fff0f8 0%, #fce7f3 50%, #fdf2fb 100%)' }}>

        {/* Background petals / decorative circles */}
        <div className="absolute pointer-events-none -top-20 -right-20 w-[440px] h-[440px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #f9a8d4 0%, transparent 70%)' }} />
        <div className="absolute pointer-events-none -bottom-16 -left-16 w-80 h-80 rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, #f472b6 0%, transparent 70%)' }} />
        <div className="absolute pointer-events-none top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #E84393 0%, transparent 70%)' }} />

        {/* Floating hearts decoration */}
        {[{x:'8%',y:'12%',s:22,o:0.18},{x:'92%',y:'18%',s:16,o:0.14},{x:'5%',y:'75%',s:18,o:0.15},{x:'88%',y:'70%',s:24,o:0.17}].map((h,i)=>(
          <div key={i} className="absolute pointer-events-none" style={{ left:h.x, top:h.y, animation:`floatY ${3+i}s ease-in-out infinite`, animationDelay:`${i*0.7}s` }}>
            <Heart size={h.s} color="#E84393" fill="#E84393" opacity={h.o} />
          </div>
        ))}

        {/* Female cartoon decorations */}
        <div className="absolute left-0 bottom-0 pointer-events-none hidden lg:block" style={{ width: 110, height: 280, opacity: 0.55 }}>
          <FemaleDecoration side="left" color="#E84393" />
        </div>
        <div className="absolute right-0 bottom-0 pointer-events-none hidden lg:block" style={{ width: 110, height: 280, opacity: 0.55 }}>
          <FemaleDecoration side="right" color="#E84393" />
        </div>

        {/* Dot pattern overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, #E84393 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="max-w-7xl mx-auto px-5 lg:px-10 relative z-10">
          {/* Section header — centered feminine style */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }} className="text-center mb-12">
            {/* Small flower/star row */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div style={{ height: 1, width: 40, background: 'linear-gradient(90deg, transparent, #E84393)' }} />
              <span style={{ fontSize: 20, lineHeight: 1 }}>✦</span>
              <span className="font-body text-[11px] font-bold uppercase tracking-[0.32em]" style={{ color: '#E84393' }}>
                Dignity. Awareness. Empowerment.
              </span>
              <span style={{ fontSize: 20, lineHeight: 1 }}>✦</span>
              <div style={{ height: 1, width: 40, background: 'linear-gradient(90deg, #E84393, transparent)' }} />
            </div>

            <h2 className="font-playfair font-bold mb-3"
              style={{ fontSize: 'clamp(28px, 4vw, 50px)', lineHeight: 1.08,
                background: 'linear-gradient(135deg, #be185d 0%, #E84393 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Women's Health & Hygiene
            </h2>

            {/* Decorative underline */}
            <div className="flex items-center justify-center gap-2 mb-5">
              <div style={{ height: 2.5, width: 30, background: '#E84393', borderRadius: 99 }} />
              <Heart size={12} color="#E84393" fill="#E84393" />
              <div style={{ height: 2.5, width: 30, background: '#E84393', borderRadius: 99 }} />
            </div>

            <p className="font-body text-gray-500 leading-[1.85] max-w-xl mx-auto"
              style={{ fontSize: 'clamp(13.5px, 1.1vw, 15.5px)' }}>
              Our sanitary hygiene drives ensure women across underserved communities have access
              to the resources and knowledge they deserve.
            </p>
          </motion.div>

          {/* Big image cards — 3 column on desktop, 1 on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {womenImages.map((img, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setLightbox(i)}
                className="relative group cursor-zoom-in rounded-3xl overflow-hidden"
                style={{
                  aspectRatio: '3/4',
                  boxShadow: '0 12px 48px rgba(232,67,147,0.15)',
                  border: '2px solid rgba(232,67,147,0.12)',
                }}>
                <img src={img} alt={`Women Health — photo ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700"
                  style={{ transition: 'transform 0.7s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                {/* Pink gradient overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5"
                  style={{ background: 'linear-gradient(to top, rgba(190,24,93,0.55) 0%, transparent 55%)' }}>
                  <div className="w-full flex items-center justify-between">
                    <span className="font-body font-bold text-white text-[13px]">View Photo</span>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(4px)' }}>
                      <ZoomIn size={16} color="#fff" />
                    </div>
                  </div>
                </div>
                {/* Top ribbon */}
                <div className="absolute top-0 left-0 right-0 h-[3.5px]"
                  style={{ background: 'linear-gradient(90deg, #E84393, #f9a8d4, #E84393)' }} />
                {/* Heart badge */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(232,67,147,0.90)' }}>
                  <Heart size={13} fill="white" color="white" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom tagline */}
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }} className="text-center mt-10">
            <p className="font-body text-[13px] font-medium italic" style={{ color: '#be185d', opacity: 0.75 }}>
              "Every woman deserves dignity, access, and care." 💗
            </p>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}

/* ──────────────────────────────────────────────────────────
   SECTION 3 — EVENTS  (infinite train / marquee scroll)
────────────────────────────────────────────────────────── */
function EventsSection() {
  const [lightbox, setLightbox] = useState(null);
  const [paused, setPaused] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  /* Split into 2 rows for visual richness */
  const rowA = eventsImages.filter((_, i) => i % 2 === 0);
  const rowB = eventsImages.filter((_, i) => i % 2 === 1);

  const CARD_W  = 280;  // px, approximate — CSS controls real size
  const GAP     = 16;
  const SPEED_A = 40;   // seconds for one loop
  const SPEED_B = 50;

  return (
    <>
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox images={eventsImages} startIndex={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>

      <motion.section id="events-outreach" ref={ref}
        initial={{ opacity: 0, y: 48 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="py-20 relative overflow-hidden"
        style={{ background: '#F0EFFF' }}>

        {/* Indigo blobs */}
        <div className="absolute pointer-events-none -top-24 -left-24 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)' }} />
        <div className="absolute pointer-events-none -bottom-24 -right-24 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto px-5 lg:px-10 mb-10 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <p className="font-body text-[11px] font-bold uppercase tracking-[0.3em] mb-2" style={{ color: '#6366f1' }}>
                Together We Grow
              </p>
              <div className="mb-4" style={{ width: 36, height: 3, background: '#6366f1', borderRadius: 2 }} />
              <h2 className="font-playfair font-bold text-gray-950 mb-3"
                style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', lineHeight: 1.1 }}>
                Events & <span style={{ color: '#6366f1' }}>Community Outreach</span>
              </h2>
              <p className="font-body text-gray-500 leading-[1.8] max-w-lg"
                style={{ fontSize: 'clamp(13.5px, 1.05vw, 15px)' }}>
                From fundraisers to field visits, every event brings our community closer and amplifies
                the impact we create together.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 px-4 py-2.5 rounded-full"
              style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#6366f1' }} />
              <span className="font-body text-[12px] font-semibold" style={{ color: '#6366f1' }}>
                {eventsImages.length} moments captured
              </span>
            </div>
          </div>
        </div>

        {/* ── TRAIN ROWS ── */}
        <div className="relative z-10"
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>

          {/* Left / Right edge fades */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-28 z-20 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #F0EFFF 0%, transparent 100%)' }} />
          <div className="absolute inset-y-0 right-0 w-16 md:w-28 z-20 pointer-events-none"
            style={{ background: 'linear-gradient(270deg, #F0EFFF 0%, transparent 100%)' }} />

          {/* Row A — left to right-to-left (normal) */}
          <div className="overflow-hidden mb-5">
            <div className="flex gap-4"
              style={{
                width: 'max-content',
                animation: `trainScroll ${SPEED_A}s linear infinite`,
                animationPlayState: paused ? 'paused' : 'running',
              }}>
              {[...rowA, ...rowA].map((img, i) => (
                <div key={i}
                  onClick={() => setLightbox(eventsImages.indexOf(img) !== -1 ? eventsImages.indexOf(img) : 0)}
                  className="relative flex-shrink-0 rounded-2xl overflow-hidden cursor-zoom-in group"
                  style={{ width: 'clamp(220px, 22vw, 300px)', aspectRatio: '4/3',
                    boxShadow: '0 6px 28px rgba(99,102,241,0.13)',
                    border: '1px solid rgba(99,102,241,0.10)' }}>
                  <img src={img} alt={`Event photo`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ background: 'rgba(99,102,241,0.35)' }}>
                    <div className="w-11 h-11 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.20)', backdropFilter: 'blur(4px)' }}>
                      <ZoomIn size={18} color="#fff" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: '#6366f1' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Row B — slightly slower for depth effect */}
          <div className="overflow-hidden">
            <div className="flex gap-4"
              style={{
                width: 'max-content',
                animation: `trainScroll ${SPEED_B}s linear infinite`,
                animationPlayState: paused ? 'paused' : 'running',
                animationDirection: 'reverse',        /* opposite direction */
              }}>
              {[...rowB, ...rowB].map((img, i) => (
                <div key={i}
                  onClick={() => setLightbox(eventsImages.indexOf(img) !== -1 ? eventsImages.indexOf(img) : 0)}
                  className="relative flex-shrink-0 rounded-2xl overflow-hidden cursor-zoom-in group"
                  style={{ width: 'clamp(220px, 22vw, 300px)', aspectRatio: '4/3',
                    boxShadow: '0 6px 28px rgba(99,102,241,0.11)',
                    border: '1px solid rgba(99,102,241,0.10)' }}>
                  <img src={img} alt={`Event photo`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ background: 'rgba(99,102,241,0.35)' }}>
                    <div className="w-11 h-11 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.20)', backdropFilter: 'blur(4px)' }}>
                      <ZoomIn size={18} color="#fff" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: '#6366f1' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Pause indicator */}
          <AnimatePresence>
            {paused && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none px-4 py-2 rounded-full"
                style={{ background: 'rgba(99,102,241,0.85)', color: '#fff' }}>
                <span className="font-body text-[12px] font-semibold">⏸ Paused</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hint text */}
        <p className="text-center font-body text-[12px] mt-6 relative z-10" style={{ color: 'rgba(99,102,241,0.65)' }}>
          Hover to pause · Click any photo to enlarge
        </p>
      </motion.section>
    </>
  );
}

/* ──────────────────────────────────────────────────────────
   MAIN GALLERY PAGE
────────────────────────────────────────────────────────── */
export default function Gallery() {
  return (
    <main className="pt-[72px]">
      {/* Inject keyframes globally */}
      <style>{KEYFRAMES}</style>

      <GalleryHero />
      <SectionNav />
      <EducationSection />
      <WomensSection />
      <EventsSection />

      {/* Footer CTA */}
      <section className="py-20 text-center relative overflow-hidden" style={{ background: '#1a1a1a' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1.2px, transparent 1.2px)', backgroundSize: '30px 30px' }} />
        <div className="absolute -top-32 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.15) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-32 left-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(46,139,122,0.15) 0%, transparent 70%)' }} />

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative z-10 max-w-2xl mx-auto px-5">
          <span className="inline-flex items-center gap-2 text-[11px] font-body font-bold uppercase tracking-[0.28em] mb-6 px-5 py-2.5 rounded-full"
            style={{ background: 'rgba(245,166,35,0.15)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.25)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Be Part of the Story
          </span>
          <h2 className="font-playfair font-bold text-white mb-5"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.1, fontStyle: 'italic' }}>
            Help Us Create More<br />
            <span style={{ color: '#F5A623' }}>Meaningful Moments</span>
          </h2>
          <p className="font-body text-white/55 leading-[1.85] mb-10"
            style={{ fontSize: 'clamp(14px, 1.1vw, 15.5px)' }}>
            Your contribution funds programs that fill these galleries with smiles, learning, and hope.
            Every rupee makes a difference.
          </p>
          <motion.a href="/donate"
            whileHover={{ scale: 1.05, boxShadow: '0 14px 40px rgba(245,166,35,0.42)' }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2.5 font-body font-bold text-white rounded-full px-10 py-4 text-[14px] tracking-wide"
            style={{ background: '#F5A623', boxShadow: '0 6px 22px rgba(245,166,35,0.32)' }}>
            <Heart size={15} fill="white" />
            Donate Now
          </motion.a>
        </motion.div>
      </section>
    </main>
  );
}
