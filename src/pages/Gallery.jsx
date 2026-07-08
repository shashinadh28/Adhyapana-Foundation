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
  '/Gallery/children-school/18.jpeg',
  '/Gallery/children-school/20.jpeg', '/Gallery/children-school/39.jpeg',
  '/Gallery/children-school/57.jpeg', '/Gallery/children-school/58.jpeg',
  '/Gallery/102.jpeg',
];

const womenImages = [
  '/Gallery/Women-sanitary/56.jpeg',
  '/Gallery/Women-sanitary/81.jpeg',
  '/Gallery/Women-sanitary/82.jpeg',
  '/Gallery/Women-sanitary/83.jpeg',
];

const eventsImages = [
  '/Gallery/12.jpeg', '/Gallery/13.jpeg',
  '/Gallery/25.jpeg', '/Gallery/26.jpeg', '/Gallery/30.jpeg',
  '/Gallery/31.jpeg', '/Gallery/32.jpeg', '/Gallery/33.jpeg',
  '/Gallery/34.jpeg', '/Gallery/35.jpeg', '/Gallery/36.jpeg',
  '/Gallery/37.jpeg', '/Gallery/38.jpeg', '/Gallery/40.jpeg',
  '/Gallery/41.jpeg', '/Gallery/43.jpeg',
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
  '/Gallery/80.jpeg', '/Gallery/101.jpeg', '/Gallery/103.jpeg',
  '/Gallery/100.jpeg',
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

/* ─────────────────── HERO — premium enhanced ─────────────────── */
function GalleryHero() {
  const HERO_IMG   = '/Gallery/children-school/20.jpeg';
  const PREVIEW    = [
    '/Gallery/children-school/4.jpeg',
    '/Gallery/children-school/14.jpeg',
    '/Gallery/Women-sanitary/56.jpeg',
    '/Gallery/30.jpeg',
  ];
  const scrollToGallery = () =>
    document.getElementById('children-school')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      className="relative overflow-hidden pt-[72px]"
      style={{
        background: 'linear-gradient(150deg, #FEF9F2 0%, #FDF2DC 35%, #FEF6EC 70%, #FEF9F2 100%)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Large decorative circles ── */}
      <div className="absolute pointer-events-none"
        style={{ width: 700, height: 700, borderRadius: '50%', top: '-20%', left: '-15%',
          background: 'radial-gradient(circle, rgba(245,166,35,0.10) 0%, transparent 65%)' }} />
      <div className="absolute pointer-events-none"
        style={{ width: 550, height: 550, borderRadius: '50%', bottom: '-12%', right: '-10%',
          background: 'radial-gradient(circle, rgba(245,120,35,0.10) 0%, transparent 65%)' }} />

      {/* ── Fine dot grid ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(245,166,35,0.14) 1.2px, transparent 1.2px)', backgroundSize: '28px 28px', opacity: 0.8 }} />

      {/* ── Animated ring pulses ── */}
      {[{ d: 0, s: 1 }, { d: 0.8, s: 0.92 }, { d: 1.6, s: 0.84 }].map((r, i) => (
        <motion.div key={i}
          className="absolute right-[12%] top-[38%] rounded-full pointer-events-none hidden lg:block"
          style={{ width: 420, height: 420, border: '1.5px solid rgba(245,166,35,0.22)', marginTop: -210, marginRight: -210 }}
          animate={{ scale: [r.s, r.s + 0.06, r.s], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, delay: r.d, ease: 'easeInOut' }}
        />
      ))}

      {/* ── Main content grid ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-14 py-10">
        <div className="grid lg:grid-cols-[1fr_1.12fr] gap-12 xl:gap-24 items-center">

          {/* ════ LEFT TEXT ════ */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2.5 mb-7 w-fit px-5 py-2.5 rounded-full"
              style={{ border: '1.5px solid rgba(245,166,35,0.50)', background: 'rgba(245,166,35,0.08)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#F5A623' }} />
              <Heart size={11} fill="#F5A623" color="#F5A623" />
              <span className="font-body font-bold uppercase tracking-[0.28em] text-[10.5px]" style={{ color: '#F5A623' }}>
                Our Gallery
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }}>
              <p className="font-playfair font-bold text-gray-800"
                style={{ fontSize: 'clamp(40px, 5.8vw, 78px)', lineHeight: 0.98, letterSpacing: '-0.02em' }}>
                Moments
              </p>
              <div className="flex items-end gap-3">
                <p className="font-playfair font-bold"
                  style={{ fontSize: 'clamp(40px, 5.8vw, 78px)', lineHeight: 0.98,
                    fontStyle: 'italic', color: '#F5A623', letterSpacing: '-0.02em' }}>
                  That Matter
                </p>
                {/* hand-drawn heart */}
                <svg width="44" height="36" viewBox="0 0 44 36" fill="none" className="flex-shrink-0 mb-1">
                  <path d="M22 34S3 23 3 11C3 6.03 7.03 2 12 2c3.18 0 5.98 1.64 7.6 4.12C21.22 3.64 24.02 2 27.2 2 32.17 2 36.2 6.03 36.2 11" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  <path d="M22 34s19-11 19-23" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
              {/* Gradient underline bar */}
              <motion.div className="mt-4 mb-6 rounded-full"
                initial={{ width: 0 }} animate={{ width: 64 }}
                transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{ height: 4, background: 'linear-gradient(90deg, #F5A623, #E85D26)' }} />
            </motion.div>

            {/* Description */}
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.22 }}
              className="font-body text-gray-500 leading-[1.9] mb-8"
              style={{ fontSize: 'clamp(13.5px, 1.1vw, 15.5px)', maxWidth: 390 }}>
              Every photograph tells a story of hope, change, and the lives we have touched together.
              Browse our three sections to witness the lasting impact created by your generosity.
            </motion.p>

            {/* Preview thumbnails strip */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.32 }}
              className="flex items-center gap-2.5 mb-8">
              {PREVIEW.map((img, i) => (
                <motion.div key={i} whileHover={{ y: -4, scale: 1.08 }} transition={{ duration: 0.25 }}
                  className="rounded-xl overflow-hidden flex-shrink-0 cursor-pointer"
                  style={{ width: 60, height: 44, border: '2px solid #fff', boxShadow: '0 4px 14px rgba(0,0,0,0.12)' }}
                  onClick={scrollToGallery}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </motion.div>
              ))}
              <button onClick={scrollToGallery}
                className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-body font-bold text-[11px]"
                style={{ background: 'rgba(245,166,35,0.12)', color: '#F5A623', border: '1.5px solid rgba(245,166,35,0.30)' }}>
                +65
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.38 }}
              className="flex items-center gap-6 mb-8 flex-wrap">
              {[
                { value: '69+',  label: 'Photos',   icon: Images },
                { value: '3',    label: 'Programs',  icon: Heart  },
                { value: '100%', label: 'Authentic', icon: ChevronRight },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(245,166,35,0.12)' }}>
                      <Icon size={14} style={{ color: '#F5A623' }} />
                    </div>
                    <div>
                      <div className="font-playfair font-bold text-gray-950 text-[18px] leading-none">{s.value}</div>
                      <div className="font-body text-gray-400 text-[10.5px] mt-0.5">{s.label}</div>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.46 }}
              className="flex items-center gap-3 flex-wrap">
              <motion.button
                onClick={scrollToGallery}
                whileHover={{ scale: 1.05, boxShadow: '0 14px 36px rgba(245,166,35,0.45)' }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2.5 font-body font-bold text-white rounded-full px-8 py-4 text-[14px] tracking-wide"
                style={{ background: 'linear-gradient(135deg, #F5A623 0%, #E85D26 100%)', boxShadow: '0 6px 22px rgba(245,166,35,0.35)' }}>
                <Images size={15} color="white" />
                Explore Gallery
              </motion.button>
              <motion.button
                onClick={scrollToGallery}
                whileHover={{ scale: 1.06, background: '#f5f0eb' }} whileTap={{ scale: 0.96 }}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                style={{ background: '#fff', border: '1.5px solid rgba(0,0,0,0.10)', boxShadow: '0 3px 12px rgba(0,0,0,0.08)' }}>
                <ChevronRight size={20} color="#555" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* ════ RIGHT IMAGE ════ */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.94 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            {/* Pulsing rings */}
            {[{ s: 1.14, o: 0.18, d: 0 }, { s: 1.28, o: 0.10, d: 0.6 }].map((r, i) => (
              <motion.div key={i} className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ border: '2px solid rgba(245,166,35,0.5)', borderRadius: 28 }}
                animate={{ scale: [1, r.s, 1], opacity: [r.o, 0, r.o] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: r.d, ease: 'easeOut' }} />
            ))}

            {/* Dashed outer frame */}
            <div className="absolute pointer-events-none"
              style={{ inset: -14, borderRadius: 32, border: '2px dashed rgba(245,166,35,0.40)' }} />

            {/* Main image card */}
            <motion.div
              animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative rounded-3xl overflow-hidden w-full"
              style={{ aspectRatio: '4/3', boxShadow: '0 32px 80px rgba(0,0,0,0.16)', border: '4px solid #fff', maxWidth: 540, zIndex: 2 }}>
              <img src={HERO_IMG} alt="Adhyapana Foundation — children at school" className="w-full h-full object-cover" />

              {/* Bottom tint gradient */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.28) 0%, transparent 50%)' }} />

              {/* "Empowering Children" badge */}
              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.55 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap"
                style={{ background: '#F5A623', boxShadow: '0 8px 24px rgba(245,166,35,0.55)' }}>
                <Heart size={12} fill="white" color="white" />
                <span className="font-body font-bold text-white text-[13px]">Empowering Children</span>
              </motion.div>
            </motion.div>

            {/* Camera badge — top right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.45 }}
              className="absolute -top-4 -right-4 z-20 w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #F5A623 0%, #E85D26 100%)', boxShadow: '0 6px 20px rgba(245,166,35,0.50)' }}>
              <Images size={20} color="#fff" />
            </motion.div>

            {/* Floating heart doodle top */}
            <motion.div
              animate={{ y: [0, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-8 left-[40%] z-20">
              <svg width="34" height="28" viewBox="0 0 34 28" fill="none">
                <path d="M17 26S2 17 2 8.5C2 4.36 5.36 1 9.5 1c2.56 0 4.82 1.44 6.02 3.58C16.72 2.44 18.98 1 21.54 1 25.64 1 29 4.36 29 8.5"
                  stroke="#F5A623" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
                <path d="M17 26s15-9 15-17.5" stroke="#F5A623" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
              </svg>
            </motion.div>

            {/* Section count badge — bottom left floating */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="absolute -bottom-5 -left-5 z-20"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{ background: '#fff', boxShadow: '0 10px 32px rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.06)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(245,166,35,0.12)' }}>
                  <Images size={18} style={{ color: '#F5A623' }} />
                </div>
                <div>
                  <div className="font-playfair font-bold text-gray-950 text-[20px] leading-none">69+</div>
                  <div className="font-body text-gray-400 text-[10px] mt-0.5">Captured Moments</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* ── Wave divider ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full block" style={{ height: 56 }}>
          <path d="M0,72 L1440,72 L1440,28 Q1200,68 960,32 Q720,0 480,32 Q240,64 0,28 Z" fill="#FEFAF6" />
        </svg>
      </div>
    </section>
  );
}


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

/* ─────────────────── WOMEN SECTION (2-up sliding, slides one by one) ─────────────────── */
function WomensSection() {
  const [lightbox, setLightbox] = useState(null);
  const [current, setCurrent]   = useState(0);
  const [paused, setPaused]     = useState(false);
  const [dir, setDir]           = useState(1);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const images  = womenImages;
  const total   = images.length;
  const VISIBLE = 2;
  const maxIdx  = total - 1; // Slide one by one, loopable

  const next = useCallback(() => {
    setDir(1);
    setCurrent(c => (c + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDir(-1);
    setCurrent(c => (c - 1 + total) % total);
  }, [total]);

  const goTo = (i) => {
    setDir(i > current ? 1 : -1);
    setCurrent(i);
  };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [paused, next]);

  // We display VISIBLE images starting from current index
  const visible = Array.from({ length: VISIBLE }, (_, i) => {
    const idx = (current + i) % total;
    return { img: images[idx], globalIdx: idx };
  });

  return (
    <>
      <AnimatePresence>
        {lightbox !== null && <Lightbox images={images} startIndex={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>

      <motion.section id="women-health" ref={ref}
        initial={{ opacity: 0, y: 48 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #fff0f8 0%, #fce7f3 50%, #fdf2fb 100%)' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
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
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
            <div>
              <p className="font-body text-[11px] font-bold uppercase tracking-[0.3em] mb-2" style={{ color: '#E84393' }}>
                Dignity. Awareness. Empowerment.
              </p>
              <div className="mb-4" style={{ width: 36, height: 3, background: '#E84393', borderRadius: 2 }} />
              <h2 className="font-playfair font-bold mb-3 text-gray-950"
                style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', lineHeight: 1.1 }}>
                Women's Health &amp; <span style={{ color: '#E84393' }}>Hygiene</span>
              </h2>
              <p className="font-body text-gray-500 leading-[1.8] max-w-lg" style={{ fontSize: 'clamp(13.5px, 1.05vw, 15px)' }}>
                Our sanitary hygiene drives ensure women across underserved communities have access to the resources and knowledge they deserve.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="font-body text-[12px] font-semibold tabular-nums" style={{ color: '#E84393' }}>
                {current + 1}–{((current + VISIBLE - 1) % total) + 1} / {total}
              </span>
              <button onClick={prev} aria-label="Previous"
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                style={{ background: '#fff', boxShadow: '0 2px 14px rgba(0,0,0,0.10)', color: '#E84393', border: '1.5px solid rgba(232,67,147,0.35)' }}>
                <ChevronLeft size={20} />
              </button>
              <button onClick={next} aria-label="Next"
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                style={{ background: '#E84393', color: '#fff', boxShadow: '0 4px 16px rgba(232,67,147,0.38)' }}>
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
                {visible.map(({ img, globalIdx }, i) => {
                  return (
                    <motion.div key={`${current}-${i}`}
                      whileHover={{ y: -8, scale: 1.015 }} transition={{ duration: 0.32, ease: 'easeOut' }}
                      onClick={() => setLightbox(globalIdx)}
                      className="relative rounded-3xl overflow-hidden cursor-zoom-in group"
                      style={{ aspectRatio: '16/11', boxShadow: '0 8px 40px rgba(0,0,0,0.12)', border: '1px solid rgba(232,67,147,0.15)' }}>
                      <img src={img} alt={`Women Health — photo ${globalIdx + 1}`}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 flex items-end justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'linear-gradient(to top, rgba(190,24,93,0.5) 0%, transparent 60%)' }}>
                        <div className="w-11 h-11 rounded-full flex items-center justify-center"
                          style={{ background: 'rgba(232,67,147,0.9)', backdropFilter: 'blur(4px)' }}>
                          <ZoomIn size={18} color="#fff" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-[3.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: '#E84393' }} />
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-7">
            {Array.from({ length: total }).map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}
                style={{ width: i === current ? 28 : 8, height: 8, borderRadius: 9999,
                  background: i === current ? '#E84393' : 'rgba(232,67,147,0.20)',
                  transition: 'all 0.3s ease', border: 'none', cursor: 'pointer', padding: 0 }} />
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
}

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
