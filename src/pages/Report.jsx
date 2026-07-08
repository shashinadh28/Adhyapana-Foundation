import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// ==================== DATA FOR 2025 - 2026 ====================
const stats2025 = [
  { value: "Rs. 9,33,373", label: "Total Funds\nReceived & Donated" },
  { value: "28", label: "Orphan\nStudents" },
  { value: "10", label: "Single-Parent\nStudents" },
  { value: "4", label: "Special Needs\nStudents" },
  { value: "44", label: "Total\nBeneficiaries" },
  { value: "95%", label: "Top Score This\nYear" },
];

const allocation2025 = [
  {
    name: "Orphan School Fees",
    value: 440000,
    pct: 47.1,
    color: "#2E6FE0",
    detail: "28 children",
  },
  {
    name: "Widowed Mothers' Kids",
    value: 213223,
    pct: 22.8,
    color: "#F2A93B",
    detail: "10 children",
  },
  {
    name: "Special Needs Support",
    value: 160000,
    pct: 17.1,
    color: "#8B4FC9",
    detail: "4 children",
  },
  {
    name: "Higher Education",
    value: 90000,
    pct: 9.6,
    color: "#2FB6A6",
    detail: "MBBS + Intermediate",
  },
  {
    name: "Community Aid",
    value: 30150,
    pct: 3.2,
    color: "#E0508C",
    detail: "Groceries & blankets",
  },
];

const totalFund2025 = 933373;

const impactRows2025 = [
  {
    impact: "Orphan Edu Support — Female/Male",
    enrolled: "28",
    avg: "85.6%",
    highest: "93.2%",
    support: "₹4,40,000",
  },
  {
    impact: "Single-Parent — Widowed Mothers/Fathers",
    enrolled: "10",
    avg: "88.2%",
    highest: "95%",
    support: "₹2,13,223",
  },
  {
    impact: "Special Needs Kids Support",
    enrolled: "4",
    avg: "—",
    highest: "—",
    support: "₹1,60,000",
  },
  {
    impact: "Higher Education Support",
    enrolled: "2",
    avg: "70%",
    highest: "—",
    support: "₹90,000",
  },
  {
    impact: "Groceries & Blankets Distribution",
    enrolled: "—",
    avg: "—",
    highest: "—",
    support: "₹30,150",
  },
];

const totalRow2025 = {
  impact: "TOTAL",
  enrolled: "44",
  avg: "79.4%*",
  highest: "93.2%*",
  support: "₹9,33,373",
};

// ==================== DATA FOR 2024 - 2025 ====================
const moneyIn2024 = [
  { label: "Total Donations Received", value: "₹ 4,91,811" },
  { label: "Additional Funds", value: "₹ 0" },
  { label: "Administrative Costs (office rent, utilities)", value: "₹ 0" },
  { label: "Fundraising Costs (campaigns, events)", value: "₹ 0" },
];

const moneyOut2024 = [
  { label: "30 Orphans Educational Aid", value: "₹ 2,00,000" },
  { label: "Meghana Education Aid", value: "₹ 1,20,210" },
  { label: "5 Special Needs Education Aid", value: "₹ 79,000" },
  { label: "2 Widow kids Educational Aid", value: "₹ 51,518" },
  { label: "Grocery Donation", value: "₹ 40,027" },
  { label: "Others", value: "₹ 3,168" },
];

const moneyLeft2024 = [
  { label: "Income minus expenses", value: "-₹ 2,112" },
  { label: "Accumulated Donations", value: "₹ 23,842" },
];

const breakupData2024 = [
  { name: "30 Orphans Educational Aid", value: 200000, color: "#2196F3" },
  { name: "Meghana Education Aid", value: 120210, color: "#4CD137" },
  { name: "5 Special Needs Education Aid", value: 79000, color: "#9E9E9E" },
  { name: "2 Widow kids Educational Aid", value: 51518, color: "#FFC107" },
  { name: "Grocery Donation", value: 40027, color: "#F4211E" },
  { name: "Others", value: 3168, color: "#E91E8C" },
];

const total2024 = breakupData2024.reduce((sum, d) => sum + d.value, 0);

// ==================== DATA FOR 2023 - 2024 (FROM IMAGE) ====================
const moneyIn2023 = [
  { label: "Donation Received", value: "₹ 3,84,623" },
];

