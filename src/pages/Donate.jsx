import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Heart, CheckCircle, Shield, Lock, CreditCard,
  Smartphone, Building2, ArrowLeft, Sparkles,
  User, Mail, Phone, FileText, ChevronDown, X,
  Gift, Star, Zap
} from 'lucide-react';

/* ─── Campaign data ───────────────────────────── */
const campaigns = [
  { id: 'special-needs', label: 'Special Needs Support',       color: 'purple', hex: '#8b5cf6' },
  { id: 'orphan-edu',    label: 'Orphans Educational Support', color: 'orange', hex: '#f97316' },
  { id: 'community',     label: 'Community Services',          color: 'teal',   hex: '#14b8a6' },
  { id: 'tribal-kids',   label: 'Tribal Kids Welfare',         color: 'rose',   hex: '#f43f5e' },
  { id: 'general',       label: 'General Fund',                color: 'amber',  hex: '#f59e0b' },
];

const presetAmounts = [500, 1000, 2500, 5000, 10000];

const frequencies = [
  { id: 'once',    label: 'One Time' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'yearly',  label: 'Yearly' },
];

const paymentMethods = [
  { id: 'razorpay', label: 'Cards / UPI / Net Banking', icon: CreditCard, desc: 'Visa, Mastercard, RuPay, UPI, NEFT' },
  { id: 'upi',      label: 'UPI Direct',                icon: Smartphone,  desc: 'GPay, PhonePe, Paytm, BHIM' },
  { id: 'bank',     label: 'Bank Transfer (NEFT/RTGS)', icon: Building2,   desc: 'Direct bank transfer' },
];

/* ─── Impact messages per amount ─────────────── */
function getImpactMsg(amount) {
  if (!amount || amount < 100) return null;
  if (amount < 500)  return `₹${amount} buys a week of nutritious meals for a child.`;
  if (amount < 1000) return `₹${amount} provides school supplies for a child for a month.`;
  if (amount < 2500) return `₹${amount} covers a child's tuition fees for one month.`;
  if (amount < 5000) return `₹${amount} sponsors a child's education for a full term.`;
  if (amount < 10000) return `₹${amount} transforms the lives of an entire family.`;
  return `₹${amount} builds futures — a true champion donation! 🎉`;
}

