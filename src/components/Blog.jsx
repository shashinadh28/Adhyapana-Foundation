import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';

const posts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    tag: 'Child Welfare',
    tagColor: '#E85D26',
    tagBg: '#fdf0e8',
    accentBar: '#E85D26',
    date: 'Apr 5, 2018',
    title: 'Nearly 200 million children in the world were abused',
    excerpt: 'Proin nec eleifend lectus. Aliquam erat volutpat. Curabitur aliquet quam id dui posuere blandit.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80',
    tag: 'Education',
    tagColor: '#2E8B7A',
    tagBg: '#e6f4f1',
    accentBar: '#2E8B7A',
    date: 'Apr 5, 2018',
    title: 'Help children discover their hidden talents',
    excerpt: 'Proin nec eleifend lectus. Aliquam erat volutpat. Curabitur aliquet quam id dui posuere blandit.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80',
    tag: 'Stories',
    tagColor: '#F5A623',
    tagBg: '#fff8e6',
    accentBar: '#F5A623',
    date: 'Apr 5, 2018',
    title: 'Every child has a dream',
    excerpt: 'Proin nec eleifend lectus. Aliquam erat volutpat. Curabitur aliquet quam id dui posuere blandit.',
  },
];

function BlogCard({ post, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col bg-white rounded-2xl overflow-hidden cursor-pointer"
      style={{
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: hovered ? '0 14px 36px rgba(0,0,0,0.11)' : '0 2px 12px rgba(0,0,0,0.05)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.30s ease, box-shadow 0.30s ease',
      }}
    >
      {/* Coloured accent top bar */}
      <div style={{ height: 4, background: post.accentBar, flexShrink: 0 }} />

      {/* Image — compact height */}
      <div className="overflow-hidden flex-shrink-0" style={{ height: 160 }}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          style={{
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.50s ease',
          }}
        />
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">

        {/* Tag + date row */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="rounded-full px-2.5 py-1 font-body font-bold uppercase"
            style={{
              background: post.tagBg,
              color: post.tagColor,
              fontSize: 9.5,
              letterSpacing: '0.18em',
            }}
          >
            {post.tag}
          </span>
          <div className="flex items-center gap-1 text-gray-400">
            <Calendar size={10} />
            <span className="font-body" style={{ fontSize: 11 }}>{post.date}</span>
          </div>
        </div>

        {/* Title */}
        <h3
          className="font-playfair font-bold text-gray-950 mb-2 flex-1"
          style={{ fontSize: 'clamp(14px, 1.3vw, 16px)', lineHeight: 1.4 }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p
          className="font-body text-gray-400 leading-relaxed mb-4"
          style={{ fontSize: 12.5 }}
        >
          {post.excerpt}
        </p>

        {/* Divider */}
        <div className="mb-4" style={{ height: 1, background: 'rgba(0,0,0,0.06)' }} />

        {/* Read More */}
        <div
          className="flex items-center gap-1.5 font-body font-semibold"
          style={{ color: post.tagColor, fontSize: 12 }}
        >
          <span>Read More</span>
          <span
            style={{
              display: 'inline-flex',
              transform: hovered ? 'translateX(4px)' : 'translateX(0)',
              transition: 'transform 0.22s ease',
            }}
          >
            <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Blog() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-20" style={{ background: '#f9f7f4' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-between flex-wrap gap-4 mb-10"
        >
          <div>
            <p
              className="font-body font-bold uppercase mb-2"
              style={{ color: '#F5A623', fontSize: 11, letterSpacing: '0.3em' }}
            >
              Latest Stories
            </p>
            <h2
              className="font-playfair font-bold text-gray-950"
              style={{ fontSize: 'clamp(26px, 3vw, 42px)', lineHeight: 1.1 }}
            >
              From Our Blog
            </h2>
          </div>

          <motion.button
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-1.5 font-body font-semibold text-gray-400 hover:text-gray-800 transition-colors"
            style={{ fontSize: 12.5 }}
          >
            View all posts <ArrowRight size={13} />
          </motion.button>
        </motion.div>

        {/* Cards — 3 equal columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
