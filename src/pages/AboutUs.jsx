import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, ArrowRight, Shield, Users, Sparkles, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ── Our Values data ── */
const values = [
  {
    icon: Heart,
    title: 'Compassion',
    color: '#f43f5e',
    bg: '#fff1f2',
    borderColor: '#f43f5e',
    image: '/About-Us/Compassion.webp',
    desc: 'We treat every individual with the empathy and kindness we would hope to receive. Our actions are rooted in love, ensuring no one feels alone in their struggles.',
  },
  {
    icon: Sparkles,
    title: 'Selfless Service',
    subtitle: 'Nishkama Karma',
    color: '#F5A623',
    bg: '#fff8e6',
    borderColor: '#F5A623',
    image: '/About-Us/selfless-service.webp',
    desc: 'Inspired by the principle of "action without expectation," we commit to serving others without seeking a reward. This ethos fosters a culture of generosity that uplifts both our community and ourselves.',
  },
  {
    icon: Users,
    title: 'Inclusion & Empowerment',
    color: '#2E8B7A',
    bg: '#e6f4f1',
    borderColor: '#2E8B7A',
    image: '/About-Us/Inclusion-Empowerment.webp',
    desc: 'We champion equitable opportunities for special needs children and orphans, providing tailored support to help them thrive. Through advocacy and awareness, we challenge societal barriers and celebrate their potential.',
  },
  {
    icon: Shield,
    title: 'Transparency & Trust',
    color: '#6366f1',
    bg: '#eef2ff',
    borderColor: '#6366f1',
    image: '/About-Us/Transparency-Trust.webp',
    desc: 'Donors can audit every rupee, starting with contributions as small as ₹100. We believe accountability is the foundation of meaningful change.',
  },
];

function ValueCard({ value, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = value.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: '0 28px 60px rgba(0,0,0,0.12)' }}
      className="rounded-2xl flex flex-col overflow-hidden"
      style={{
        background: '#fff',
        boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        transition: 'transform 0.35s ease, box-shadow 0.35s ease',
        border: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      {/* Colored top border accent */}
      <div style={{ height: 4, background: value.borderColor, borderRadius: '8px 8px 0 0' }} />

      {/* Card body */}
      <div className="flex flex-col items-center text-center px-6 pt-7 pb-5 flex-1">

        {/* Circular icon badge */}
        <div
          className="flex items-center justify-center mb-5 flex-shrink-0"
          style={{
            width: 62,
            height: 62,
            borderRadius: '50%',
            background: value.bg,
          }}
        >
          <Icon size={26} style={{ color: value.color }} />
        </div>

        {/* Title */}
        <h3
          className="font-playfair font-bold text-gray-900 mb-2 leading-snug"
          style={{ fontSize: 'clamp(16px, 1.4vw, 18px)' }}
        >
          {value.title}
        </h3>

        {/* Colored underline accent */}
        <div
          className="mb-2"
          style={{ width: 32, height: 2.5, background: value.borderColor, borderRadius: 2 }}
        />

        {/* Optional subtitle (Nishkama Karma) */}
        {value.subtitle && (
          <p
            className="font-body text-[10.5px] font-bold uppercase tracking-[0.22em] mb-3"
            style={{ color: value.color }}
          >
            {value.subtitle}
          </p>
        )}
        {!value.subtitle && <div className="mb-3" />}

        {/* Description */}
        <p className="font-body text-gray-500 leading-[1.8] text-[13px] flex-1">
          {value.desc}
        </p>
      </div>

      {/* Bottom decorative image */}
      <div
        className="w-full overflow-hidden"
        style={{ height: 140, marginTop: 'auto', flexShrink: 0 }}
      >
        <img
          src={value.image}
          alt={value.title}
          className="w-full h-full object-cover object-top"
          style={{ opacity: 0.9 }}
        />
      </div>
    </motion.div>
  );
}

