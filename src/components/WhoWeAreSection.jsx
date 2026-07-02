import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function WhoWeAreSection() {
  const ref  = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const nav  = useNavigate();

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="grid md:grid-cols-2 min-h-[340px]">

        {/* ── LEFT — Who are we? (amber/orange) ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col justify-center px-10 md:px-14 lg:px-20 py-16 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA6C0A 100%)' }}
        >
          {/* Decorative bulb image — positioned right */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block"
            style={{ width: '46%', opacity: 0.22 }}>
            <img src="/Who-We-Are/special-need-support.webp" alt=""
              className="w-full h-full object-cover" style={{ filter: 'brightness(4) saturate(0)' }} />
          </div>

          {/* Dot pattern */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />

          {/* Subtle bulb SVG decoration */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 hidden md:block">
            <svg width="120" height="180" viewBox="0 0 120 180" fill="none">
              <ellipse cx="60" cy="70" rx="48" ry="52" fill="white" />
              <rect x="42" y="118" width="36" height="12" rx="4" fill="white" />
              <rect x="46" y="130" width="28" height="10" rx="3" fill="white" />
              <rect x="50" y="140" width="20" height="8" rx="3" fill="white" />
              <rect x="54" y="148" width="12" height="16" rx="4" fill="white" />
              <line x1="60" y1="30" x2="60" y2="15" stroke="white" strokeWidth="4" strokeLinecap="round"/>
              <line x1="27" y1="42" x2="18" y2="33" stroke="white" strokeWidth="4" strokeLinecap="round"/>
              <line x1="93" y1="42" x2="102" y2="33" stroke="white" strokeWidth="4" strokeLinecap="round"/>
              <line x1="15" y1="70" x2="2" y2="70" stroke="white" strokeWidth="4" strokeLinecap="round"/>
              <line x1="105" y1="70" x2="118" y2="70" stroke="white" strokeWidth="4" strokeLinecap="round"/>
            </svg>
          </div>

          <div className="relative z-10 max-w-sm">
            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="font-playfair font-bold text-white mb-4"
              style={{ fontSize: 'clamp(26px, 3.2vw, 42px)', lineHeight: 1.1 }}>
              Who are we?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="font-body text-white/85 leading-[1.75] mb-8"
              style={{ fontSize: 'clamp(13.5px, 1.05vw, 15px)', maxWidth: 340 }}>
              A dedicated group of friends on a mission to uplift the underprivileged
              through education and opportunity.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.55 }}
              onClick={() => { nav('/about'); window.scrollTo({ top: 0 }); }}
              whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.18)' }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 font-body font-bold text-white rounded-full px-7 py-3 text-[13.5px] tracking-wide transition-all"
              style={{ border: '2px solid rgba(255,255,255,0.85)', background: 'rgba(255,255,255,0.08)' }}>
              More About Us
              <ArrowRight size={14} />
            </motion.button>
          </div>
        </motion.div>

        {/* ── OR divider circle ── */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center"
          style={{ width: 52, height: 52, borderRadius: '50%', background: '#F97316',
            border: '4px solid white', boxShadow: '0 4px 20px rgba(249,115,22,0.45)' }}>
          <span className="font-body font-bold text-white text-[12px]">or</span>
        </div>

        {/* ── RIGHT — How can you help? (dark image overlay) ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative flex flex-col justify-center px-10 md:px-14 lg:px-20 py-16 overflow-hidden"
        >
          {/* Background image with dark overlay */}
          <img
            src="/Who-We-Are/Orphans-Educational-Support.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.35) saturate(0.8)' }}
          />
          {/* Extra warm dark overlay */}
          <div className="absolute inset-0" style={{ background: 'rgba(10,6,2,0.55)' }} />

          <div className="relative z-10 max-w-sm">
            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="font-playfair font-bold text-white mb-4"
              style={{ fontSize: 'clamp(26px, 3.2vw, 42px)', lineHeight: 1.1 }}>
              How can you help?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="font-body text-white/80 leading-[1.75] mb-8"
              style={{ fontSize: 'clamp(13.5px, 1.05vw, 15px)', maxWidth: 360 }}>
              Your support means more than a donation — it's joining our mission. We value
              transparency and ensure every rupee directly impacts lives. Come, be part of
              the change.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.55 }}
              onClick={() => { nav('/help'); window.scrollTo({ top: 0 }); }}
              whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.18)' }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 font-body font-bold text-white rounded-full px-7 py-3 text-[13.5px] tracking-wide transition-all"
              style={{ border: '2px solid rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.08)' }}>
              Learn More
              <ArrowRight size={14} />
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
