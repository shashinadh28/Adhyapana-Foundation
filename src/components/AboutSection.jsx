import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden" style={{ background: '#faf9f6' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left image */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75 }} className="relative">
            <motion.div whileHover={{ scale: 1.02 }}
              className="relative h-[400px] rounded-3xl overflow-hidden"
              style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.10)' }}>
              <img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=700&q=80&auto=format&fit=crop"
                alt="Adhyapana Foundation" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
            </motion.div>

            <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-5 -right-3 bg-white rounded-2xl px-5 py-3.5"
              style={{ boxShadow: '0 12px 32px rgba(0,0,0,0.10)' }}>
              <p className="font-display font-black text-2xl text-gray-900"> 350+</p>
              <p className="text-gray-400 text-[11px] font-medium">Children Empowered</p>
            </motion.div>
          </motion.div>

          {/* Right text */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.12 }}>
            <p className="text-orange-500 text-[11px] font-bold uppercase tracking-[0.22em] mb-3">About Us</p>
            <h2 className="font-display font-black text-gray-900 mb-5"
              style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', lineHeight: 1.1 }}>
              Mission Statement
            </h2>
            <p className="text-gray-400 text-[14px] leading-[1.8] mb-4">
              The Adhyapana Foundation is committed to empowering every child to achieve their educational
              aspirations. We firmly believe that all children deserve equitable access to resources and
              opportunities, enabling them to pursue their dreams through quality education.
            </p>
            <p className="text-gray-400 text-[14px] leading-[1.8] mb-6">
              To realize this vision, we provide financial assistance and holistic support to students.
            </p>

            <motion.div whileHover={{ x: 3 }}
              className="flex items-center gap-4 bg-orange-50 rounded-2xl px-5 py-3.5 mb-7 border border-orange-100 w-fit">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-display font-bold text-sm shadow-md">DT</div>
              <div>
                <p className="font-display font-bold text-gray-900 text-[13px]">Deepak Teja</p>
                <p className="text-orange-500 text-[11px] font-semibold">Founder, Adhyapana Foundation</p>
              </div>
            </motion.div>

            <Link to="/about">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="btn-dark text-[12.5px] tracking-wide px-7 py-3.5 group">
                Know More <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
