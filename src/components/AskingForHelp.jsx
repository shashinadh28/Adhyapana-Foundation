import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AskingForHelp() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const nav = useNavigate();

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section ref={ref} className="relative py-28 overflow-hidden" style={{ background: '#f9f7f4' }}>

      {/* Blobs */}
      <div className="absolute -top-28 -left-28 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(245,166,35,0.16)' }} />
      <div className="absolute -bottom-28 -right-28 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(46,139,122,0.12)' }} />

      <div className="max-w-3xl mx-auto px-5 text-center relative z-10">

        {/* ABOUT US eyebrow */}
        <motion.p
          custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="font-body font-bold uppercase tracking-[0.32em] mb-5"
          style={{ color: '#F5A623', fontSize: 11 }}
        >
          About Us
        </motion.p>

        {/* Heading */}
        <motion.h2
          custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="font-playfair font-bold text-gray-950 mb-7 whitespace-nowrap"
          style={{ fontSize: 'clamp(22px, 3.8vw, 54px)', lineHeight: 1.08, fontStyle: 'italic' }}
        >
          The Adhyapana Foundation
        </motion.h2>

        {/* Animated divider */}
        <div className="flex justify-center mb-9">
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={inView ? { width: 72, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="h-[3px] rounded-full"
            style={{ background: 'linear-gradient(90deg, #F5A623, #E85D26)' }}
          />
        </div>

        {/* Mission body */}
        <motion.p
          custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="font-body text-gray-500 leading-[1.85] mb-10"
          style={{ fontSize: 'clamp(14px, 1.2vw, 16px)' }}
        >
          The Adhyapana Foundation is committed to empowering every child to achieve their
          educational aspirations. We firmly believe that all children deserve equitable access
          to resources and opportunities, enabling them to pursue their dreams through quality
          education. To realize this vision, we provide financial assistance and holistic support
          to students, ensuring they have the tools and guidance needed to succeed. Through
          strategic fundraising and community engagement, we strive to create a lasting impact
          in the lives of young learners.
        </motion.p>

        {/* Founder block */}
        <motion.div
          custom={3} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="inline-flex items-start gap-4 text-left rounded-2xl px-6 py-5 mb-10"
          style={{
            background: 'rgba(245,166,35,0.09)',
            border: '1px solid rgba(245,166,35,0.22)',
            maxWidth: 560,
          }}
        >
          {/* Founder photo thumbnail */}
          <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0"
            style={{ border: '2px solid rgba(245,166,35,0.40)' }}>
            <img
              src="/founder/deepak_adhyapana.webp"
              alt="Deepak Teja"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <p className="font-body font-bold text-gray-700 text-[12px] uppercase tracking-[0.18em] mb-1"
              style={{ color: '#F5A623' }}>
              Founder
            </p>
            <p className="font-body text-gray-600 text-[13.5px] leading-relaxed">
              Established in 2020 by{' '}
              <strong className="text-gray-800 font-semibold">Deepak Teja</strong>, the Adhyapana
              Foundation embodies a dedication to educational equity and opportunity for all.
            </p>
          </div>
        </motion.div>

        {/* Know More CTA */}
        <motion.div custom={4} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 12px 30px rgba(0,0,0,0.18)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => nav('/about')}
            className="inline-flex items-center gap-2.5 bg-gray-950 text-white font-body font-semibold rounded-full px-9 py-4 text-[14px] tracking-wide transition-all duration-300"
            style={{ boxShadow: '0 4px 18px rgba(0,0,0,0.14)' }}
          >
            Know More
            <ArrowRight size={15} />
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
