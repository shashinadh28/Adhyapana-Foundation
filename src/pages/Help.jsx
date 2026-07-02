import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Users, Gift, Star, ShoppingBag, Utensils, ArrowRight } from 'lucide-react';

/* ── Ways to help data ── */
const ways = [
  {
    id: 'donation',
    icon: Gift,
    title: 'Make A Donation',
    desc: 'Your financial contribution goes directly to providing education, resources, and daily necessities to children who need them the most.',
    accent: '#F97316',
    featured: false,
  },
  {
    id: 'volunteer',
    icon: Users,
    title: 'Become A Volunteer',
    desc: 'Lend your time and skills to our programs — teach, mentor, organise events, or support our community outreach drives.',
    accent: '#E53E3E',
    featured: true,
  },
  {
    id: 'sponsor',
    icon: Star,
    title: 'Sponsor A Child',
    desc: 'Cover a child\'s full education cost — tuition, books, uniform, and meals — transforming an entire future with one decision.',
    accent: '#D69E2E',
    featured: false,
  },
  {
    id: 'fundraise',
    icon: ShoppingBag,
    title: 'Run A Fundraiser',
    desc: 'Host a local event, birthday campaign, or social media challenge on behalf of Adhyapana Foundation and rally your community.',
    accent: '#38A169',
    featured: false,
  },
  {
    id: 'gift',
    icon: Gift,
    title: 'Make A Gift',
    desc: 'Donate books, stationery, clothing, or educational materials. Every gift in kind reaches a child who truly needs it.',
    accent: '#E84393',
    featured: false,
  },
  {
    id: 'meal',
    icon: Utensils,
    title: 'Sponsor A Meal',
    desc: 'A nourished child learns better. Sponsor nutritious meals for school children and fuel their ability to focus and grow.',
    accent: '#805AD5',
    featured: false,
  },
];

/* ── Card ── */
function WayCard({ way, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const Icon = way.icon;
  const nav = useNavigate();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: way.featured
        ? `0 20px 50px ${way.accent}30`
        : '0 16px 40px rgba(0,0,0,0.10)' }}
      className="flex flex-col items-center text-center p-8 rounded-2xl cursor-pointer transition-all duration-300"
      style={{
        background: '#f7f6f4',
        border: way.featured ? `2px solid ${way.accent}` : '2px solid transparent',
        boxShadow: way.featured ? `0 8px 30px ${way.accent}20` : '0 2px 12px rgba(0,0,0,0.05)',
      }}
      onClick={() => { nav('/donate'); window.scrollTo({ top: 0 }); }}
    >
      {/* Icon container */}
      <div className="mb-5 flex items-center justify-center w-16 h-16 rounded-2xl"
        style={{ background: `${way.accent}15` }}>
        <Icon size={30} style={{ color: way.accent }} strokeWidth={1.5} />
      </div>

      <h3 className="font-playfair font-bold text-gray-900 mb-3" style={{ fontSize: 'clamp(16px, 1.5vw, 19px)' }}>
        {way.title}
      </h3>
      <p className="font-body text-gray-500 leading-[1.75]" style={{ fontSize: 'clamp(13px, 1vw, 14px)' }}>
        {way.desc}
      </p>
    </motion.div>
  );
}

/* ── HERO ── */
function HelpHero() {
  const nav = useNavigate();
  return (
    <section
      className="relative overflow-hidden pt-[72px]"
      style={{
        background: 'linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 40%, #FFF7ED 100%)',
        minHeight: '55vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(249,115,22,0.12) 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }} />

      {/* Blobs */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)' }} />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(234,107,10,0.12) 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-14 py-16 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full font-body font-bold text-[11px] uppercase tracking-[0.26em]"
          style={{ border: '1.5px solid rgba(249,115,22,0.45)', background: 'rgba(249,115,22,0.07)', color: '#F97316' }}>
          <Heart size={11} fill="#F97316" color="#F97316" />
          Ways to Help
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-playfair font-bold text-gray-950 mb-5"
          style={{ fontSize: 'clamp(32px, 5vw, 62px)', lineHeight: 1.08 }}>
          Want To Help Us?{' '}
          <span style={{ color: '#F97316' }}>There are many ways to do it!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="font-body text-gray-500 leading-[1.85] mb-8 max-w-2xl mx-auto"
          style={{ fontSize: 'clamp(14px, 1.1vw, 16px)' }}>
          Whether through your time, talent, or treasure — every act of generosity brings
          Adhyapana Foundation closer to its mission of empowering every child through education.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-3 flex-wrap">
          <motion.button
            onClick={() => { nav('/donate'); window.scrollTo({ top: 0 }); }}
            whileHover={{ scale: 1.05, boxShadow: '0 12px 32px rgba(249,115,22,0.40)' }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2.5 font-body font-bold text-white rounded-full px-8 py-3.5 text-[14px] tracking-wide"
            style={{ background: '#F97316', boxShadow: '0 6px 20px rgba(249,115,22,0.30)' }}>
            <Heart size={14} fill="white" />
            Donate Now
          </motion.button>
          <motion.button
            onClick={() => { nav('/about'); window.scrollTo({ top: 0 }); }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 font-body font-semibold rounded-full px-8 py-3.5 text-[14px] text-gray-700 transition-all"
            style={{ background: '#fff', border: '1.5px solid rgba(0,0,0,0.12)', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            Our Story
            <ArrowRight size={14} />
          </motion.button>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 50" preserveAspectRatio="none" className="w-full block" style={{ height: 40 }}>
          <path d="M0,50 L1440,50 L1440,18 C1200,46 960,0 720,18 C480,36 240,0 0,18 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}

/* ── MAIN HELP PAGE ── */
export default function Help() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const nav = useNavigate();

  return (
    <main>
      <HelpHero />

      {/* Ways Grid */}
      <section className="py-24 relative" style={{ background: '#ffffff' }}>
        <div className="max-w-6xl mx-auto px-5 lg:px-10">

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {ways.map((way, i) => (
              <WayCard key={way.id} way={way} index={i} />
            ))}
          </div>

          {/* CTA Banner */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden py-16 px-8 text-center"
            style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA6C0A 100%)' }}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.10) 1.5px, transparent 1.5px)', backgroundSize: '26px 26px' }} />
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="font-body font-bold uppercase tracking-[0.28em] text-[11px] text-white/70 mb-4 block">
                Together We Can Do More
              </span>
              <h2 className="font-playfair font-bold text-white mb-4" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', lineHeight: 1.1 }}>
                Every Action Counts
              </h2>
              <p className="font-body text-white/80 leading-[1.8] mb-8 max-w-lg mx-auto" style={{ fontSize: 'clamp(13.5px, 1.05vw, 15px)' }}>
                Join thousands of supporters who have already made a difference. Pick one of the ways above and
                start your journey with us today.
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <motion.button
                  onClick={() => { nav('/donate'); window.scrollTo({ top: 0 }); }}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 font-body font-bold text-orange-600 bg-white rounded-full px-8 py-3.5 text-[14px] tracking-wide"
                  style={{ boxShadow: '0 6px 22px rgba(0,0,0,0.18)' }}>
                  <Heart size={14} fill="#F97316" color="#F97316" />
                  Donate Now
                </motion.button>
                <motion.button
                  onClick={() => { nav('/about'); window.scrollTo({ top: 0 }); }}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 font-body font-bold text-white rounded-full px-8 py-3.5 text-[14px] tracking-wide"
                  style={{ border: '2px solid rgba(255,255,255,0.70)', background: 'rgba(255,255,255,0.10)' }}>
                  Learn About Us
                  <ArrowRight size={14} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
