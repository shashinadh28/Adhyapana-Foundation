import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Eye, Target, Heart, Sparkles, Users, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ── Our Values data ── */
const values = [
  {
    icon: Heart,
    title: "Compassion",
    color: "#f43f5e",
    bg: "#fff1f2",
    borderColor: "#f43f5e",
    image: "/About-Us/Compassion.webp",
    desc: "We treat every individual with the empathy and kindness we would hope to receive ourselves. Our actions are rooted in love, so no child feels alone in their struggle.",
  },
  {
    icon: Sparkles,
    title: "Selfless Service",
    subtitle: "Nishkama Karma",
    color: "#F5A623",
    bg: "#fff8e6",
    borderColor: "#F5A623",
    image: "/About-Us/selfless-service.webp",
    desc: 'Inspired by the principle of "action without expectation," we serve without seeking reward — building a culture of generosity that uplifts our community and ourselves.',
  },
  {
    icon: Users,
    title: "Inclusion & Empowerment",
    color: "#2E8B7A",
    bg: "#e6f4f1",
    borderColor: "#2E8B7A",
    image: "/About-Us/Inclusion-Empowerment.webp",
    desc: "We champion equitable opportunities for orphans, single-parent children, and children with special needs — offering tailored support to help every child thrive.",
  },
  {
    icon: Shield,
    title: "Transparency & Trust",
    color: "#6366f1",
    bg: "#eef2ff",
    borderColor: "#6366f1",
    image: "/About-Us/Transparency-Trust.webp",
    desc: "Accountability is the foundation of meaningful change. Every rupee is auditable, starting with contributions as small as ₹100 — so donors always know exactly where their support goes.",
  },
];

function ValueCard({ value, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = value.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: "0 28px 60px rgba(0,0,0,0.12)" }}
      className="rounded-2xl flex flex-col overflow-hidden"
      style={{
        background: "#fff",
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
        border: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ height: 4, background: value.borderColor, borderRadius: "8px 8px 0 0" }} />
      <div className="flex flex-col items-center text-center px-6 pt-7 pb-5 flex-1">
        <div
          className="flex items-center justify-center mb-5 flex-shrink-0"
          style={{ width: 62, height: 62, borderRadius: "50%", background: value.bg }}
        >
          <Icon size={26} style={{ color: value.color }} />
        </div>
        <h3
          className="font-playfair font-bold text-gray-900 mb-2 leading-snug"
          style={{ fontSize: "clamp(16px, 1.4vw, 18px)" }}
        >
          {value.title}
        </h3>
        <div className="mb-2" style={{ width: 32, height: 2.5, background: value.borderColor, borderRadius: 2 }} />
        {value.subtitle && (
          <p className="font-body text-[10.5px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color: value.color }}>
            {value.subtitle}
          </p>
        )}
        {!value.subtitle && <div className="mb-3" />}
        <p className="font-body text-gray-500 leading-[1.8] text-[13px] flex-1">{value.desc}</p>
      </div>
      <div className="w-full overflow-hidden" style={{ height: 140, marginTop: "auto", flexShrink: 0 }}>
        <img src={value.image} alt={value.title} className="w-full h-full object-cover object-top" style={{ opacity: 0.9 }} />
      </div>
    </motion.div>
  );
}

