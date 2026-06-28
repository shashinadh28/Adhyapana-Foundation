import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, Heart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const cards = [
  {
    id: 'special-needs',
    title: 'Special Needs Support',
    image: '/Who-We-Are/special-need-support.webp',
    accent: '#a855f7',
    accentLight: '#faf5ff',
    items: [
      'Providing Educational Aid',
      'Caring for daily activities',
      'Facilitating therapy sessions',
      'Donating special equipment',
    ],
  },
  {
    id: 'orphan-edu',
    title: 'Orphans Educational Support',
    image: '/Who-We-Are/Orphans-Educational-Support.webp',
    accent: '#f97316',
    accentLight: '#fff7ed',
    items: [
      'Financial Assistance',
      'Foster Positive Attitudes',
      'Develop Natural Curiosity',
      'Support Dreams Through Education',
    ],
  },
  {
    id: 'community',
    title: 'Community Services',
    image: '/Who-We-Are/Community-Services.webp',
    accent: '#14b8a6',
    accentLight: '#f0fdfa',
    items: [
      'Tribal welfare',
      'Facilitate healthcare',
      'Educate youth',
      'Promote self-sustainability',
    ],
  },
  {
    id: 'tribal-kids',
    title: 'Tribal Kids Welfare',
    image: '/Who-We-Are/Tribal-Kids-Welfare.webp',
    accent: '#f43f5e',
    accentLight: '#fff1f2',
    items: [
      'Food distribution',
      'Clothes distribution',
      'Medical Campaigns',
      'Donating basic needs',
    ],
  },
];

function Card({ card, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const nav = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-3xl overflow-hidden cursor-default group"
      style={{
        height: 420,
        boxShadow: hovered
          ? `0 28px 60px rgba(0,0,0,0.16)`
          : '0 4px 24px rgba(0,0,0,0.07)',
        transition: 'box-shadow 0.4s ease',
      }}
    >
      {/* Full-bleed image */}
      <motion.img
        src={card.image}
        alt={card.title}
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark gradient overlay — always present, stronger on hover */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0.55 }}
        transition={{ duration: 0.4 }}
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)' }}
      />

      {/* Progress pill — top right */}
      <div className="absolute top-4 right-4 z-20">
        <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/30">
          <div className="w-12 bg-white/30 rounded-full h-1 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: '50%', background: card.accent }} />
          </div>
          <span className="text-white font-bold text-[11px]">50%</span>
        </div>
      </div>

      {/* Content — slides up on hover */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-6">

        {/* Title — always visible */}
        <h3 className="font-display font-black text-white text-[18px] leading-snug mb-3">
          {card.title}
        </h3>

        {/* Items — revealed on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <ul className="space-y-1.5 mb-5">
            {card.items.map((item, i) => (
              <motion.li
                key={i}
                animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
                transition={{ duration: 0.3, delay: hovered ? i * 0.06 : 0 }}
                className="flex items-center gap-2 text-[12.5px] text-white/90"
              >
                <CheckCircle size={12} style={{ color: card.accent, flexShrink: 0 }} />
                {item}
              </motion.li>
            ))}
          </ul>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => nav(`/donate?campaign=${card.id}`)}
            className="w-full py-3 rounded-xl font-bold text-white text-[13px] flex items-center justify-center gap-2 transition-all duration-300"
            style={{
              background: card.accent,
              boxShadow: `0 6px 20px ${card.accent}60`,
            }}
          >
            <Heart size={13} fill="white" />
            Donate Now
            <ArrowRight size={13} />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function MakeDifference() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="make-difference" ref={ref} className="py-24 relative overflow-hidden" style={{ background: '#faf9f6' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-orange-500 text-[11px] font-bold uppercase tracking-[0.22em] mb-3">Who We Are</p>
          <h2 className="font-display font-black text-gray-900" style={{ fontSize: 'clamp(30px, 3.8vw, 48px)', lineHeight: 1.1 }}>
            Make a Difference
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-[14px] leading-relaxed mt-3">
            It's through donations like yours that we can give all 100% of everything we receive
            to those who need it most.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <Card key={card.id} card={card} index={i} />
          ))}
        </div>

        {/* Hint text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center text-gray-300 text-[12px] mt-8 tracking-wide"
        >
          Hover over a card to learn more
        </motion.p>
      </div>
    </section>
  );
}