const moneyOut2023 = [
  { label: "Student Fee Donation", value: "₹ 3,23,810" },
  { label: "Sanitary and other medical Kits Donation", value: "₹ 46,588" },
  { label: "Stationary Donation", value: "₹ 37,600" },
  { label: "Zoho CRM", value: "₹ 11,328" },
  { label: "Food Donation Expenses", value: "₹ 5,960" },
  { label: "Professional Fee", value: "₹ 2,400" },
  { label: "Delivery/Transportation Costs", value: "₹ 615" },
  { label: "Misc Payments", value: "₹ 353" },
];

const moneyLeft2023 = [
  { label: "Income minus expenses", value: "-₹ 44,031" },
];

const breakupData2023 = [
  { name: "Student Fee Donation", value: 323810, color: "#4CD137" },
  { name: "Sanitary and other medical Kits Donation", value: 46588, color: "#2196F3" },
  { name: "Stationary Donation", value: 37600, color: "#E91E8C" },
  { name: "Zoho CRM", value: 11328, color: "#F4211E" },
  { name: "Food Donation Expenses", value: 5960, color: "#FFC107" },
  { name: "Professional Fee", value: 2400, color: "#9E9E9E" },
  { name: "Delivery/Transportation Costs", value: 615, color: "#8B4FC9" },
  { name: "Misc Payments", value: 353, color: "#00BD9D" },
];

const total2023 = breakupData2023.reduce((sum, d) => sum + d.value, 0);

// % label inside donut slices (for 2025 report)
const renderPercentLabel2025 = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.62;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const pctVal = Math.round(percent * 100);
  if (pctVal < 2) return null;
  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={13}
      fontWeight={700}
      style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
    >
      {pctVal}%
    </text>
  );
};

// % label inside donut slices (for 2024 & 2023 reports)
const renderPercentLabelGeneral = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const pct = Math.round(percent * 100);
  if (pct < 1) return null;

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={13}
      fontWeight={700}
      style={{ textShadow: "0 1px 2px rgba(0,0,0,0.25)" }}
    >
      {pct}%
    </text>
  );
};

