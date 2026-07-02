import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn, Images, Heart } from 'lucide-react';

/* ─────────────────── KEYFRAMES ─────────────────── */
const KEYFRAMES = `
@keyframes trainScroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes floatY {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-10px); }
}
`;

/* ─────────────────── IMAGE DATA ─────────────────── */
const educationImages = [
  '/Gallery/children-school/3.jpeg',  '/Gallery/children-school/4.jpeg',
  '/Gallery/children-school/5.jpeg',  '/Gallery/children-school/6.jpeg',
  '/Gallery/children-school/14.jpeg', '/Gallery/children-school/15.jpeg',
  '/Gallery/children-school/17.jpeg', '/Gallery/children-school/18.jpeg',
  '/Gallery/children-school/20.jpeg', '/Gallery/children-school/22.jpeg',
  '/Gallery/children-school/23.jpeg', '/Gallery/children-school/39.jpeg',
  '/Gallery/children-school/57.jpeg', '/Gallery/children-school/58.jpeg',
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

const sections = [
  { id: 'children-school', label: 'Education & Children',        accent: '#F5A623' },
  { id: 'women-health',    label: "Women's Health & Hygiene",    accent: '#E84393' },
  { id: 'events-outreach', label: 'Events & Community Outreach', accent: '#1a1a1a' },
];

/* ─────────────────── LIGHTBOX ─────────────────── */
function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);
  const thumbRef = useRef(null);

  const prev = useCallback(() => setCurrent(c => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent(c => (c + 1) % images.length), [images.length]);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape')     onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next, onClose]);

  useEffect(() => {
    if (!thumbRef.current) return;
    thumbRef.current.children[current]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
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
        style={{ background: 'rgba(255,255,255,0.12)', color: '#fff' }} aria-label="Close">
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
      <div ref={thumbRef}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-[90vw] overflow-x-auto px-3 py-2 rounded-2xl"
        style={{ background: 'rgba(0,0,0,0.5)', scrollbarWidth: 'none' }}
        onClick={e => e.stopPropagation()}>
        {images.map((img, i) => (
          <button key={i} onClick={() => setCurrent(i)} aria-label={`Thumbnail ${i + 1}`}
            className="flex-shrink-0 rounded-lg overflow-hidden transition-all"
            style={{ width: 44, height: 32, opacity: i === current ? 1 : 0.4,
              outline: i === current ? '2px solid #F5A623' : 'none', outlineOffset: 1,
              transform: i === current ? 'scale(1.12)' : 'scale(1)' }}>
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────── HERO — light warm (matches reference image) ─────────────────── */
function GalleryHero() {
  const HERO_IMG = '/Gallery/children-school/20.jpeg';
  const scrollToGallery = () =>
    document.getElementById('children-school')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      className="relative overflow-hidden pt-[72px]"
      style={{
        background: 'linear-gradient(135deg, #FEF8F0 0%, #FDF0E0 40%, #FEF8F0 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(245,166,35,0.15) 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />

      {/* Blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.22) 0%, transparent 70%)' }} />
      <div className="absolute -bottom-20 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,120,35,0.14) 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-14 py-12">
        <div className="grid lg:grid-cols-[1fr_1.08fr] gap-10 xl:gap-20 items-center">

          {/* ── LEFT TEXT ── */}
          <motion.div
            initial={{ opacity: 0, x: -36 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-7 w-fit px-4 py-2 rounded-full"
              style={{ border: '1.5px solid rgba(245,166,35,0.5)', background: 'rgba(245,166,35,0.07)' }}
            >
              <Heart size={12} fill="#F5A623" color="#F5A623" />
              <span className="font-body font-bold uppercase tracking-[0.22em] text-[11px]" style={{ color: '#F5A623' }}>
                Our Gallery
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }}>
              <h1 className="font-playfair font-bold text-gray-950 mb-1"
                style={{ fontSize: 'clamp(42px, 5.5vw, 76px)', lineHeight: 1.0, letterSpacing: '-0.01em' }}>
                Moments That
              </h1>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="font-playfair font-bold"
                  style={{ fontSize: 'clamp(42px, 5.5vw, 76px)', lineHeight: 1.0, color: '#F5A623', letterSpacing: '-0.01em' }}>
                  Matter
                </h1>
                {/* Heart doodle SVG */}
                <svg width="38" height="32" viewBox="0 0 38 32" fill="none" className="flex-shrink-0 mt-1">
                  <path d="M19 30S2 20 2 9.5C2 5.36 5.36 2 9.5 2c2.56 0 4.82 1.3 6.16 3.28C17.04 3.3 19.3 2 21.86 2 25.64 2 28.7 5.36 28.7 9.5" stroke="#F5A623" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
                  <path d="M19 30s17-10 17-20.5" stroke="#F5A623" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
              <div className="mb-6" style={{ width: 52, height: 3, background: '#F5A623', borderRadius: 2 }} />
            </motion.div>

            {/* Description */}
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 }}
              className="font-body text-gray-500 leading-[1.85] mb-8"
              style={{ fontSize: 'clamp(13.5px, 1.1vw, 15.5px)', maxWidth: 380 }}>
              Every photograph tells a story of hope, change, and the lives we have touched together.
              Browse our sections to witness the impact created by your generosity.
            </motion.p>

            {/* Stat boxes */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-8">
              {[
                { label: 'Photos',   value: '69+' },
                { label: 'Programs', value: '3'   },
              ].map(s => (
                <div key={s.label}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{ background: '#fff', border: '1.5px solid rgba(0,0,0,0.09)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <Images size={18} style={{ color: '#F5A623' }} />
                  <div>
                    <div className="font-playfair font-bold text-gray-950 text-[20px] leading-none">{s.value}</div>
                    <div className="font-body text-gray-400 text-[11px] mt-0.5">{s.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-3 flex-wrap">
              <motion.button
                onClick={scrollToGallery}
                whileHover={{ scale: 1.05, boxShadow: '0 12px 32px rgba(245,166,35,0.40)' }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2.5 font-body font-bold text-white rounded-full px-7 py-3.5 text-[14px] tracking-wide"
                style={{ background: '#F5A623', boxShadow: '0 6px 20px rgba(245,166,35,0.32)' }}>
                <Heart size={14} fill="white" />
                Explore Gallery
              </motion.button>
              <motion.button
                onClick={scrollToGallery}
                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: '#fff', border: '1.5px solid rgba(0,0,0,0.12)', boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
                <ChevronRight size={18} color="#333" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* ── RIGHT IMAGE ── */}
          <motion.div
            initial={{ opacity: 0, x: 48, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.95, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            {/* Floating heart doodle top-center */}
            <motion.div
              animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
              <svg width="30" height="26" viewBox="0 0 30 26" fill="none">
                <path d="M15 24S1 15 1 7.5C1 3.9 3.9 1 7.5 1 10.08 1 12.3 2.44 13.5 4.58 14.7 2.44 16.92 1 19.5 1 23.1 1 26 3.9 26 7.5"
                  stroke="#F5A623" strokeWidth="2" strokeLinecap="round" fill="none"/>
                <path d="M15 24s14-9 14-16.5" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
            </motion.div>

            {/* Camera badge — top right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="absolute -top-3 -right-3 z-20 w-11 h-11 rounded-full flex items-center justify-center"
              style={{ background: '#F5A623', boxShadow: '0 4px 16px rgba(245,166,35,0.45)' }}>
              <Images size={16} color="#fff" />
            </motion.div>

            {/* Dashed border frame */}
            <div className="absolute pointer-events-none"
              style={{ inset: -12, borderRadius: 32, border: '2px dashed rgba(245,166,35,0.45)' }} />

            {/* Main photo */}
            <motion.div
              animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative rounded-3xl overflow-hidden w-full"
              style={{ aspectRatio: '4/3', boxShadow: '0 24px 70px rgba(0,0,0,0.14)', border: '3px solid #fff', maxWidth: 520 }}>
              <img src={HERO_IMG} alt="Adhyapana Foundation — children at school" className="w-full h-full object-cover" />

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap"
                style={{ background: '#F5A623', boxShadow: '0 6px 20px rgba(245,166,35,0.50)' }}>
                <Heart size={12} fill="white" color="white" />
                <span className="font-body font-bold text-white text-[13px]">Empowering Children</span>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ─────────────────── STICKY NAV ─────────────────── */
function SectionNav() {
  const [active, setActive] = useState(0);
  const scrollTo = (id, i) => {
    setActive(i);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
  };

  return (
    <div className="sticky top-[72px] z-40 py-3"
      style={{ background: 'rgba(254,248,240,0.96)', backdropFilter: 'blur(14px)',
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

/* ─────────────────── EDUCATION SECTION (2-up, 2s auto-slide) ─────────────────── */
function EducationSection() {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [paused, setPaused]   = useState(false);
  const [dir, setDir]         = useState(1);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const images  = educationImages;
  const total   = images.length;
  const VISIBLE = 2;
  const maxIdx  = total - VISIBLE;

  const next = useCallback(() => { setDir(1);  setCurrent(c => c >= maxIdx ? 0 : c + 1); }, [maxIdx]);
  const prev = useCallback(() => { setDir(-1); setCurrent(c => c <= 0 ? maxIdx : c - 1); }, [maxIdx]);
  const goTo = i => { setDir(i > current ? 1 : -1); setCurrent(i); };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 2000);
    return () => clearInterval(id);
  }, [paused, next]);

  const visible = Array.from({ length: VISIBLE }, (_, i) => images[(current + i) % total]);

  return (
    <>
      <AnimatePresence>
        {lightbox !== null && <Lightbox images={images} startIndex={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>

      <motion.section id="children-school" ref={ref}
        initial={{ opacity: 0, y: 48 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="py-20 relative overflow-hidden"
        style={{ background: '#FEFAF6' }}
        onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>

        <div className="absolute pointer-events-none -top-32 -right-32"
          style={{ width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,166,35,0.10) 0%, transparent 70%)' }} />

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
              <p className="font-body text-gray-500 leading-[1.8] max-w-lg" style={{ fontSize: 'clamp(13.5px, 1.05vw, 15px)' }}>
                Every classroom is a world of possibility. We bring quality education and joyful learning experiences to children who need it most.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="font-body text-[12px] font-semibold tabular-nums" style={{ color: '#F5A623' }}>
                {current + 1}–{Math.min(current + VISIBLE, total)} / {total}
              </span>
              <button onClick={prev} aria-label="Previous"
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                style={{ background: '#fff', boxShadow: '0 2px 14px rgba(0,0,0,0.10)', color: '#F5A623', border: '1.5px solid rgba(245,166,35,0.35)' }}>
                <ChevronLeft size={20} />
              </button>
              <button onClick={next} aria-label="Next"
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                style={{ background: '#F5A623', color: '#fff', boxShadow: '0 4px 16px rgba(245,166,35,0.38)' }}>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Sliding cards */}
          <div className="overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.div key={current} custom={dir}
                variants={{
                  enter: d => ({ x: d > 0 ? '8%' : '-8%', opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit:  d => ({ x: d > 0 ? '-8%' : '8%', opacity: 0 }),
                }}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-5 sm:grid-cols-2">
                {visible.map((img, i) => {
                  const globalIdx = (current + i) % total;
                  return (
                    <motion.div key={`${current}-${i}`}
                      whileHover={{ y: -8, scale: 1.015 }} transition={{ duration: 0.32, ease: 'easeOut' }}
                      onClick={() => setLightbox(globalIdx)}
                      className="relative rounded-3xl overflow-hidden cursor-zoom-in group"
                      style={{ aspectRatio: '16/11', boxShadow: '0 8px 40px rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.05)' }}>
                      <img src={img} alt={`Education — photo ${globalIdx + 1}`}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
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

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-7">
            {Array.from({ length: maxIdx + 1 }).map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}
                style={{ width: i === current ? 28 : 8, height: 8, borderRadius: 9999,
                  background: i === current ? '#F5A623' : 'rgba(0,0,0,0.15)',
                  transition: 'all 0.3s ease', border: 'none', cursor: 'pointer', padding: 0 }} />
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
}

/* ─────────────────── FEMALE SVG ─────────────────── */
function FemaleDecoration({ side = 'left', color = '#E84393' }) {
  const flip = side === 'right' ? 'scale(-1,1)' : 'scale(1,1)';
  return (
    <svg viewBox="0 0 160 340" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', transform: flip }}>
      <circle cx="80" cy="48" r="28" fill={color} opacity="0.18" />
      <circle cx="80" cy="48" r="22" fill={color} opacity="0.30" />
      <ellipse cx="80" cy="32" rx="24" ry="14" fill={color} opacity="0.55" />
      <ellipse cx="58" cy="46" rx="8" ry="20" fill={color} opacity="0.40" />
      <ellipse cx="102" cy="46" rx="8" ry="20" fill={color} opacity="0.40" />
      <circle cx="73" cy="50" r="2.5" fill={color} opacity="0.7" />
      <circle cx="87" cy="50" r="2.5" fill={color} opacity="0.7" />
      <path d="M74 58 Q80 63 86 58" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <rect x="74" y="70" width="12" height="14" rx="4" fill={color} opacity="0.25" />
      <path d="M48,84 Q80,76 112,84 L120,200 Q80,225 40,200 Z" fill={color} opacity="0.14" />
      <path d="M48,84 Q80,76 112,84 L116,180 Q80,205 44,180 Z" fill={color} opacity="0.22" />
      <path d="M110,90 Q130,110 125,145 Q120,165 108,172" stroke={color} strokeWidth="5" strokeLinecap="round" opacity="0.35" fill="none" />
      <path d="M50,92 Q30,120 35,148" stroke={color} strokeWidth="9" strokeLinecap="round" opacity="0.22" fill="none" />
      <path d="M110,92 Q130,120 125,148" stroke={color} strokeWidth="9" strokeLinecap="round" opacity="0.22" fill="none" />
      <circle cx="34" cy="148" r="7" stroke={color} strokeWidth="2.5" opacity="0.45" fill="none" />
      <circle cx="126" cy="148" r="7" stroke={color} strokeWidth="2.5" opacity="0.45" fill="none" />
      <path d="M44,195 Q60,280 55,340" stroke={color} strokeWidth="14" strokeLinecap="round" opacity="0.18" fill="none" />
      <path d="M116,195 Q100,280 105,340" stroke={color} strokeWidth="14" strokeLinecap="round" opacity="0.18" fill="none" />
      <circle cx="80" cy="43" r="3" fill={color} opacity="0.75" />
      <ellipse cx="58" cy="58" rx="3" ry="5" fill={color} opacity="0.55" />
      <ellipse cx="102" cy="58" rx="3" ry="5" fill={color} opacity="0.55" />
      <path d="M65,82 Q80,90 95,82" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.55" fill="none" />
      <circle cx="80" cy="90" r="3" fill={color} opacity="0.65" />
    </svg>
  );
}

/* ─────────────────── WOMEN SECTION ─────────────────── */
function WomensSection() {
  const [lightbox, setLightbox] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <>
      <AnimatePresence>
        {lightbox !== null && <Lightbox images={womenImages} startIndex={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>

      <motion.section id="women-health" ref={ref}
        initial={{ opacity: 0, y: 48 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #fff0f8 0%, #fce7f3 50%, #fdf2fb 100%)' }}>

        <div className="absolute pointer-events-none -top-20 -right-20 w-[440px] h-[440px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #f9a8d4 0%, transparent 70%)' }} />
        <div className="absolute pointer-events-none -bottom-16 -left-16 w-80 h-80 rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, #f472b6 0%, transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, #E84393 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        {[{x:'8%',y:'12%',s:22,o:0.18},{x:'92%',y:'18%',s:16,o:0.14},{x:'5%',y:'75%',s:18,o:0.15},{x:'88%',y:'70%',s:24,o:0.17}].map((h,i)=>(
          <div key={i} className="absolute pointer-events-none"
            style={{ left:h.x, top:h.y, animation:`floatY ${3+i}s ease-in-out infinite`, animationDelay:`${i*0.7}s` }}>
            <Heart size={h.s} color="#E84393" fill="#E84393" opacity={h.o} />
          </div>
        ))}

        <div className="absolute left-0 bottom-0 pointer-events-none hidden lg:block" style={{ width: 110, height: 280, opacity: 0.55 }}>
          <FemaleDecoration side="left" color="#E84393" />
        </div>
        <div className="absolute right-0 bottom-0 pointer-events-none hidden lg:block" style={{ width: 110, height: 280, opacity: 0.55 }}>
          <FemaleDecoration side="right" color="#E84393" />
        </div>

        <div className="max-w-7xl mx-auto px-5 lg:px-10 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }} className="text-center mb-12">
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
            <div className="flex items-center justify-center gap-2 mb-5">
              <div style={{ height: 2.5, width: 30, background: '#E84393', borderRadius: 99 }} />
              <Heart size={12} color="#E84393" fill="#E84393" />
              <div style={{ height: 2.5, width: 30, background: '#E84393', borderRadius: 99 }} />
            </div>
            <p className="font-body text-gray-500 leading-[1.85] max-w-xl mx-auto" style={{ fontSize: 'clamp(13.5px, 1.1vw, 15.5px)' }}>
              Our sanitary hygiene drives ensure women across underserved communities have access to the resources and knowledge they deserve.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {womenImages.map((img, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setLightbox(i)}
                className="relative group cursor-zoom-in rounded-3xl overflow-hidden"
                style={{ aspectRatio: '3/4', boxShadow: '0 12px 48px rgba(232,67,147,0.15)', border: '2px solid rgba(232,67,147,0.12)' }}>
                <img src={img} alt={`Women Health — photo ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  style={{ transition: 'transform 0.7s ease' }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5"
                  style={{ background: 'linear-gradient(to top, rgba(190,24,93,0.55) 0%, transparent 55%)' }}>
                  <div className="w-full flex items-center justify-between">
                    <span className="font-body font-bold text-white text-[13px]">View Photo</span>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(4px)' }}>
                      <ZoomIn size={16} color="#fff" />
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 left-0 right-0 h-[3.5px]"
                  style={{ background: 'linear-gradient(90deg, #E84393, #f9a8d4, #E84393)' }} />
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(232,67,147,0.90)' }}>
                  <Heart size={13} fill="white" color="white" />
                </div>
              </motion.div>
            ))}
          </div>

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

/* ─────────────────── EVENTS SECTION (train scroll, warm dark theme) ─────────────────── */
function EventsSection() {
  const [lightbox, setLightbox] = useState(null);
  const [paused, setPaused]    = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const rowA = eventsImages.filter((_, i) => i % 2 === 0);
  const rowB = eventsImages.filter((_, i) => i % 2 === 1);

  return (
    <>
      <AnimatePresence>
        {lightbox !== null && <Lightbox images={eventsImages} startIndex={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>

      <motion.section id="events-outreach" ref={ref}
        initial={{ opacity: 0, y: 48 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="py-20 relative overflow-hidden"
        style={{ background: '#1E1A14' }}>

        {/* Warm glow blobs */}
        <div className="absolute pointer-events-none -top-24 -left-24 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.10) 0%, transparent 70%)' }} />
        <div className="absolute pointer-events-none -bottom-24 -right-24 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,120,35,0.09) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, #F5A623 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="max-w-7xl mx-auto px-5 lg:px-10 mb-10 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <p className="font-body text-[11px] font-bold uppercase tracking-[0.3em] mb-2" style={{ color: '#F5A623' }}>
                Together We Grow
              </p>
              <div className="mb-4" style={{ width: 36, height: 3, background: '#F5A623', borderRadius: 2 }} />
              <h2 className="font-playfair font-bold text-white mb-3"
                style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', lineHeight: 1.1 }}>
                Events & <span style={{ color: '#F5A623' }}>Community Outreach</span>
              </h2>
              <p className="font-body text-white/55 leading-[1.8] max-w-lg" style={{ fontSize: 'clamp(13.5px, 1.05vw, 15px)' }}>
                From fundraisers to field visits, every event brings our community closer and amplifies the impact we create together.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 px-4 py-2.5 rounded-full"
              style={{ background: 'rgba(245,166,35,0.12)', border: '1px solid rgba(245,166,35,0.25)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#F5A623' }} />
              <span className="font-body text-[12px] font-semibold" style={{ color: '#F5A623' }}>
                {eventsImages.length} moments captured
              </span>
            </div>
          </div>
        </div>

        {/* Train rows */}
        <div className="relative z-10" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {/* Edge fades */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-28 z-20 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #1E1A14 0%, transparent 100%)' }} />
          <div className="absolute inset-y-0 right-0 w-16 md:w-28 z-20 pointer-events-none"
            style={{ background: 'linear-gradient(270deg, #1E1A14 0%, transparent 100%)' }} />

          {/* Row A — left to right-to-left */}
          <div className="overflow-hidden mb-5">
            <div className="flex gap-4"
              style={{ width: 'max-content', animation: 'trainScroll 40s linear infinite', animationPlayState: paused ? 'paused' : 'running' }}>
              {[...rowA, ...rowA].map((img, i) => (
                <div key={i}
                  onClick={() => setLightbox(eventsImages.indexOf(img) !== -1 ? eventsImages.indexOf(img) : 0)}
                  className="relative flex-shrink-0 rounded-2xl overflow-hidden cursor-zoom-in group"
                  style={{ width: 'clamp(220px, 22vw, 300px)', aspectRatio: '4/3',
                    boxShadow: '0 6px 28px rgba(0,0,0,0.4)', border: '1px solid rgba(245,166,35,0.12)' }}>
                  <img src={img} alt="Event photo" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ background: 'rgba(245,166,35,0.25)' }}>
                    <div className="w-11 h-11 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(245,166,35,0.85)', backdropFilter: 'blur(4px)' }}>
                      <ZoomIn size={18} color="#fff" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: '#F5A623' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Row B — opposite direction, slower */}
          <div className="overflow-hidden">
            <div className="flex gap-4"
              style={{ width: 'max-content', animation: 'trainScroll 50s linear infinite', animationPlayState: paused ? 'paused' : 'running', animationDirection: 'reverse' }}>
              {[...rowB, ...rowB].map((img, i) => (
                <div key={i}
                  onClick={() => setLightbox(eventsImages.indexOf(img) !== -1 ? eventsImages.indexOf(img) : 0)}
                  className="relative flex-shrink-0 rounded-2xl overflow-hidden cursor-zoom-in group"
                  style={{ width: 'clamp(220px, 22vw, 300px)', aspectRatio: '4/3',
                    boxShadow: '0 6px 28px rgba(0,0,0,0.4)', border: '1px solid rgba(245,166,35,0.10)' }}>
                  <img src={img} alt="Event photo" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ background: 'rgba(245,166,35,0.25)' }}>
                    <div className="w-11 h-11 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(245,166,35,0.85)', backdropFilter: 'blur(4px)' }}>
                      <ZoomIn size={18} color="#fff" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: '#F5A623' }} />
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {paused && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none px-4 py-2 rounded-full"
                style={{ background: 'rgba(245,166,35,0.90)', color: '#fff' }}>
                <span className="font-body text-[12px] font-semibold">⏸ Paused</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center font-body text-[12px] mt-6 relative z-10" style={{ color: 'rgba(245,166,35,0.55)' }}>
          Hover to pause · Click any photo to enlarge
        </p>
      </motion.section>
    </>
  );
}

/* ─────────────────── MAIN GALLERY PAGE ─────────────────── */
export default function Gallery() {
  return (
    <main>
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
          <p className="font-body text-white/55 leading-[1.85] mb-10" style={{ fontSize: 'clamp(14px, 1.1vw, 15.5px)' }}>
            Your contribution funds programs that fill these galleries with smiles, learning, and hope. Every rupee makes a difference.
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
