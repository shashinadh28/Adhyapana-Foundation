import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, ArrowRight, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const campaigns = [
  {
    id: 'special-needs', tag: 'Special Care', title: '  Special Need kids support',
    desc: 'Empowering children with special needs through dedicated resources and therapy.',
    progress: 50, raised: '₹2,40,000', goal: '₹5,00,000',
    items: ['Providing Educational Aid', 'Caring for daily activities', 'Facilitating therapy sessions', 'Donating special equipment'],
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=500&q=80&auto=format&fit=crop',
  },
  {
    id: 'orphan-edu', tag: 'Education', title: 'Orphans Educational Support',
    desc: 'Building brighter futures with financial and educational backing.',
    progress: 50, raised: '₹3,10,000', goal: '₹6,00,000',
    items: ['Financial Assistance', 'Foster Positive Attitudes', 'Develop Natural Curiosity', 'Support Dreams Through Education'],
    image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=500&q=80&auto=format&fit=crop',
  },
  {
    id: 'community', tag: 'Community', title: 'Community Services',
    desc: 'Uplifting tribal and rural communities through healthcare and education.',
    progress: 50, raised: '₹1,80,000', goal: '₹4,00,000',
    items: ['Tribal welfare', 'Facilitate healthcare', 'Educate youth', 'Promote self-sustainability'],
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=500&q=80&auto=format&fit=crop',
  },
  {
    id: 'tribal-kids', tag: 'Welfare', title: 'widowed Kids Welfare',
    desc: 'Meeting the essential needs of tribal children — food, clothing, healthcare.',
    progress: 50, raised: '₹2,90,000', goal: '₹5,50,000',
    items: ['Food distribution', 'Clothes distribution', 'Medical Campaigns', 'Donating basic needs'],
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&q=80&auto=format&fit=crop&crop=right',
  },
];

function ProgressBar({ value, inView }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-[6px] overflow-hidden">
      <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #f97316, #fbbf24)' }}
        initial={{ width: 0 }} animate={{ width: inView ? `${value}%` : 0 }}
        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }} />
    </div>
  );
}

function Card({ c, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const nav = useNavigate();

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.08 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl overflow-hidden group transition-all duration-400 flex flex-col"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img whileHover={{ scale: 1.06 }} transition={{ duration: 0.5 }}
          src={c.image} alt={c.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex justify-between text-[10.5px] text-white font-semibold">
          <span className="bg-black/30 px-2 py-0.5 rounded-full">{c.raised}</span>
          <span className="bg-black/30 px-2 py-0.5 rounded-full">{c.goal}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        {/* Progress */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-display font-black text-[26px] text-gray-900">{c.progress}%</span>
          </div>
          <ProgressBar value={c.progress} inView={inView} />
        </div>

        <h3 className="font-display font-bold text-[15px] text-gray-900 mb-1.5 group-hover:text-orange-500 transition-colors">
          {c.title}
        </h3>
        <p className="text-gray-400 text-[12px] leading-relaxed mb-3">{c.desc}</p>

        <ul className="space-y-1.5 mb-4 flex-1">
          {c.items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-[12px] text-gray-500">
              <CheckCircle size={12} className="text-green-500 flex-shrink-0 mt-0.5" />{item}
            </li>
          ))}
        </ul>

        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => nav(`/donate?campaign=${c.id}`)}
          className="w-full py-2.5 rounded-xl font-bold text-white text-[12.5px] bg-orange-500 hover:bg-orange-600 flex items-center justify-center gap-2 transition-all duration-300 shadow-sm hover:shadow-md">
          <Heart size={12} /> Donate <ArrowRight size={12} />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function CampaignCards() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="campaigns" className="py-24 relative overflow-hidden" style={{ background: '#faf9f6' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-12">
          <p className="text-orange-500 text-[11px] font-bold uppercase tracking-[0.22em] mb-3">We Need Your Help</p>
          <h2 className="font-display font-black text-gray-900"
            style={{ fontSize: 'clamp(30px, 3.8vw, 48px)', lineHeight: 1.1 }}>
            Featured Campaigns
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-[14px] leading-relaxed mt-3">
            It's through donations like yours that we can give everything to those who need it most.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {campaigns.map((c, i) => <Card key={c.id} c={c} i={i} />)}
        </div>
      </div>
    </section>
  );
}