function SectionTable({ title, headerColor, rows, totalRow }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200/80 shadow-sm bg-white">
      <div
        className="px-5 py-3 font-bold text-white text-[15px] tracking-wide"
        style={{ backgroundColor: headerColor }}
      >
        {title}
      </div>
      <table className="w-full text-[14.5px]">
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={i % 2 === 1 ? "bg-gray-50/50" : "bg-white"}
            >
              <td className="px-5 py-3.5 font-medium text-gray-700 border-t border-gray-100">
                {row.label}
              </td>
              <td className="px-5 py-3.5 text-right font-bold text-gray-900 border-t border-gray-100 whitespace-nowrap">
                {row.value}
              </td>
            </tr>
          ))}
          {totalRow && (
            <tr className="bg-gray-100/60">
              <td className="px-5 py-3.5 font-bold text-gray-950 border-t border-gray-200">
                {totalRow.label}
              </td>
              <td className="px-5 py-3.5 text-right font-black text-gray-950 border-t border-gray-200 whitespace-nowrap">
                {totalRow.value}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function FinancialReporting() {
  // 2025 chart animates once on mount (it's near the top)
  const [animKey2025, setAnimKey2025] = useState(0);
  useEffect(() => { setAnimKey2025((k) => k + 1); }, []);

  // 2024 chart animates when its section scrolls into view
  const chart2024Ref = useRef(null);
  const chart2024InView = useInView(chart2024Ref, { once: true, margin: '-80px' });
  const [animKey2024, setAnimKey2024] = useState(0);
  useEffect(() => {
    if (chart2024InView) setAnimKey2024((k) => k + 1);
  }, [chart2024InView]);

  // 2023 chart animates when its section scrolls into view
  const chart2023Ref = useRef(null);
  const chart2023InView = useInView(chart2023Ref, { once: true, margin: '-80px' });
  const [animKey2023, setAnimKey2023] = useState(0);
  useEffect(() => {
    if (chart2023InView) setAnimKey2023((k) => k + 1);
  }, [chart2023InView]);

  return (
    <div className="w-full bg-[#EAF3F1] min-h-screen">
      {/* ========================================================
          SECTION 1: ANNUAL IMPACT REPORT 2025 - 2026
          ======================================================== */}
      
      {/* ---------- HEADER ---------- */}
      <div className="bg-gradient-to-b from-gray-100 to-[#EAF3F1] pt-[110px] pb-6 px-6 md:px-12">
        <div className="flex items-center justify-center max-w-5xl mx-auto">
          <img
            src="/Adhyapana_Foundation_Logo.webp"
            alt="Adhyapana Foundation"
            className="h-16 md:h-20 w-auto object-contain"
          />
        </div>
        <h2 className="text-center text-2xl md:text-4xl font-extrabold text-gray-900 mt-8 tracking-wide font-playfair">
          ANNUAL IMPACT REPORT 2025 – 2026
        </h2>
      </div>

      {/* ---------- STAT STRIP ---------- */}
      <div className="max-w-5xl mx-auto px-4 md:px-0">
        <div className="grid grid-cols-2 md:grid-cols-6 bg-[#0E2A47] rounded-xl overflow-hidden shadow-lg">
          {stats2025.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col justify-center items-start gap-1 px-4 py-6 ${
                i !== 0 ? "border-t md:border-t-0 md:border-l border-white/15" : ""
              }`}
            >
              <span className="text-white text-lg md:text-xl font-extrabold">
                {s.value}
              </span>
              <span className="text-white/70 text-[11px] md:text-xs leading-tight whitespace-pre-line">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- ALLOCATION BY CATEGORY ---------- */}
      <div className="max-w-5xl mx-auto px-4 md:px-0 mt-10">
        <h3 className="text-xl font-bold text-gray-900 font-playfair">Allocation by Category</h3>
        <p className="text-sm text-gray-500 mb-4">
          All spending heads · ₹{totalFund2025.toLocaleString("en-IN")} total spent
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
          {/* Donut */}
          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart key={animKey2025}>
                <Pie
                  data={allocation2025}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="55%"
                  outerRadius="90%"
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={1}
                  isAnimationActive={true}
                  animationDuration={1100}
                  animationEasing="ease-out"
                  label={renderPercentLabel2025}
                  labelLine={false}
                >
                  {allocation2025.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.color}
                      stroke="#EAF3F1"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [
                    `₹${value.toLocaleString("en-IN")}`,
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Category cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white rounded-xl border-l-4 border-emerald-500 shadow-sm p-4">
              <p className="text-[11px] font-semibold tracking-wide text-gray-500 uppercase">
                Total Beneficiaries
              </p>
              <p className="text-2xl font-extrabold text-gray-900 mt-1">44</p>
              <p className="text-xs text-gray-500">Individuals supported</p>
            </div>

            {allocation2025.map((a) => (
              <div
                key={a.name}
                className="bg-white rounded-xl shadow-sm p-4"
                style={{ borderLeft: `4px solid ${a.color}` }}
              >
                <p className="text-[11px] font-semibold tracking-wide text-gray-500 uppercase">
                  {a.name}
                </p>
                <p className="text-2xl font-extrabold text-gray-900 mt-1">
                  ₹{a.value.toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-gray-500">
                  {a.detail} · {a.pct}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- CONSOLIDATED IMPACT TABLE ---------- */}
      <div className="max-w-5xl mx-auto px-4 md:px-0 mt-12">
        <h3 className="text-xl font-bold text-blue-900 mb-4 font-playfair">
          Consolidated Impact Overview — 2025–2026
        </h3>
        <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200">
          <table className="w-full text-sm bg-white min-w-[640px]">
            <thead>
              <tr className="bg-[#0E2A47] text-white text-left">
                <th className="px-4 py-3 font-semibold">Impact</th>
                <th className="px-4 py-3 font-semibold text-center">Enrolled Kids</th>
                <th className="px-4 py-3 font-semibold text-center">Avg Student Grade</th>
                <th className="px-4 py-3 font-semibold text-center">Highest Student Grade</th>
                <th className="px-4 py-3 font-semibold text-right">Financial Support</th>
              </tr>
            </thead>
            <tbody>
              {impactRows2025.map((row, i) => (
                <tr
                  key={row.impact}
                  className={i % 2 === 1 ? "bg-purple-50/40" : "bg-white"}
                >
                  <td className="px-4 py-3 font-medium text-gray-800 border-t border-gray-100">
                    {row.impact}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700 border-t border-gray-100">
                    {row.enrolled}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700 border-t border-gray-100">
                    {row.avg}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700 border-t border-gray-100">
                    {row.highest}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-900 border-t border-gray-100 whitespace-nowrap">
                    {row.support} rupees Donated
                  </td>
                </tr>
              ))}
              <tr className="bg-emerald-100 font-bold text-gray-900">
                <td className="px-4 py-3 border-t-2 border-emerald-300">{totalRow2025.impact}</td>
                <td className="px-4 py-3 text-center border-t-2 border-emerald-300">{totalRow2025.enrolled}</td>
                <td className="px-4 py-3 text-center border-t-2 border-emerald-300">{totalRow2025.avg}</td>
                <td className="px-4 py-3 text-center border-t-2 border-emerald-300">{totalRow2025.highest}</td>
                <td className="px-4 py-3 text-right border-t-2 border-emerald-300 whitespace-nowrap">{totalRow2025.support}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ---------- CLOSING NOTE ---------- */}
      <div className="max-w-5xl mx-auto px-4 md:px-0 mt-12 text-sm text-gray-700 leading-relaxed space-y-5">
        <div>
          <h4 className="font-bold text-blue-900 mb-1 font-playfair">Closing Note:</h4>
          <p>
            The academic year 2025–2026 stands as a testament to the power of
            collective generosity. Thanks to the dedication of our donors —
            led by Ecommerce Wala, Dhosti Global, Dhanu Reddy, Pavan Reddy,
            and many other kind-hearted contributors — every rupee received
            was channelled directly into the lives of 44 deserving students.
          </p>
          <p className="mt-2">
            From a young orphan in Class 1 finding joy in learning, to
            Meghana pursuing her MBBS dream, each story represents the
            Foundation's mission in action. We thank the Board of Directors
            for their continued guidance and look forward to expanding our
            reach in the year ahead.
          </p>
        </div>

        <div className="border-t border-gray-300 pt-5">
          <h4 className="font-bold text-blue-900 mb-1 font-playfair">Financial & Impact Summary:</h4>
          <p>
            We are grateful to share that we received a total of{" "}
            <span className="font-semibold">₹9,33,373</span> this year.
          </p>
          <p className="font-bold text-blue-800 mt-1">
            96.8% Education Aid · 3.2% Community Aid · 100% Utilised for
            Children &amp; Families.
          </p>
          <p className="mt-2">
            Out of this, 96.8% was directed towards educational aid and 3.2%
            towards community aid — meaning 100% of the funds were utilised
            to support children and families in need.
          </p>
          <p className="mt-2">
            We extend our heartfelt thanks to every donor, member, and
            well-wisher whose generosity made this possible. Your trust and
            support continue to transform lives.
          </p>
          <p className="mt-2">
            As we move into the next academic year (2026–27), our goal is to
            support 65+ children. We hope to have your continued
            encouragement and partnership on this journey.
          </p>
          <p className="mt-2 text-gray-500 italic">
            Note: As always, our accounts are completely transparent. Anyone
            who wishes to inspect them is most welcome to do so at any time.
          </p>
        </div>

        <div className="pt-2 pb-14 border-b border-gray-300">
          <p className="font-bold text-blue-900">Warm regards,</p>
          <p>Deepak Teja</p>
          <p>Founder &amp; President</p>
          <p className="underline">Adhyapana Foundation</p>
        </div>
      </div>

      {/* ========================================================
          SECTION 2: FINANCIAL REPORTING 2024 - 2025
          ======================================================== */}
      
      <div className="max-w-5xl mx-auto px-4 md:px-0 py-16">
        <div className="bg-white rounded-[32px] p-6 md:p-12 shadow-md border border-gray-100">
          <h2 className="text-3xl md:text-4.5xl font-playfair font-bold text-gray-950 mb-10 leading-tight">
            Financial Reporting April 2024 - March 2025
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* LEFT: tables */}
            <div className="space-y-8">
              <SectionTable
                title="Money In"
                headerColor="#5CB338"
                rows={moneyIn2024}
                totalRow={{ label: "Total income", value: "₹ 4,91,811" }}
              />

              <SectionTable
                title="Money Out"
                headerColor="#F4211E"
                rows={moneyOut2024}
                totalRow={{ label: "Total expenses", value: "₹ 4,93,923" }}
              />

              <SectionTable
                title="Money Left Over"
                headerColor="#2196F3"
                rows={moneyLeft2024}
              />
            </div>

            {/* RIGHT: donut chart */}
            <div ref={chart2024Ref} className="flex flex-col items-center w-full bg-gray-50/50 rounded-[24px] p-6 md:p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 tracking-wide font-playfair">Break Up</h3>
              <div style={{ width: "100%", height: 380, minHeight: 380 }}>
                <ResponsiveContainer width="100%" height={380}>
                  <PieChart key={animKey2024}>
                    <Pie
                      data={breakupData2024}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius="55%"
                      outerRadius="90%"
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={1.5}
                      isAnimationActive={true}
                      animationBegin={0}
                      animationDuration={1100}
                      animationEasing="ease-out"
                      label={renderPercentLabelGeneral}
                      labelLine={false}
                    >
                      {breakupData2024.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={entry.color}
                          stroke="#fff"
                          strokeWidth={2.5}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "16px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                        border: "1px solid rgba(0,0,0,0.05)",
                        padding: "10px 14px",
                      }}
                      formatter={(value, name) => [
                        `₹ ${value.toLocaleString("en-IN")} (${(
                          (value / total2024) *
                          100
                        ).toFixed(1)}%)`,
                        name,
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <ul className="w-full max-w-md space-y-3 mt-6">
                {breakupData2024.map((item) => (
                  <li key={item.name} className="flex items-center justify-between gap-3 pb-2 border-b border-gray-200/40 last:border-b-0">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-4 h-4 rounded-full flex-shrink-0 shadow-sm"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-800 text-[14.5px] font-semibold">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-gray-500 text-[14px] font-bold">
                      ₹ {item.value.toLocaleString("en-IN")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          SECTION 3: FINANCIAL REPORTING 2023 - 2024 (FROM IMAGE)
          ======================================================== */}
      
      <div className="max-w-5xl mx-auto px-4 md:px-0 pb-24">
        <div className="bg-white rounded-[32px] p-6 md:p-12 shadow-md border border-gray-100">
          <h2 className="text-3xl md:text-4.5xl font-playfair font-bold text-gray-950 mb-10 leading-tight">
            Financial Reporting April 2023 - March 2024
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* LEFT: tables */}
            <div className="space-y-8">
              <SectionTable
                title="Money In"
                headerColor="#5CB338"
                rows={moneyIn2023}
                totalRow={{ label: "Total income", value: "₹ 3,84,623" }}
              />

              <SectionTable
                title="Money Out"
                headerColor="#F4211E"
                rows={moneyOut2023}
                totalRow={{ label: "Total expenses", value: "₹ 4,28,654" }}
              />

              <SectionTable
                title="Money Left Over"
                headerColor="#2196F3"
                rows={moneyLeft2023}
              />
            </div>

            {/* RIGHT: donut chart */}
            <div ref={chart2023Ref} className="flex flex-col items-center w-full bg-gray-50/50 rounded-[24px] p-6 md:p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 tracking-wide font-playfair">Break Up</h3>
              <div style={{ width: "100%", height: 380, minHeight: 380 }}>
                <ResponsiveContainer width="100%" height={380}>
                  <PieChart key={animKey2023}>
                    <Pie
                      data={breakupData2023}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius="55%"
                      outerRadius="90%"
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={1.5}
                      isAnimationActive={true}
                      animationBegin={0}
                      animationDuration={1100}
                      animationEasing="ease-out"
                      label={renderPercentLabelGeneral}
                      labelLine={false}
                    >
                      {breakupData2023.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={entry.color}
                          stroke="#fff"
                          strokeWidth={2.5}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "16px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                        border: "1px solid rgba(0,0,0,0.05)",
                        padding: "10px 14px",
                      }}
                      formatter={(value, name) => [
                        `₹ ${value.toLocaleString("en-IN")} (${(
                          (value / total2023) *
                          100
                        ).toFixed(1)}%)`,
                        name,
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <ul className="w-full max-w-md space-y-3 mt-6">
                {breakupData2023.map((item) => (
                  <li key={item.name} className="flex items-center justify-between gap-3 pb-2 border-b border-gray-200/40 last:border-b-0">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-4 h-4 rounded-full flex-shrink-0 shadow-sm"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-800 text-[14.5px] font-semibold">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-gray-500 text-[14px] font-bold">
                      ₹ {item.value.toLocaleString("en-IN")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
