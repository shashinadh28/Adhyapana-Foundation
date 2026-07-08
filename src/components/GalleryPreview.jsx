import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, ArrowLeft, Images, Heart, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 'children-school',
    label: 'Education & Children',
    description: 'Every classroom is a world of possibility. We bring quality education and joyful learning to children who need it most.',
    accent: '#F5A623',
    bg: 'linear-gradient(150deg, #FEF9F2 0%, #FDF2DC 100%)',
    textColor: '#92400e',
    tagColor: 'rgba(245,166,35,0.12)',
    tagText: '#F5A623',
    icon: Images,
    previewImg: '/landing_page/Adhyapana_Landing_Image.png',
    thumbs: ['/Gallery/children-school/3.jpeg', '/Gallery/children-school/14.jpeg', '/Gallery/children-school/57.jpeg'],
    count: '15+',
    hash: '#children-school',
    darkCard: false,
  },
  {
    id: 'women-health',
    label: "Women's Health & Hygiene",
    description: 'Empowering women across underserved communities with sanitary resources, awareness drives, and the dignity they deserve.',
    accent: '#E84393',
    bg: 'linear-gradient(150deg, #fff0f8 0%, #fce7f3 100%)',
    textColor: '#be185d',
    tagColor: 'rgba(232,67,147,0.12)',
    tagText: '#E84393',
    icon: Heart,
    previewImg: '/Gallery/Women-sanitary/82.jpeg',
    thumbs: ['/Gallery/Women-sanitary/56.jpeg', '/Gallery/Women-sanitary/81.jpeg', '/Gallery/Women-sanitary/83.jpeg'],
    count: '4',
    hash: '#women-health',
    darkCard: false,
  },
  {
    id: 'events-outreach',
    label: 'Events & Community Outreach',
    description: 'From fundraisers to field visits, every event brings our community closer and amplifies the impact we create together.',
    accent: '#F5A623',
    bg: 'linear-gradient(150deg, #1E1A14 0%, #2d2618 100%)',
    textColor: '#fff',
    tagColor: 'rgba(245,166,35,0.18)',
    tagText: '#F5A623',
    icon: Users,
    previewImg: '/Gallery/44.jpeg',
    thumbs: ['/Gallery/30.jpeg', '/Gallery/50.jpeg', '/Gallery/63.jpeg'],
    count: '54+',
    hash: '#events-outreach',
    darkCard: true,
  },
];

