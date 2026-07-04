import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MapPin, Mail, Phone, Facebook, Instagram, Linkedin, Youtube,
  Send, CheckCircle, Clock, Heart,
} from 'lucide-react';

/* ── Contact data ─────────────────────────────────────────── */
const contactCards = [
  {
    icon: MapPin,
    label: 'Address',
    lines: ['HAL Colony, Gajularamaram,', 'Hyderabad, Telangana.'],
    accent: '#F5A623',
    bg: 'linear-gradient(135deg, #FEF9F2 0%, #FDF2DC 100%)',
    href: 'https://maps.google.com/?q=Gajularamaram,Hyderabad,Telangana',
  },
  {
    icon: Phone,
    label: 'Phone',
    lines: ['+91 9963624292'],
    accent: '#2E8B7A',
    bg: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
    href: 'tel:+919963624292',
  },
  {
    icon: Mail,
    label: 'Email',
    lines: ['info@adhyapanafoundation.org'],
    accent: '#E84393',
    bg: 'linear-gradient(135deg, #fff0f8 0%, #fce7f3 100%)',
    href: 'mailto:info@adhyapanafoundation.org',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    lines: ['Mon – Sat: 9 AM – 6 PM', 'Sunday: Closed'],
    accent: '#6366f1',
    bg: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
    href: null,
  },
];

const socials = [
  { icon: Facebook,  href: 'https://www.facebook.com/AdhyapanaNGO/',                               label: 'Facebook',  color: '#1877F2' },
  { icon: Instagram, href: 'https://www.instagram.com/adhyapana_foundation/',                       label: 'Instagram', color: '#E1306C' },
  { icon: Linkedin,  href: 'https://www.linkedin.com/company/adhyapana-foundation/',                label: 'LinkedIn',  color: '#0A66C2' },
  { icon: Youtube,   href: '#',                                                                      label: 'YouTube',   color: '#FF0000' },
];

/* ── Animated section header ─────────────────────────────── */
function SectionHeader({ eyebrow, title, sub, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="text-center mb-14"
    >
      <div className="inline-flex items-center gap-2 mb-4 px-5 py-2 rounded-full"
        style={{ background: 'rgba(245,166,35,0.10)', border: '1.5px solid rgba(245,166,35,0.28)' }}>
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#F5A623' }} />
        <span className="font-body font-bold uppercase tracking-[0.26em] text-[10.5px]" style={{ color: '#F5A623' }}>
          {eyebrow}
        </span>
      </div>
      <h2 className="font-playfair font-bold text-gray-950 mb-3"
        style={{ fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: 1.08 }}>
        {title}
      </h2>
      {sub && (
        <p className="font-body text-gray-500 leading-[1.85] max-w-xl mx-auto"
          style={{ fontSize: 'clamp(13.5px, 1.05vw, 15.5px)' }}>
          {sub}
        </p>
      )}
    </motion.div>
  );
}