/* ─── Razorpay loader ────────────────────────── */
function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload  = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/* ─── Success Screen ─────────────────────────── */
function SuccessScreen({ amount, donorName, campaignLabel, onReset }) {
  const [receiptId] = useState(() => 'ADF-' + Math.random().toString(36).slice(2, 8).toUpperCase());

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="text-center py-16 px-6 max-w-lg mx-auto"
    >
      {/* Animated check */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 18 }}
        className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-7 relative"
      >
        <CheckCircle size={56} className="text-green-500" />
        {/* Sparkle rings */}
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 2.5 + i * 0.4, opacity: 0 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.8 }}
            className="absolute inset-0 rounded-full border-2 border-green-400"
          />
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h2 className="font-display font-black text-3xl text-gray-900 mb-2">Thank You, {donorName}!</h2>
        <p className="text-gray-500 mb-6 leading-relaxed">
          Your generous donation of{' '}
          <span className="font-bold text-orange-500 text-lg">₹{Number(amount).toLocaleString('en-IN')}</span>{' '}
          to <span className="font-semibold text-gray-700">{campaignLabel}</span> has been received.
          <br />You're changing a child's life today. ❤️
        </p>

        {/* Receipt box */}
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 text-left mb-7 text-sm space-y-2">
          <div className="flex justify-between"><span className="text-gray-400">Receipt ID</span><span className="font-semibold text-gray-700">{receiptId}</span></div>
          <div className="flex justify-between"><span className="text-gray-400">Amount</span><span className="font-semibold text-gray-700">₹{Number(amount).toLocaleString('en-IN')}</span></div>
          <div className="flex justify-between"><span className="text-gray-400">Campaign</span><span className="font-semibold text-gray-700">{campaignLabel}</span></div>
          <div className="flex justify-between"><span className="text-gray-400">Tax Benefit</span><span className="font-semibold text-green-600">80G Eligible ✓</span></div>
          <div className="flex justify-between"><span className="text-gray-400">Date</span><span className="font-semibold text-gray-700">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
        </div>

        <p className="text-xs text-gray-400 mb-7">A confirmation & 80G certificate will be sent to your email within 24 hours.</p>

        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={onReset} className="btn-primary text-sm">
            <Heart size={15} fill="white" /> Donate Again
          </button>
          <Link to="/" className="btn-outline-dark text-sm">
            <ArrowLeft size={15} /> Back to Home
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Bank Transfer Modal ────────────────────── */
function BankModal({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-display font-bold text-xl text-gray-900">Bank Transfer Details</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"><X size={18} /></button>
        </div>
        <div className="space-y-3 text-sm">
          {[
            ['Account Name',   'Adhyapana Foundation'],
            ['Bank',           'State Bank of India'],
            ['Account Number', '1234 5678 9012'],
            ['IFSC Code',      'SBIN0001234'],
            ['Branch',         'Hyderabad Main Branch'],
            ['Account Type',   'Current Account'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between py-2.5 border-b border-gray-100 last:border-0">
              <span className="text-gray-400 font-medium">{k}</span>
              <span className="font-semibold text-gray-800 text-right">{v}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 bg-orange-50 rounded-xl p-4 text-xs text-orange-700">
          <strong>Note:</strong> After transfer, please email us at <span className="underline">info@adhyapana.org</span> with your transaction ID and PAN for the 80G certificate.
        </div>
        <button onClick={onClose} className="btn-primary w-full mt-5 justify-center text-sm">Close</button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Donate Page ───────────────────────── */
export default function Donate() {
  const [searchParams] = useSearchParams();
  const initialCampaign = searchParams.get('campaign') || 'general';

  const [selectedCampaign, setSelectedCampaign]   = useState(initialCampaign);
  const [selectedAmount,   setSelectedAmount]     = useState(1000);
  const [customAmount,     setCustomAmount]       = useState('');
  const [frequency,        setFrequency]          = useState('once');
  const [paymentMethod,    setPaymentMethod]      = useState('razorpay');
  const [isProcessing,     setIsProcessing]       = useState(false);
  const [success,          setSuccess]            = useState(false);
  const [showBankModal,    setShowBankModal]      = useState(false);
  const [step,             setStep]               = useState(1); // 1=amount, 2=details, 3=payment

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const watchedName = watch('name', '');

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;
  const activeCampaign = campaigns.find(c => c.id === selectedCampaign) || campaigns[4];
  const impactMsg = getImpactMsg(finalAmount);

  /* Razorpay handler */
  const handleRazorpay = async (formData) => {
    setIsProcessing(true);
    const ok = await loadRazorpay();
    if (!ok) { alert('Payment gateway failed to load. Please try again.'); setIsProcessing(false); return; }

    const options = {
      key: 'rzp_test_YourTestKeyHere', // Replace with your Razorpay Test Key
      amount: finalAmount * 100,        // paise
      currency: 'INR',
      name: 'Adhyapana Foundation',
      description: `Donation – ${activeCampaign.label}`,
      image: 'https://via.placeholder.com/150/f97316/ffffff?text=AF',
      prefill: {
        name:    formData.name,
        email:   formData.email,
        contact: formData.phone,
      },
      notes: {
        campaign: activeCampaign.label,
        pan:      formData.pan || '',
      },
      theme: { color: '#f97316' },
      handler: function () {
        setIsProcessing(false);
        setSuccess(true);
      },
      modal: {
        ondismiss: () => setIsProcessing(false),
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmit = async (formData) => {
    if (paymentMethod === 'bank') { setShowBankModal(true); return; }
    await handleRazorpay(formData);
  };

  const handleReset = () => {
    setSuccess(false);
    setStep(1);
    setSelectedAmount(1000);
    setCustomAmount('');
    setFrequency('once');
    setPaymentMethod('razorpay');
  };

  return (
    <main className="min-h-screen section-bg pt-[72px]">
      {/* ── Hero Banner ── */}
      <div className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500 py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
          backgroundSize: '26px 26px',
        }} />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-72 h-72 bg-white/15 rounded-full blur-3xl pointer-events-none"
        />
        <div className="relative max-w-3xl mx-auto px-5 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-wider">
              <Heart size={13} fill="white" /> Make a Donation
            </div>
            <h1 className="font-display font-black text-white mb-4" style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', lineHeight: 1.08 }}>
              Every Rupee <br />
              <span className="text-amber-200">Changes a Life</span>
            </h1>
            <p className="text-white/85 text-base leading-relaxed max-w-xl mx-auto">
              100% of your donation goes directly to the cause. Help us empower children through education, 
              healthcare, and opportunity.
            </p>
          </motion.div>
        </div>
        <svg className="absolute bottom-0 left-0 right-0" viewBox="0 0 1440 60" fill="none">
          <path d="M0 60L1440 60L1440 15C1200 60 960 0 720 15C480 30 240 0 0 15Z" fill="#f8f7f2" />
        </svg>
      </div>

      {/* Trust badges */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-5xl mx-auto px-5 flex flex-wrap justify-center gap-6">
          {[
            { icon: Shield, label: '100% Secure Payments' },
            { icon: FileText, label: '80G Tax Exemption' },
            { icon: CheckCircle, label: 'Verified NGO' },
            { icon: Lock, label: 'SSL Encrypted' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-xs font-semibold text-gray-500">
              <Icon size={14} className="text-orange-500" />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-6xl mx-auto px-5 lg:px-8 py-14">
        <AnimatePresence mode="wait">
          {success ? (
            <SuccessScreen
              key="success"
              amount={finalAmount}
              donorName={watchedName || 'Friend'}
              campaignLabel={activeCampaign.label}
              onReset={handleReset}
            />
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-[1fr_380px] gap-8 items-start"
            >
              {/* ── LEFT: Form ── */}
              <div className="space-y-6">

                {/* Step indicator */}
                <div className="flex items-center gap-3">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-3">
                      <motion.button
                        onClick={() => step > s && setStep(s)}
                        whileHover={step > s ? { scale: 1.05 } : {}}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                          s === step
                            ? 'bg-orange-500 text-white shadow-lg shadow-orange-200'
                            : s < step
                            ? 'bg-green-500 text-white cursor-pointer'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        {s < step ? <CheckCircle size={14} /> : s}
                      </motion.button>
                      <span className={`text-xs font-semibold hidden sm:block ${s === step ? 'text-gray-800' : 'text-gray-400'}`}>
                        {s === 1 ? 'Choose Amount' : s === 2 ? 'Your Details' : 'Payment'}
                      </span>
                      {s < 3 && <div className={`w-8 h-0.5 rounded-full ${s < step ? 'bg-green-400' : 'bg-gray-200'}`} />}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                  {/* ── STEP 1: Amount & Campaign ── */}
                  <AnimatePresence>
                    {step >= 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100"
                      >
                        <h2 className="font-display font-bold text-lg text-gray-900 mb-5 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-500 text-xs font-bold flex items-center justify-center">1</span>
                          Select Campaign & Amount
                        </h2>

                        {/* Campaign picker */}
                        <div className="mb-6">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Campaign</label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {campaigns.map((c) => (
                              <motion.button
                                key={c.id}
                                type="button"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedCampaign(c.id)}
                                className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
                                  selectedCampaign === c.id
                                    ? 'border-orange-500 bg-orange-50 text-orange-600'
                                    : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: selectedCampaign === c.id ? c.hex : '#d1d5db' }} />
                                  {c.label}
                                </span>
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        {/* Frequency */}
                        <div className="mb-6">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Frequency</label>
                          <div className="flex gap-2 flex-wrap">
                            {frequencies.map((f) => (
                              <motion.button
                                key={f.id}
                                type="button"
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => setFrequency(f.id)}
                                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                                  frequency === f.id
                                    ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                }`}
                              >
                                {f.label}
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        {/* Amount presets */}
                        <div className="mb-5">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Donation Amount</label>
                          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 mb-4">
                            {presetAmounts.map((a) => (
                              <motion.button
                                key={a}
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => { setSelectedAmount(a); setCustomAmount(''); }}
                                className={`py-3 rounded-xl text-sm font-bold transition-all duration-200 border-2 ${
                                  selectedAmount === a && !customAmount
                                    ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-200'
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300'
                                }`}
                              >
                                ₹{a >= 1000 ? `${a / 1000}K` : a}
                              </motion.button>
                            ))}
                          </div>

                          {/* Custom amount */}
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">₹</span>
                            <input
                              type="number"
                              placeholder="Enter custom amount"
                              value={customAmount}
                              onChange={e => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                              className="w-full pl-9 pr-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:border-orange-400 transition-colors"
                            />
                          </div>
                        </div>

                        {/* Impact message */}
                        <AnimatePresence>
                          {impactMsg && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-700"
                            >
                              <Sparkles size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                              {impactMsg}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {step === 1 && (
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => finalAmount >= 10 && setStep(2)}
                            className="btn-primary w-full justify-center mt-5 text-sm"
                          >
                            Continue to Details
                          </motion.button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ── STEP 2: Donor Details ── */}
                  <AnimatePresence>
                    {step >= 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100"
                      >
                        <h2 className="font-display font-bold text-lg text-gray-900 mb-5 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-500 text-xs font-bold flex items-center justify-center">2</span>
                          Your Details
                        </h2>

                        <div className="grid sm:grid-cols-2 gap-4">
                          {/* Name */}
                          <div className="sm:col-span-2">
                            <label className="text-xs font-bold text-gray-500 mb-1.5 block">Full Name *</label>
                            <div className="relative">
                              <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                              <input
                                {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Too short' } })}
                                placeholder="Ramesh Kumar"
                                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:border-orange-400 transition-colors placeholder-gray-300"
                              />
                            </div>
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                          </div>

                          {/* Email */}
                          <div>
                            <label className="text-xs font-bold text-gray-500 mb-1.5 block">Email Address *</label>
                            <div className="relative">
                              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                              <input
                                {...register('email', {
                                  required: 'Email is required',
                                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
                                })}
                                type="email"
                                placeholder="you@example.com"
                                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:border-orange-400 transition-colors placeholder-gray-300"
                              />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                          </div>

                          {/* Phone */}
                          <div>
                            <label className="text-xs font-bold text-gray-500 mb-1.5 block">Phone Number *</label>
                            <div className="relative">
                              <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                              <input
                                {...register('phone', {
                                  required: 'Phone is required',
                                  pattern: { value: /^[6-9]\d{9}$/, message: 'Enter valid 10-digit mobile number' },
                                })}
                                type="tel"
                                maxLength={10}
                                placeholder="9876543210"
                                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:border-orange-400 transition-colors placeholder-gray-300"
                              />
                            </div>
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                          </div>

                          {/* PAN */}
                          <div className="sm:col-span-2">
                            <label className="text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-1.5 block">
                              <FileText size={12} className="text-orange-400" />
                              PAN Number
                              <span className="text-gray-300 font-normal">(optional — required for 80G certificate)</span>
                            </label>
                            <div className="relative">
                              <input
                                {...register('pan', {
                                  pattern: { value: /^[A-Z]{5}[0-9]{4}[A-Z]$/, message: 'Enter valid PAN (e.g. ABCDE1234F)' },
                                })}
                                placeholder="ABCDE1234F"
                                maxLength={10}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-800 uppercase focus:outline-none focus:border-orange-400 transition-colors placeholder-gray-300"
                              />
                            </div>
                            {errors.pan && <p className="text-red-500 text-xs mt-1">{errors.pan.message}</p>}
                          </div>

                          {/* Message */}
                          <div className="sm:col-span-2">
                            <label className="text-xs font-bold text-gray-500 mb-1.5 block">Message (optional)</label>
                            <textarea
                              {...register('message')}
                              rows={2}
                              placeholder="Share why you're donating..."
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:border-orange-400 transition-colors placeholder-gray-300 resize-none"
                            />
                          </div>
                        </div>

                        {step === 2 && (
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleSubmit(() => setStep(3))}
                            className="btn-primary w-full justify-center mt-5 text-sm"
                          >
                            Continue to Payment
                          </motion.button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ── STEP 3: Payment ── */}
                  <AnimatePresence>
                    {step >= 3 && (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100"
                      >
                        <h2 className="font-display font-bold text-lg text-gray-900 mb-5 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-500 text-xs font-bold flex items-center justify-center">3</span>
                          Choose Payment Method
                        </h2>

                        <div className="space-y-3 mb-6">
                          {paymentMethods.map((m) => {
                            const Icon = m.icon;
                            return (
                              <motion.label
                                key={m.id}
                                whileHover={{ scale: 1.01 }}
                                className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                                  paymentMethod === m.id
                                    ? 'border-orange-500 bg-orange-50'
                                    : 'border-gray-200 hover:border-gray-300 bg-white'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="payment"
                                  value={m.id}
                                  checked={paymentMethod === m.id}
                                  onChange={() => setPaymentMethod(m.id)}
                                  className="hidden"
                                />
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                  paymentMethod === m.id ? 'bg-orange-500' : 'bg-gray-100'
                                }`}>
                                  <Icon size={18} className={paymentMethod === m.id ? 'text-white' : 'text-gray-500'} />
                                </div>
                                <div className="flex-1">
                                  <p className="font-semibold text-gray-800 text-sm">{m.label}</p>
                                  <p className="text-gray-400 text-xs">{m.desc}</p>
                                </div>
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                  paymentMethod === m.id ? 'border-orange-500' : 'border-gray-300'
                                }`}>
                                  {paymentMethod === m.id && <div className="w-2 h-2 bg-orange-500 rounded-full" />}
                                </div>
                              </motion.label>
                            );
                          })}
                        </div>

                        {/* Pay button */}
                        <motion.button
                          type="submit"
                          disabled={isProcessing}
                          whileHover={!isProcessing ? { scale: 1.03, boxShadow: '0 20px 40px rgba(249,115,22,0.35)' } : {}}
                          whileTap={!isProcessing ? { scale: 0.97 } : {}}
                          className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-display font-bold text-base rounded-2xl flex items-center justify-center gap-3 shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {isProcessing ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full"
                              />
                              Processing…
                            </>
                          ) : (
                            <>
                              <Lock size={17} />
                              Pay ₹{finalAmount ? Number(finalAmount).toLocaleString('en-IN') : '—'} Securely
                            </>
                          )}
                        </motion.button>

                        <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1.5">
                          <Shield size={11} className="text-green-500" />
                          256-bit SSL encrypted. Your data is safe.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>

              {/* ── RIGHT: Summary Sidebar ── */}
              <div className="space-y-5 lg:sticky lg:top-24">
                {/* Donation summary */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
                >
                  <h3 className="font-display font-bold text-gray-900 mb-4 text-base">Donation Summary</h3>

                  <div className="space-y-3 text-sm mb-5">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Campaign</span>
                      <span className="font-semibold text-gray-700 text-right max-w-[55%] leading-tight">{activeCampaign.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Frequency</span>
                      <span className="font-semibold text-gray-700 capitalize">{frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Amount</span>
                      <span className="font-bold text-gray-900 text-base">
                        {finalAmount ? `₹${Number(finalAmount).toLocaleString('en-IN')}` : '—'}
                      </span>
                    </div>
                    <div className="h-px bg-gray-100" />
                    <div className="flex justify-between">
                      <span className="text-gray-400">Platform Fee</span>
                      <span className="font-semibold text-green-600">₹0 (Free)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="font-black text-orange-500 text-lg">
                        {finalAmount ? `₹${Number(finalAmount).toLocaleString('en-IN')}` : '—'}
                      </span>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-3 flex items-center gap-2.5 text-xs text-green-700 font-medium">
                    <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                    Eligible for 80G tax deduction
                  </div>
                </motion.div>

                {/* Impact preview */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl p-6 text-white"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Zap size={16} />
                    <span className="font-bold text-sm">Your Impact</span>
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {impactMsg || 'Select an amount to see your impact'}
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-3 gap-3 text-center">
                    {[['5K+', 'Children'], ['200+', 'Schools'], ['98%', 'To Cause']].map(([v, l]) => (
                      <div key={l}>
                        <p className="font-display font-black text-lg leading-none">{v}</p>
                        <p className="text-white/70 text-xs mt-0.5">{l}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Payment logos */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                >
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 text-center">Accepted Payments</p>
                  <div className="flex items-center justify-center flex-wrap gap-3">
                    {['Visa', 'MC', 'RuPay', 'UPI', 'GPay', 'PhonePe'].map(p => (
                      <span key={p} className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2.5 py-1 rounded-md">
                        {p}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-1.5 mt-3">
                    <Lock size={11} className="text-gray-400" />
                    <span className="text-[10px] text-gray-400">Powered by Razorpay</span>
                  </div>
                </motion.div>

                {/* Back link */}
                <Link to="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-orange-500 transition-colors justify-center py-1">
                  <ArrowLeft size={14} />
                  Back to Home
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bank modal */}
      <AnimatePresence>
        {showBankModal && <BankModal onClose={() => setShowBankModal(false)} />}
      </AnimatePresence>
    </main>
  );
}