export default function GalleryPreview() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });
  const nav = useNavigate();

  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const total = categories.length;

  const next = useCallback(() => { setDir(1);  setCurrent(c => (c + 1) % total); }, [total]);
  const prev = useCallback(() => { setDir(-1); setCurrent(c => (c - 1 + total) % total); }, [total]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [paused, next]);

  const cat = categories[current];
  const Icon = cat.icon;

  return (
    <section
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{ background: '#f9f7f4' }}
    >
      {/* Decorative blobs */}
      <div className="absolute -top-28 -right-28 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.09) 0%, transparent 70%)' }} />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(46,139,122,0.07) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-5 lg:px-10 relative z-10">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2.5 mb-5 px-5 py-2.5 rounded-full"
            style={{ background: 'rgba(245,166,35,0.10)', border: '1.5px solid rgba(245,166,35,0.28)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#F5A623' }} />
            <Images size={12} style={{ color: '#F5A623' }} />
            <span className="font-body font-bold uppercase tracking-[0.26em] text-[10.5px]" style={{ color: '#F5A623' }}>
              Our Gallery
            </span>
          </div>

          <h2 className="font-playfair font-bold text-gray-950 mb-3"
            style={{ fontSize: 'clamp(30px, 4vw, 54px)', lineHeight: 1.08 }}>
            Moments That{' '}
            <span style={{ fontStyle: 'italic', color: '#F5A623' }}>Matter</span>
          </h2>
          <p className="font-body text-gray-500 leading-[1.85] max-w-xl mx-auto"
            style={{ fontSize: 'clamp(13.5px, 1.05vw, 15.5px)' }}>
            Every photograph tells a story of hope, change, and the lives we have touched together.
          </p>
        </motion.div>

        {/* ── Full-width card carousel ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Card viewport */}
          <div
            className="w-full rounded-3xl overflow-hidden relative"
            style={{
              minHeight: 500,
              boxShadow: '0 24px 72px rgba(0,0,0,0.14)',
            }}
          >
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.div
                key={cat.id}
                custom={dir}
                variants={{
                  enter: d => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit:  d => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2"
                style={{ background: cat.bg }}
              >
                {/* ── LEFT: text panel ── */}
                <div className="flex flex-col justify-center p-10 lg:p-14 relative z-10 order-2 lg:order-1">
                  {/* Eyebrow */}
                  <div className="inline-flex items-center gap-2 mb-5 w-fit px-4 py-2 rounded-full"
                    style={{ background: cat.tagColor, border: `1px solid ${cat.accent}33` }}>
                    <Icon size={13} style={{ color: cat.accent }} />
                    <span className="font-body font-bold text-[10px] uppercase tracking-[0.25em]"
                      style={{ color: cat.accent }}>Programme</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-playfair font-bold mb-4"
                    style={{
                      fontSize: 'clamp(24px, 3vw, 42px)',
                      lineHeight: 1.12,
                      color: cat.darkCard ? '#fff' : '#111',
                    }}>
                    {cat.label}
                  </h3>

                  {/* Description */}
                  <p className="font-body leading-[1.85] mb-7"
                    style={{
                      fontSize: 'clamp(13.5px, 1.1vw, 15.5px)',
                      color: cat.darkCard ? 'rgba(255,255,255,0.60)' : '#6b7280',
                      maxWidth: 420,
                    }}>
                    {cat.description}
                  </p>

                  {/* Thumbnail strip */}
                  <div className="flex items-center gap-2.5 mb-8">
                    {cat.thumbs.map((src, j) => (
                      <div
                        key={j}
                        className="rounded-xl overflow-hidden flex-shrink-0"
                        style={{ width: 56, height: 42, border: `2px solid ${cat.accent}44`, boxShadow: '0 3px 10px rgba(0,0,0,0.12)' }}
                      >
                        <img src={src} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <div className="font-body font-bold text-[11px] px-3 py-1.5 rounded-full"
                      style={{ background: cat.tagColor, color: cat.accent }}>
                      +{cat.count}
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: `0 12px 32px ${cat.accent}55` }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => nav('/gallery' + cat.hash)}
                    className="inline-flex items-center gap-2.5 font-body font-bold text-white rounded-full px-8 py-4 text-[14px] tracking-wide w-fit"
                    style={{ background: `linear-gradient(135deg, ${cat.accent} 0%, ${cat.accent}cc 100%)`, boxShadow: `0 6px 20px ${cat.accent}44` }}
                  >
                    <Images size={15} />
                    View Gallery
                    <ArrowRight size={14} />
                  </motion.button>
                </div>

                {/* ── RIGHT: hero image ── */}
                <div className="relative overflow-hidden order-1 lg:order-2" style={{ minHeight: 320 }}>
                  <img
                    src={cat.previewImg}
                    alt={cat.label}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ transition: 'transform 0.7s ease' }}
                  />
                  {/* Photo count badge */}
                  <div
                    className="absolute bottom-5 left-5 z-10 font-body font-bold text-white text-[12px] px-4 py-2 rounded-full flex items-center gap-2"
                    style={{ background: `${cat.accent}ee`, boxShadow: `0 4px 14px ${cat.accent}55` }}
                  >
                    <Images size={13} />
                    {cat.count} Photos
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Prev / Next arrows ── */}
          <button
            onClick={prev}
            aria-label="Previous category"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 20px rgba(0,0,0,0.14)', color: '#333' }}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            aria-label="Next category"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            style={{ background: '#F5A623', boxShadow: '0 4px 20px rgba(245,166,35,0.40)', color: '#fff' }}
          >
            <ChevronRight size={22} />
          </button>

          {/* ── Dots + counter ── */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {categories.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); }}
                aria-label={`Slide ${i + 1}`}
                style={{
                  width: i === current ? 32 : 10,
                  height: 10,
                  borderRadius: 9999,
                  background: i === current ? '#F5A623' : 'rgba(0,0,0,0.18)',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              />
            ))}
            <span className="font-body text-[11px] font-semibold ml-1" style={{ color: '#aaa' }}>
              {current + 1} / {total}
            </span>
          </div>
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 14px 36px rgba(245,166,35,0.40)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => nav('/gallery')}
            className="inline-flex items-center gap-2.5 font-body font-bold text-white rounded-full px-9 py-4 text-[14px] tracking-wide"
            style={{ background: 'linear-gradient(135deg, #F5A623 0%, #E85D26 100%)', boxShadow: '0 6px 22px rgba(245,166,35,0.28)' }}
          >
            <Images size={15} color="white" />
            View Full Gallery
            <ArrowRight size={14} />
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
