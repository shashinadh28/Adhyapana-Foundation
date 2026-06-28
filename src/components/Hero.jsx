import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, ArrowRight, Users, BookOpen, Award, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

/* ---------- floating ambient dots ---------- */
const dots = [
  { size: 14, color: '#f97316', top: '18%', left: '62%', delay: 0 },
  { size: 9,  color: '#22c55e', top: '72%', left: '58%', delay: 1.2 },
  { size: 11, color: '#3b82f6', top: '55%', left: '88%', delay: 2 },
  { size: 7,  color: '#fbbf24', top: '82%', left: '74%', delay: 0.7 },
  { size: 8,  color: '#f43f5e', top: '30%', left: '92%', delay: 1.8 },
  { size: 6,  color: '#a855f7', top: '62%', left: '44%', delay: 2.4 },
  { size: 10, color: '#14b8a6', top: '10%', left: '80%', delay: 0.4 },
];

/* ---------- stat badges that float around the image ---------- */
const statBadges = [
  {
    icon: Users,
    value: '5,000+',
    label: 'Children Empowered',
    color: '#f97316',
    bg: '#fff7ed',
    pos: { top: '8%', left: '-14%' },
    delay: 0.6,
    floatDelay: 0,
  },
  {
    icon: BookOpen,
    value: '12+',
    label: 'Active Programs',
    color: '#3b82f6',
    bg: '#eff6ff',
    pos: { bottom: '22%', left: '-18%' },
    delay: 0.8,
    floatDelay: 1,
  },
  {
    icon: Award,
    value: '100%',
    label: 'Donation Transparency',
    color: '#22c55e',
    bg: '#f0fdf4',
    pos: { top: '14%', right: '-6%' },
    delay: 1.0,
    floatDelay: 2,
  },
];

/* ---------- trust logos row ---------- */
const trustItems = [
  { label: 'Registered NGO' },
  { label: '80G Tax Benefit' },
  { label: 'FCRA Certified' },
  { label: 'CSR Partners' },
];