export default function VisionMission() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px" });
  const nav = useNavigate();

  return (
    <>
      {/* ══ OUR PURPOSE ══ */}
      <section
        ref={sectionRef}
        className="relative w-full py-20 px-6 overflow-hidden"
        style={{ background: "#faf8f5" }}
      >
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(245,166,35,0.18) 1.2px, transparent 1.2px)",
            backgroundSize: "28px 28px",
            opacity: 0.6,
          }}
        />
        {/* Ambient glow top-right */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 70%)" }}
        />

        <div className="relative max-w-5xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65 }}
            className="text-center mb-14"
          >
            <p
              className="font-body font-bold uppercase tracking-[0.28em] mb-4"
              style={{ fontSize: 11, color: "#F5A623" }}
            >
              OUR PURPOSE
            </p>
            <h2
              className="font-playfair font-extrabold text-gray-950 mb-5"
              style={{ fontSize: "clamp(28px, 4.5vw, 52px)", lineHeight: 1.1 }}
            >
              Our Vision. Our Mission.{" "}
              <span style={{ color: "#F5A623" }}>Their Future.</span>
            </h2>
            <p
              className="font-body text-gray-500 leading-[1.8] max-w-md mx-auto"
              style={{ fontSize: "clamp(13.5px, 1.05vw, 15px)" }}
            >
              We are committed to creating meaningful opportunities that empower
              children and build a better tomorrow.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="flex flex-col gap-6">
            {/* VISION Card */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl overflow-hidden flex flex-col md:flex-row"
              style={{
                background: "#fff",
                boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
                border: "1px solid rgba(245,166,35,0.15)",
                minHeight: 200,
              }}
            >
              {/* Left: content */}
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(245,166,35,0.12)" }}
                  >
                    <Eye size={24} style={{ color: "#F5A623" }} />
                  </div>
                  <div>
                    <p className="font-body font-bold uppercase tracking-[0.22em]" style={{ fontSize: 13, color: "#F5A623" }}>
                      VISION
                    </p>
                    <div style={{ width: 32, height: 2, background: "#F5A623", borderRadius: 2, marginTop: 5 }} />
                  </div>
                </div>
                <p
                  className="font-body text-gray-700 leading-[1.85]"
                  style={{ fontSize: "clamp(14px, 1.15vw, 16px)", maxWidth: 400 }}
                >
                  A world where every child's education is determined by their
                  potential, not their circumstances.
                </p>
              </div>

              {/* Right: image */}
              <div
                className="relative flex-shrink-0 overflow-hidden"
                style={{ width: "clamp(200px, 38%, 380px)", minHeight: 200 }}
              >
                <div
                  className="absolute inset-y-0 left-0 w-14 z-10 pointer-events-none hidden md:block"
                  style={{ background: "linear-gradient(to right, #fff 0%, transparent 100%)" }}
                />
                <img
                  src="/Our-Purpose/vision.webp"
                  alt="Vision — smiling children in school"
                  className="w-full h-full object-cover"
                  style={{ minHeight: 200 }}
                />
              </div>
            </motion.div>

            {/* MISSION Card */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl overflow-hidden flex flex-col md:flex-row"
              style={{
                background: "#fff",
                boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
                border: "1px solid rgba(46,139,122,0.15)",
                minHeight: 200,
              }}
            >
              {/* Left: content */}
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(46,139,122,0.12)" }}
                  >
                    <Target size={24} style={{ color: "#2E8B7A" }} />
                  </div>
                  <div>
                    <p className="font-body font-bold uppercase tracking-[0.22em]" style={{ fontSize: 13, color: "#2E8B7A" }}>
                      MISSION
                    </p>
                    <div style={{ width: 32, height: 2, background: "#2E8B7A", borderRadius: 2, marginTop: 5 }} />
                  </div>
                </div>
                <p
                  className="font-body text-gray-700 leading-[1.85]"
                  style={{ fontSize: "clamp(14px, 1.15vw, 16px)", maxWidth: 420 }}
                >
                  To provide financial assistance and holistic support that removes
                  economic barriers to quality education for orphans, single-parent
                  children, and children with special needs.
                </p>
              </div>

              {/* Right: image */}
              <div
                className="relative flex-shrink-0 overflow-hidden"
                style={{ width: "clamp(200px, 38%, 380px)", minHeight: 200 }}
              >
                <div
                  className="absolute inset-y-0 left-0 w-14 z-10 pointer-events-none hidden md:block"
                  style={{ background: "linear-gradient(to right, #fff 0%, transparent 100%)" }}
                />
                <img
                  src="/Our-Purpose/mission.webp"
                  alt="Mission — children studying at desks"
                  className="w-full h-full object-cover"
                  style={{ minHeight: 200 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ OUR VALUES ══ */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#FEF9F5" }}>
        {/* Top-right decorative background image */}
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{ width: "clamp(280px, 38vw, 520px)", zIndex: 0 }}
        >
          <img src="/About-Us/Our-Values-bg.webp" alt="" className="w-full h-auto" style={{ opacity: 0.85 }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
          {/* Header */}
          <motion.div
            ref={valuesRef}
            initial={{ opacity: 0, y: 28 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65 }}
            className="mb-14"
          >
            <p className="font-body text-[11px] font-bold uppercase tracking-[0.3em] mb-2" style={{ color: "#F5A623" }}>
              What Drives Us
            </p>
            <div className="mb-5" style={{ width: 36, height: 3, background: "#F5A623", borderRadius: 2 }} />
            <h2
              className="font-playfair font-bold mb-5"
              style={{ fontSize: "clamp(34px, 4.5vw, 58px)", lineHeight: 1.08, color: "#1a1a1a" }}
            >
              Our <span style={{ color: "#F5A623" }}>Values</span>
            </h2>
            <p className="font-body text-gray-500 leading-[1.75] max-w-md" style={{ fontSize: "clamp(13px, 1.05vw, 15px)" }}>
              These values shape our actions, guide our decisions,
              <br />
              and inspire us to create a better tomorrow for every child.
            </p>
          </motion.div>

          {/* Values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-14">
            {values.map((v, i) => (
              <ValueCard key={i} value={v} index={i} />
            ))}
          </div>

          {/* Donate CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 14px 40px rgba(245,166,35,0.42)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => nav("/donate")}
              className="inline-flex items-center gap-2.5 font-body font-bold text-white rounded-full px-10 py-4 text-[14px] tracking-wide transition-all duration-300"
              style={{ background: "#F5A623", boxShadow: "0 6px 22px rgba(245,166,35,0.32)" }}
            >
              <Heart size={15} fill="white" />
              Donate Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
