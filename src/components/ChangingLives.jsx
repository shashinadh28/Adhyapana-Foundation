import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ChangingLives() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const nav = useNavigate();

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (i) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section ref={ref} className="py-28 relative overflow-hidden" style={{ background: '#f9f7f4' }}>

      {/* World map watermark — right side only */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1920px-World_map_-_low_resolution.svg.png"
        alt="" aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{ width: '55%', top: '50%', right: '-5%', transform: 'translateY(-50%)', opacity: 0.045, filter: 'sepia(0.2)' }}
      />

      {/* Warm blob */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(245,166,35,0.12)' }} />

      <div className="max-w-7xl mx-auto px-5 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-24 items-center">

          {/* LEFT — image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            {/* Subtle background blob behind image */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(245,166,35,0.10) 0%, transparent 70%)' }} />

            <motion.img
              src="/About-Us/About_Us.webp"
              alt="Adhyapana Foundation — changing lives"
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-auto max-w-md block relative z-10"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.10))' }}
            />
          </motion.div>

          {/* RIGHT — content */}
          <div>
            {/* Eyebrow */}
            <motion.p
              custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="font-body text-[11px] font-bold uppercase tracking-[0.3em] mb-5"
              style={{ color: '#F5A623' }}
            >
              About Us
            </motion.p>

            {/* Mission heading */}
            <motion.h2
              custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="font-playfair font-bold text-gray-950 mb-6"
              style={{ fontSize: 'clamp(28px, 3.4vw, 46px)', lineHeight: 1.1, fontStyle: 'italic' }}
            >
              Mission Statement
            </motion.h2>

            {/* Mission body */}
            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="font-body text-gray-500 leading-[1.85] mb-8"
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

            {/* Divider */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={inView ? { width: 56, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.38, ease: 'easeOut' }}
              className="h-[2px] rounded-full mb-8"
              style={{ background: 'linear-gradient(90deg, #F5A623, #2E8B7A)' }}
            />

            {/* Founder block */}
            <motion.div
              custom={3} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="flex items-start gap-4 mb-10 p-5 rounded-2xl"
              style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.18)' }}
            >
              {/* Founder avatar placeholder */}
              <div className="w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden"
                style={{ border: '2px solid rgba(245,166,35,0.35)' }}>
                <img src="/founder/deepak_adhyapana.webp" alt="Deepak Teja"
                  className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-body font-semibold text-gray-800 text-[13.5px] mb-1">Founder</p>
                <p className="font-body text-gray-500 text-[13px] leading-relaxed">
                  Established by{' '}
                  <strong className="text-gray-800 font-semibold">Deepak Teja</strong>, the Adhyapana
                  Foundation embodies a dedication to educational equity and opportunity for all.
                </p>
              </div>
            </motion.div>

            {/* Know More CTA */}
            <motion.div
              custom={4} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 10px 28px rgba(0,0,0,0.16)' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => nav('/about')}
                className="inline-flex items-center gap-2.5 bg-gray-950 text-white font-body font-semibold rounded-full px-8 py-4 text-[13.5px] tracking-wide transition-all duration-300"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.14)' }}
              >
                Know More
                <ArrowRight size={14} />
              </motion.button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