export default function Hero() {
  const nav = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden pt-[72px]"
      style={{ background: 'linear-gradient(135deg, #fefdfb 0%, #faf9f6 50%, #fdf6ee 100%)' }}
    >
      {/* ── Ambient blobs ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251,146,60,0.09) 0%, transparent 70%)',
          top: '-10%',
          left: '-8%',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
          bottom: '-5%',
          right: '10%',
        }}
      />

      {/* ── World map watermark ── */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1920px-World_map_-_low_resolution.svg.png"
        alt="" aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{ width: '90%', top: '50%', left: '50%', transform: 'translate(-40%,-50%)', opacity: 0.035, filter: 'sepia(0.3)' }}
      />

      {/* ── Floating dots ── */}
      {dots.map((d, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: d.delay }}
          className="absolute rounded-full pointer-events-none"
          style={{ width: d.size, height: d.size, background: d.color, top: d.top, left: d.left, opacity: 0.75 }}
        />
      ))}

      {/* ── Main grid ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-5 lg:px-12 w-full flex items-center min-h-[calc(100vh-72px)]">
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-10 xl:gap-16 items-center w-full pt-20 pb-14">

          {/* ═══ LEFT CONTENT ═══ */}
          <motion.div style={{ y: contentY }} className="flex flex-col">

            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 mb-7 w-fit"
            >
              <div className="flex items-center gap-2 bg-white border border-orange-100 rounded-full px-4 py-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[11.5px] font-semibold text-gray-600 tracking-wide">
                  Empowering children across India
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="font-serif italic text-gray-950 mb-6"
              style={{ fontSize: 'clamp(42px, 5.4vw, 78px)', lineHeight: 1.04, letterSpacing: '-0.02em' }}
            >
              Education
              <br />begins where
              <br />
              <span style={{ color: '#f97316' }}>inequality</span>
              <br />ends.
            </motion.h1>

            {/* Sub-text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-gray-500 leading-relaxed max-w-[380px] mb-10"
              style={{ fontSize: 'clamp(13px, 1.1vw, 15px)' }}
            >
              We provide every child — regardless of background — access to quality education,
              resources, and the emotional support they need to thrive.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="flex items-center flex-wrap gap-3 mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 12px 32px rgba(249,115,22,0.35)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => nav('/donate')}
                className="inline-flex items-center gap-2 bg-gray-950 hover:bg-gray-800 text-white font-semibold rounded-full px-7 py-4 text-[13px] tracking-wide transition-all duration-300"
                style={{ boxShadow: '0 6px 24px rgba(0,0,0,0.18)' }}
              >
                <Heart size={14} fill="white" />
                Donate Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, backgroundColor: '#f5f5f0' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => nav('/about')}
                className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-800 font-semibold rounded-full px-7 py-4 text-[13px] tracking-wide transition-all duration-300"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
              >
                Our Story
                <ArrowRight size={14} />
              </motion.button>
            </motion.div>

            {/* Inline stats row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex items-center gap-8 flex-wrap"
            >
              {[
                { value: '5K+', label: 'Children Helped' },
                { value: '12+', label: 'Programs' },
                { value: '100%', label: 'Transparent' },
              ].map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-display font-black text-gray-950" style={{ fontSize: 'clamp(22px, 2.4vw, 30px)', lineHeight: 1 }}>
                    {s.value}
                  </span>
                  <span className="text-gray-400 text-[11px] font-medium mt-0.5">{s.label}</span>
                </div>
              ))}

              <div className="w-px h-8 bg-gray-200 hidden sm:block" />

              {/* Trust tags */}
              <div className="flex items-center flex-wrap gap-2">
                {trustItems.map((t, i) => (
                  <span
                    key={i}
                    className="text-[10.5px] font-semibold text-gray-500 bg-white border border-gray-100 rounded-full px-3 py-1"
                    style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
                  >
                    {t.label}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ═══ RIGHT — India Map with floating badges ═══ */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            {/* Decorative ring behind map */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 'clamp(320px, 42vw, 560px)',
                height: 'clamp(320px, 42vw, 560px)',
                border: '1.5px solid rgba(249,115,22,0.12)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
              }}
            />
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 'clamp(260px, 36vw, 490px)',
                height: 'clamp(260px, 36vw, 490px)',
                border: '1.5px dashed rgba(249,115,22,0.08)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
              }}
            />

            {/* India map image */}
            <motion.div
              style={{ y: imageY, width: 'clamp(280px, 38vw, 520px)' }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10"
            >
              <img
                src="/landing_page/Adhyapana_Landing_Image.png"
                alt="Adhyapana Foundation"
                className="w-full h-auto"
                style={{ filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.14))' }}
              />
            </motion.div>

            {/* Floating stat badges */}
            {statBadges.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: badge.delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'absolute',
                    ...badge.pos,
                    zIndex: 30,
                    animation: `none`,
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: badge.floatDelay }}
                    className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3"
                    style={{
                      boxShadow: '0 8px 28px rgba(0,0,0,0.10)',
                      minWidth: 155,
                      border: `1.5px solid ${badge.color}18`,
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: badge.bg }}
                    >
                      <Icon size={16} style={{ color: badge.color }} />
                    </div>
                    <div>
                      <div className="font-display font-black text-gray-950 text-[16px] leading-none">{badge.value}</div>
                      <div className="text-gray-400 text-[10.5px] mt-0.5 leading-tight">{badge.label}</div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Watch video chip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute bottom-6 right-2 z-30"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="flex items-center gap-2.5 bg-gray-950 text-white rounded-full px-4 py-2.5 cursor-pointer"
                style={{ boxShadow: '0 6px 20px rgba(0,0,0,0.25)' }}
                whileHover={{ scale: 1.06 }}
              >
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Play size={9} fill="white" color="white" />
                </div>
                <span className="text-[11.5px] font-semibold tracking-wide">Watch Our Story</span>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => document.getElementById('make-difference')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] text-gray-300 font-medium tracking-[0.18em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border-2 border-gray-200 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-orange-400 rounded-full" />
        </motion.div>
      </motion.div>

    </section>
  );
}
