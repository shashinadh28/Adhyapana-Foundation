import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';

const stats = [
  { value: 4.89, suffix: 'M', label: 'Volunteer Hours', decimals: 2 },
  { value: 68, suffix: 'K', label: 'Communities Reached', decimals: 0 },
  { value: 5.2, suffix: 'K', label: 'Active Volunteers', decimals: 1 },
  { value: 15, suffix: '+', label: 'Districts Covered', decimals: 0 },
];

export default function VolunteerStats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">
      {/* World map — right side */}
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1920px-World_map_-_low_resolution.svg.png"
        alt="" aria-hidden="true" className="absolute pointer-events-none select-none"
        style={{ width: '50%', top: '50%', right: '-2%', transform: 'translateY(-50%)', opacity: 0.06, filter: 'sepia(0.2) saturate(0.5)' }}
      />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="mb-14">
          <p className="text-orange-500 text-[11px] font-bold uppercase tracking-[0.22em] mb-3">Make a Mark</p>
          <h2 className="font-display font-black text-gray-900"
            style={{ fontSize: 'clamp(30px, 3.8vw, 48px)', lineHeight: 1.1 }}>
            Volunteer Positions<br />Available
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -3 }} className="group cursor-default">
              <div className="font-display font-black text-gray-900 mb-1" style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}>
                {inView && <CountUp end={s.value} duration={2} delay={i * 0.1} decimals={s.decimals} suffix={s.suffix} />}
              </div>
              <p className="text-gray-400 text-[13px] font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
          className="mt-12">
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            className="btn-dark text-[12.5px] tracking-wide px-7 py-3.5">
            Join as Volunteer
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