/* ── Main page ───────────────────────────────────────────── */
export default function Contact() {
  const heroRef   = useRef(null);
  const cardsRef  = useRef(null);
  const formRef   = useRef(null);
  const socialRef = useRef(null);

  const heroInView   = useInView(heroRef,   { once: true });
  const cardsInView  = useInView(cardsRef,  { once: true, margin: '-60px' });
  const formInView   = useInView(formRef,   { once: true, margin: '-60px' });
  const socialInView = useInView(socialRef, { once: true, margin: '-60px' });

  const [form, setForm]       = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]     = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSubmitted(true); }, 1400);
  };

  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-32 pb-20 flex flex-col items-center justify-center text-center"
        style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2618 60%, #1E1A14 100%)', minHeight: 380 }}
      >
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1.2px, transparent 1.2px)', backgroundSize: '30px 30px' }} />
        {/* Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.14) 0%, transparent 65%)' }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-3xl mx-auto px-5"
        >
          <div className="inline-flex items-center gap-2.5 mb-5 px-5 py-2.5 rounded-full"
            style={{ background: 'rgba(245,166,35,0.12)', border: '1px solid rgba(245,166,35,0.30)' }}>
            <Heart size={12} fill="#F5A623" color="#F5A623" />
            <span className="font-body font-bold uppercase tracking-[0.26em] text-[10.5px]" style={{ color: '#F5A623' }}>
              Get In Touch
            </span>
          </div>
          <h1 className="font-playfair font-bold text-white mb-4"
            style={{ fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.08 }}>
            We'd Love to{' '}
            <span style={{ color: '#F5A623', fontStyle: 'italic' }}>Hear From You</span>
          </h1>
          <p className="font-body text-white/55 leading-[1.85] max-w-lg mx-auto"
            style={{ fontSize: 'clamp(14px, 1.1vw, 16px)' }}>
            Have a question, want to volunteer, or explore how you can support our mission?
            Reach out — we're always happy to connect.
          </p>
        </motion.div>
      </section>

      {/* ── Contact Cards ─────────────────────────────────── */}
      <section ref={cardsRef} className="py-20 relative" style={{ background: '#f9f7f4' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <SectionHeader
            eyebrow="Contact Info"
            title="Find Us Here"
            sub="Multiple ways to connect with the Adhyapana Foundation team."
            inView={cardsInView}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {contactCards.map((card, i) => {
              const Icon = card.icon;
              const inner = (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 36 }}
                  animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -8, boxShadow: '0 24px 56px rgba(0,0,0,0.12)' }}
                  className="rounded-3xl p-7 flex flex-col gap-4"
                  style={{ background: card.bg, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1.5px solid rgba(0,0,0,0.04)' }}
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${card.accent}18` }}>
                    <Icon size={22} style={{ color: card.accent }} />
                  </div>
                  <div>
                    <p className="font-body font-bold text-[10.5px] uppercase tracking-[0.22em] mb-2"
                      style={{ color: card.accent }}>
                      {card.label}
                    </p>
                    {card.lines.map((line, j) => (
                      <p key={j} className="font-body text-gray-700 leading-[1.75]"
                        style={{ fontSize: 'clamp(13.5px, 1vw, 15px)', fontWeight: j === 0 ? 600 : 400 }}>
                        {line}
                      </p>
                    ))}
                  </div>
                  {card.href && (
                    <span className="inline-flex items-center gap-1.5 font-body font-semibold text-[12px] mt-auto"
                      style={{ color: card.accent }}>
                      {card.label === 'Address' ? 'View on Map →' : card.label === 'Phone' ? 'Call Us →' : 'Send Email →'}
                    </span>
                  )}
                </motion.div>
              );
              return card.href ? (
                <a key={card.label} href={card.href} target="_blank" rel="noopener noreferrer" className="block">
                  {inner}
                </a>
              ) : inner;
            })}
          </div>
        </div>
      </section>

      {/* ── Contact Form + Map ────────────────────────────── */}
      <section ref={formRef} className="py-20" style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left – Form */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-body font-bold text-[11px] uppercase tracking-[0.28em] mb-2" style={{ color: '#F5A623' }}>
                Send a Message
              </p>
              <div className="mb-4" style={{ width: 36, height: 3, background: '#F5A623', borderRadius: 99 }} />
              <h2 className="font-playfair font-bold text-gray-950 mb-3"
                style={{ fontSize: 'clamp(26px, 3vw, 40px)', lineHeight: 1.1 }}>
                Drop Us a Line
              </h2>
              <p className="font-body text-gray-500 leading-[1.85] mb-8" style={{ fontSize: 14 }}>
                Fill in the form and our team will get back to you within 24 hours.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="rounded-3xl p-10 text-center"
                  style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', border: '1.5px solid rgba(34,197,94,0.25)' }}
                >
                  <CheckCircle size={52} className="mx-auto mb-4" style={{ color: '#16a34a' }} />
                  <h3 className="font-playfair font-bold text-gray-900 text-2xl mb-2">Message Sent!</h3>
                  <p className="font-body text-gray-500 text-[14px] leading-relaxed">
                    Thank you for reaching out. We'll get back to you very soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[['name','Full Name','text',true],['email','Email Address','email',true]].map(([name,ph,type,req]) => (
                      <div key={name}>
                        <label className="block font-body text-[12px] font-bold text-gray-500 uppercase tracking-[0.14em] mb-1.5">
                          {ph} {req && <span style={{ color: '#F5A623' }}>*</span>}
                        </label>
                        <input
                          name={name}
                          type={type}
                          required={req}
                          value={form[name]}
                          onChange={handleChange}
                          placeholder={ph}
                          className="w-full px-4 py-3.5 rounded-2xl font-body text-[14px] text-gray-800 placeholder-gray-300 focus:outline-none transition-all"
                          style={{ background: '#f9f7f4', border: '1.5px solid #e5e7eb', fontSize: 14 }}
                          onFocus={e => e.target.style.borderColor = '#F5A623'}
                          onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[['phone','Phone Number','tel',false],['subject','Subject','text',true]].map(([name,ph,type,req]) => (
                      <div key={name}>
                        <label className="block font-body text-[12px] font-bold text-gray-500 uppercase tracking-[0.14em] mb-1.5">
                          {ph} {req && <span style={{ color: '#F5A623' }}>*</span>}
                        </label>
                        <input
                          name={name}
                          type={type}
                          required={req}
                          value={form[name]}
                          onChange={handleChange}
                          placeholder={ph}
                          className="w-full px-4 py-3.5 rounded-2xl font-body text-[14px] text-gray-800 placeholder-gray-300 focus:outline-none transition-all"
                          style={{ background: '#f9f7f4', border: '1.5px solid #e5e7eb', fontSize: 14 }}
                          onFocus={e => e.target.style.borderColor = '#F5A623'}
                          onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block font-body text-[12px] font-bold text-gray-500 uppercase tracking-[0.14em] mb-1.5">
                      Message <span style={{ color: '#F5A623' }}>*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help…"
                      className="w-full px-4 py-3.5 rounded-2xl font-body text-[14px] text-gray-800 placeholder-gray-300 focus:outline-none transition-all resize-none"
                      style={{ background: '#f9f7f4', border: '1.5px solid #e5e7eb' }}
                      onFocus={e => e.target.style.borderColor = '#F5A623'}
                      onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={sending ? {} : { scale: 1.03, boxShadow: '0 14px 36px rgba(245,166,35,0.38)' }}
                    whileTap={sending ? {} : { scale: 0.97 }}
                    className="w-full py-4 font-body font-bold text-white text-[15px] rounded-2xl flex items-center justify-center gap-3 tracking-wide transition-all"
                    style={{ background: sending ? '#ccc' : 'linear-gradient(135deg, #F5A623 0%, #E85D26 100%)', boxShadow: sending ? 'none' : '0 6px 20px rgba(245,166,35,0.30)' }}
                  >
                    {sending ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={17} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Right – Map embed + quick contact */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6"
            >
              {/* Google Maps embed */}
              <div className="rounded-3xl overflow-hidden"
                style={{ height: 340, boxShadow: '0 8px 40px rgba(0,0,0,0.10)', border: '1.5px solid rgba(0,0,0,0.06)' }}>
                <iframe
                  title="Adhyapana Foundation Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.428876!2d78.4774!3d17.5124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDMwJzQ0LjYiTiA3OMKwMjgnMzguNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Quick contact cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Phone, label: 'Call Now', value: '+91 9963624292', href: 'tel:+919963624292', accent: '#2E8B7A' },
                  { icon: Mail,  label: 'Email Us', value: 'info@adhyapanafoundation.org', href: 'mailto:info@adhyapanafoundation.org', accent: '#E84393' },
                ].map(({ icon: Icon, label, value, href, accent }) => (
                  <a key={label} href={href}
                    className="flex items-center gap-3.5 rounded-2xl p-4 hover:shadow-lg transition-all"
                    style={{ background: '#f9f7f4', border: '1.5px solid #e5e7eb' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${accent}18` }}>
                      <Icon size={18} style={{ color: accent }} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-body font-bold text-[11px] uppercase tracking-[0.18em] mb-0.5" style={{ color: accent }}>{label}</p>
                      <p className="font-body text-gray-700 font-semibold text-[13px] truncate">{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Address card */}
              <a href="https://maps.google.com/?q=Gajularamaram,Hyderabad,Telangana" target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3.5 rounded-2xl p-5 hover:shadow-lg transition-all"
                style={{ background: 'linear-gradient(135deg, #FEF9F2 0%, #FDF2DC 100%)', border: '1.5px solid rgba(245,166,35,0.20)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(245,166,35,0.15)' }}>
                  <MapPin size={18} style={{ color: '#F5A623' }} />
                </div>
                <div>
                  <p className="font-body font-bold text-[11px] uppercase tracking-[0.18em] mb-1" style={{ color: '#F5A623' }}>Our Location</p>
                  <p className="font-body text-gray-700 font-semibold text-[14px]">HAL Colony, Gajularamaram</p>
                  <p className="font-body text-gray-500 text-[13px]">Hyderabad, Telangana, India</p>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Social Links ──────────────────────────────────── */}
      <section ref={socialRef} className="py-20 relative overflow-hidden" style={{ background: '#1a1a1a' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1.2px, transparent 1.2px)', backgroundSize: '30px 30px' }} />
        <div className="max-w-4xl mx-auto px-5 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={socialInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="font-body font-bold text-[11px] uppercase tracking-[0.28em] mb-3" style={{ color: '#F5A623' }}>Stay Connected</p>
            <h2 className="font-playfair font-bold text-white mb-4"
              style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', lineHeight: 1.1 }}>
              Follow Us on Social Media
            </h2>
            <p className="font-body text-white/50 mb-10 leading-relaxed" style={{ fontSize: 14 }}>
              Stay updated with our latest programs, stories, and events.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {socials.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-6 py-3.5 rounded-2xl font-body font-bold text-white text-[14px] transition-all"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = color; e.currentTarget.style.borderColor = color; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                >
                  <Icon size={18} />
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