export default function AboutUs() {
  const nav = useNavigate();
  const aboutRef = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: '-80px' });
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: '-80px' });

  return (
    <main className="pt-[72px]">

      {/* ══════════════════════════════════
          HERO BANNER
      ══════════════════════════════════ */}

      {/* ── MOBILE (< md): original dark gradient, centered ── */}
      <section className="relative overflow-hidden py-28 md:hidden"
        style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' }}>

        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1.2px, transparent 1.2px)', backgroundSize: '28px 28px' }} />

        {/* Amber glow */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 9, repeat: Infinity }}
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.30) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 11, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(46,139,122,0.25) 0%, transparent 70%)' }}
        />

        <div className="relative max-w-4xl mx-auto px-5 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-body font-bold uppercase tracking-[0.28em] mb-6 px-5 py-2.5 rounded-full"
              style={{ background: 'rgba(245,166,35,0.15)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.25)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              Our Story
            </span>

            <h1 className="font-playfair font-bold text-white mb-6"
              style={{ fontSize: 'clamp(38px, 10vw, 60px)', lineHeight: 1.06, fontStyle: 'italic' }}>
              About The<br />
              <span style={{ color: '#F5A623' }}>Adhyapana</span> Foundation
            </h1>

            <p className="font-body text-white/60 leading-relaxed max-w-2xl mx-auto"
              style={{ fontSize: 'clamp(14px, 1.3vw, 16px)' }}>
              A foundation built on the belief that education is the most powerful force for change —
              and every child deserves that power.
            </p>
          </motion.div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full block" style={{ height: 50 }}>
            <path d="M0,60 L1440,60 L1440,20 C1200,58 960,0 720,20 C480,40 240,0 0,20 Z" fill="#f9f7f4" />
          </svg>
        </div>
      </section>

      {/* ── TABLET & DESKTOP (≥ md): background image version ── */}
      <section
        className="hidden md:flex relative overflow-hidden items-center"
        style={{
          minHeight: '480px',
          backgroundImage: 'url(/About-Us/about-landing-page.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.62) 50%, rgba(10,10,10,0.10) 100%)',
          }}
        />

        {/* Subtle dot grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1.2px, transparent 1.2px)', backgroundSize: '28px 28px' }}
        />

        {/* Amber accent glow — top-right */}
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.18) 0%, transparent 70%)' }}
        />

        {/* Content — left-aligned */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16 py-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[55%] lg:max-w-[48%]"
          >
            {/* Eyebrow pill */}
            <span
              className="inline-flex items-center gap-2 text-[11px] font-body font-bold uppercase tracking-[0.28em] mb-7 px-4 py-2 rounded-full"
              style={{
                background: 'rgba(245,166,35,0.15)',
                color: '#F5A623',
                border: '1px solid rgba(245,166,35,0.30)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              Our Story
            </span>

            {/* Heading */}
            <h1
              className="font-playfair font-bold text-white mb-5 leading-[1.05]"
              style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
            >
              About The<br />
              <span style={{ color: '#F5A623' }}>Adhyapana</span>{' '}
              <span className="text-white">Foundation</span>
            </h1>

            {/* Amber underline accent */}
            <div
              className="mb-6"
              style={{ width: 56, height: 3, background: '#F5A623', borderRadius: 2 }}
            />

            {/* Description */}
            <p
              className="font-body text-white/65 leading-[1.85]"
              style={{ fontSize: 'clamp(13px, 1.1vw, 15.5px)', maxWidth: 440 }}
            >
              A foundation built on the belief that education is the most powerful force
              for change — and every child deserves that power.
            </p>
          </motion.div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full block" style={{ height: 50 }}>
            <path d="M0,60 L1440,60 L1440,20 C1200,58 960,0 720,20 C480,40 240,0 0,20 Z" fill="#f9f7f4" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════
          ABOUT + FOUNDER PHOTO
      ══════════════════════════════════ */}
      <section ref={aboutRef} className="py-24" style={{ background: '#f9f7f4' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-start">

            {/* Left — text */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="font-body text-[11px] font-bold uppercase tracking-[0.3em] mb-5"
                style={{ color: '#F5A623' }}
              >
                Who We Are
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.08 }}
                className="font-playfair font-bold text-gray-950 mb-8"
                style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', lineHeight: 1.1, fontStyle: 'italic' }}
              >
                The Adhyapana Foundation
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.16 }}
                className="font-body text-gray-500 leading-[1.9] mb-6"
                style={{ fontSize: 'clamp(14px, 1.15vw, 15.5px)' }}
              >
                The Adhyapana Foundation is committed to empowering every child to achieve their
                educational aspirations. We firmly believe that all children deserve equitable access
                to resources and opportunities, enabling them to pursue their dreams through quality
                education. To realize this vision, we provide financial assistance and holistic support
                to students, ensuring they have the tools and guidance needed to succeed. Through
                strategic fundraising and community engagement, we strive to create a lasting impact
                in the lives of young learners.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.24 }}
                className="font-body text-gray-500 leading-[1.9] mb-10"
                style={{ fontSize: 'clamp(14px, 1.15vw, 15.5px)' }}
              >
                Established by <strong className="text-gray-800 font-semibold">Deepak Teja</strong>,
                the Adhyapana Foundation embodies a dedication to educational equity and opportunity
                for all.
              </motion.p>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.32 }}
                className="flex flex-wrap gap-8"
              >
                {[
                  { value: '5,000+', label: 'Children Empowered' },
                  { value: '12+', label: 'Active Programs' },
                  { value: '100%', label: 'Transparent' },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="font-playfair font-bold text-gray-950"
                      style={{ fontSize: 'clamp(26px, 2.8vw, 36px)', lineHeight: 1 }}>
                      {s.value}
                    </div>
                    <div className="font-body text-gray-400 text-[12px] mt-1 font-medium">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Founder card */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={aboutInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                whileHover={{ y: -6 }}
                className="rounded-3xl overflow-hidden"
                style={{
                  boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                  border: '1px solid rgba(245,166,35,0.15)',
                  transition: 'transform 0.35s ease',
                }}
              >
                {/* Photo */}
                <div className="overflow-hidden" style={{ height: 340 }}>
                  <img
                    src="/founder/deepak_adhyapana.webp"
                    alt="Deepak Teja — Founder & President, Adhyapana Foundation"
                    className="w-full h-full object-cover object-top"
                    style={{ transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => (e.target.style.transform = 'scale(1.05)')}
                    onMouseLeave={e => (e.target.style.transform = 'scale(1)')}
                  />
                </div>

                {/* Name card */}
                <div className="p-6" style={{ background: '#1a1a1a' }}>
                  <h3 className="font-playfair font-bold text-white text-[20px] mb-0.5">Deepak Teja</h3>
                  <p className="font-body font-semibold text-[12px] uppercase tracking-[0.2em]"
                    style={{ color: '#F5A623' }}>
                    Founder &amp; President
                  </p>
                  <p className="font-body text-[12px] mt-3 leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.50)' }}>
                    "Education is the most powerful tool to change the world."
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          OUR VALUES
      ══════════════════════════════════ */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: '#FEF9F5' }}
      >
        {/* Top-right decorative background image */}
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{ width: 'clamp(280px, 38vw, 520px)', zIndex: 0 }}
        >
          <img
            src="/About-Us/Our-Values-bg.webp"
            alt=""
            className="w-full h-auto"
            style={{ opacity: 0.85 }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">

          {/* Header */}
          <motion.div
            ref={valuesRef}
            initial={{ opacity: 0, y: 28 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65 }}
            className="mb-14"
          >
            {/* Eyebrow label */}
            <p
              className="font-body text-[11px] font-bold uppercase tracking-[0.3em] mb-2"
              style={{ color: '#F5A623' }}
            >
              What Drives Us
            </p>
            {/* Amber underline accent */}
            <div
              className="mb-5"
              style={{ width: 36, height: 3, background: '#F5A623', borderRadius: 2 }}
            />

            {/* Title: "Our" dark, "Values" amber */}
            <h2
              className="font-playfair font-bold mb-5"
              style={{ fontSize: 'clamp(34px, 4.5vw, 58px)', lineHeight: 1.08, color: '#1a1a1a' }}
            >
              Our{' '}
              <span style={{ color: '#F5A623' }}>Values</span>
            </h2>

            {/* Subtitle */}
            <p
              className="font-body text-gray-500 leading-[1.75] max-w-md"
              style={{ fontSize: 'clamp(13px, 1.05vw, 15px)' }}
            >
              These values shape our actions, guide our decisions,<br />
              and inspire us to create a better tomorrow for every child.
            </p>
          </motion.div>

          {/* Values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-14">
            {values.map((v, i) => (
              <ValueCard key={i} value={v} index={i} />
            ))}
          </div>

          {/* Donate Now CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 14px 40px rgba(245,166,35,0.42)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => nav('/donate')}
              className="inline-flex items-center gap-2.5 font-body font-bold text-white rounded-full px-10 py-4 text-[14px] tracking-wide transition-all duration-300"
              style={{ background: '#F5A623', boxShadow: '0 6px 22px rgba(245,166,35,0.32)' }}
            >
              <Heart size={15} fill="white" />
              Donate Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          BECOME A VOLUNTEER
      ══════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#1a1a1a' }}>

        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1.2px, transparent 1.2px)', backgroundSize: '30px 30px' }} />

        {/* Teal blob */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(46,139,122,0.22) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.15) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 text-[11px] font-body font-bold uppercase tracking-[0.28em] mb-7 px-5 py-2.5 rounded-full"
              style={{ background: 'rgba(46,139,122,0.18)', color: '#2E8B7A', border: '1px solid rgba(46,139,122,0.28)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              Volunteer
            </span>

            <h2 className="font-playfair font-bold text-white mb-7"
              style={{ fontSize: 'clamp(32px, 4.2vw, 58px)', lineHeight: 1.08, fontStyle: 'italic' }}>
              Become a Volunteer Today
            </h2>

            <p className="font-body leading-[1.9] mb-12"
              style={{ fontSize: 'clamp(14px, 1.2vw, 16px)', color: 'rgba(255,255,255,0.52)' }}>
              Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed
              magna dictum porta. Cras ultricies ligula sed magna dictum porta. Praesent sapien massa,
              convallis a pellentesque nec, egestas non nisi.
            </p>

            <motion.button
              whileHover={{ scale: 1.06, boxShadow: '0 14px 36px rgba(46,139,122,0.40)' }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2.5 font-body font-bold rounded-full px-10 py-4 text-[14px] tracking-wide transition-all duration-300"
              style={{
                background: '#2E8B7A',
                color: '#fff',
                boxShadow: '0 6px 22px rgba(46,139,122,0.28)',
              }}
            >
              Join Now
              <ArrowRight size={15} />
            </motion.button>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
