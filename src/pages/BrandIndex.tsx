import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart3, Users, Landmark, Globe, Leaf, Gem, ArrowLeft,
  Download, Printer, BookOpen, ExternalLink, TrendingUp,
  TrendingDown, Minus, ChevronRight, BarChart2, FileText,
  ShieldCheck, ArrowUpRight, ArrowDownRight, Activity, Brain,
  Target, Award,
} from "lucide-react";
import {
  BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area,
  Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from "recharts";
import SEO from "@/components/SEO";
import {
  indicators, categories, references, keyFacts,
  getIndicatorsByCategory, getLatestValue, getYearOverYearChange,
} from "@/data/jordanOfficialStats";
import {
  countries, indicatorDefs, gdpTimeline, inflationTimeline, aiIndicators,
  getRankings,
} from "@/data/brandIndex";
import type { Indicator } from "@/data/jordanOfficialStats";

const categoryIcons: Record<string, any> = {
  macro: BarChart3, population: Users, banking: Landmark,
  external: Globe, environment: Leaf, resources: Gem,
};

const COLORS = ["#0F4C81", "#2D8B6F", "#E8913A", "#C0392B", "#7B68EE", "#3498DB", "#E74C3C", "#1ABC9C"];

function TrendIcon({ value }: { value: number }) {
  if (value > 1) return <TrendingUp className="w-4 h-4 text-emerald" />;
  if (value < -1) return <TrendingDown className="w-4 h-4 text-red-500" />;
  return <Minus className="w-4 h-4 text-slate-400" />;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    good: "bg-emerald/10 text-emerald border-emerald/20",
    warning: "bg-amber-50 text-amber-600 border-amber-200",
    critical: "bg-red-50 text-red-600 border-red-200",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${map[status] || map.warning}`}>
      {status.toUpperCase()}
    </span>
  );
}

/* ── 8-COUNTRY COMPARISON TABLE ── */
function CountryComparisonTable() {
  const [sortKey, setSortKey] = useState("gdpGrowth");
  const [sortAsc, setSortAsc] = useState(false);
  const sorted = useMemo(() => {
    const def = indicatorDefs.find((d) => d.key === sortKey);
    return getRankings(sortKey, def?.higherBetter ?? true);
  }, [sortKey]);

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-wrap gap-2 mb-4">
        {indicatorDefs.map((def) => (
          <button
            key={def.key}
            onClick={() => { setSortKey(def.key); setSortAsc(!sortAsc); }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
              sortKey === def.key
                ? "bg-navy text-white border-navy"
                : "bg-white text-slate-600 border-slate-200 hover:border-navy"
            }`}
          >
            {def.label}
          </button>
        ))}
      </div>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="text-left py-3 px-4 font-semibold text-slate-700">Rank</th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">Country</th>
            {indicatorDefs.map((d) => (
              <th key={d.key} className="text-right py-3 px-3 font-semibold text-slate-700 text-xs">
                {d.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((c, i) => (
            <tr key={c.id} className={`border-b border-slate-100 ${c.id === "jo" ? "bg-navy/5" : "hover:bg-slate-50"}`}>
              <td className="py-3 px-4 font-bold text-navy">#{i + 1}</td>
              <td className="py-3 px-4 font-medium">
                <span className="mr-1">{c.flag}</span>
                {c.name} {c.id === "jo" && <span className="text-[10px] bg-navy text-white px-1.5 py-0.5 rounded ml-1">YOU</span>}
              </td>
              {indicatorDefs.map((def) => {
                const val = c[def.key as keyof typeof c] as number;
                const isBest = i === 0;
                return (
                  <td key={def.key} className={`text-right py-3 px-3 font-mono text-xs ${isBest ? "font-bold text-emerald" : "text-slate-600"}`}>
                    {typeof val === "number" ? val.toLocaleString(undefined, { maximumFractionDigits: 1 }) : val}
                    <span className="text-slate-400 ml-0.5">{def.unit}</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── INDICATOR CARD ── */
function IndicatorCard({ indicator }: { indicator: Indicator }) {
  const [expanded, setExpanded] = useState(false);
  const latest = getLatestValue(indicator);
  const change = getYearOverYearChange(indicator);
  const chartType = indicator.unit === "%" ? "line" : "bar";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-800">{indicator.nameEn}</h3>
            <p className="text-sm text-slate-500 mt-0.5" dir="rtl">{indicator.nameAr}</p>
          </div>
          <div className="text-right ml-4">
            <div className="text-2xl font-bold text-navy">{latest.toLocaleString()}</div>
            <div className="flex items-center gap-1 justify-end mt-1">
              <TrendIcon value={change} />
              <span className={`text-sm font-medium ${change > 0 ? "text-emerald" : "text-red-500"}`}>
                {change > 0 ? "+" : ""}{change.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{indicator.unit}</span>
          <span className="text-xs text-slate-400">Latest: {indicator.data[indicator.data.length - 1].year}</span>
        </div>
      </div>
      <div className="h-48 px-4">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "line" ? (
            <AreaChart data={indicator.data}>
              <defs>
                <linearGradient id={`grad-${indicator.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F4C81" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#0F4C81" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} width={45} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }} formatter={(value: number) => [value.toLocaleString(), indicator.unit]} />
              <Area type="monotone" dataKey="value" stroke="#0F4C81" fill={`url(#grad-${indicator.id})`} strokeWidth={2} />
            </AreaChart>
          ) : (
            <ReBarChart data={indicator.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} width={45} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }} formatter={(value: number) => [value.toLocaleString(), indicator.unit]} />
              <Bar dataKey="value" fill="#0F4C81" radius={[4, 4, 0, 0]} />
            </ReBarChart>
          )}
        </ResponsiveContainer>
      </div>
      <div className="px-6 py-3 border-t border-slate-100">
        <button onClick={() => setExpanded(!expanded)} className="text-sm text-slate-500 hover:text-navy flex items-center gap-1 transition-colors">
          {expanded ? "Hide" : "Show"} Data Table
          <ChevronRight className={`w-4 h-4 transition-transform ${expanded ? "rotate-90" : ""}`} />
        </button>
        {expanded && (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-slate-200">
                {indicator.data.map((d) => <th key={d.year} className="py-2 px-3 text-left font-medium text-slate-600">{d.year}</th>)}
              </tr></thead>
              <tbody><tr>
                {indicator.data.map((d) => <td key={d.year} className="py-2 px-3 font-semibold text-navy">{d.value.toLocaleString()}</td>)}
              </tr></tbody>
            </table>
            {indicator.notes && <p className="text-xs text-slate-400 mt-2 italic">{indicator.notes}</p>}
            <p className="text-xs text-slate-400 mt-1">Source: {indicator.source}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
export default function BrandIndex() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "comparison" | "indicators" | "ai">("overview");

  const handlePrint = () => window.print();
  const handleDownload = () => {
    const data = { title: "Pioneers Brand Index", generatedAt: new Date().toISOString(), indicators, countries, references };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pioneers-brand-index-${new Date().getFullYear()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-offwhite">
      <SEO title="Pioneers Brand Index | Jordan & MENA Statistics 2020-2025" description="Official Jordan statistics database with 8-country MENA comparison, AI-powered indicators, and academic citations from World Bank, CBJ, DOS, UNCTAD." />

      {/* ═══════ HERO ═══════ */}
      <section className="bg-gradient-to-br from-navy via-[#0a3560] to-[#0d4a3a] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <BookOpen className="w-4 h-4 text-emerald" />
              <span className="text-sm text-white/90">Academic Research Database</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">Pioneers Brand Index</h1>
            <p className="text-xl text-slate-300 mt-3 max-w-2xl">Official Statistics of the Hashemite Kingdom of Jordan (2020–2025) with 8-Country MENA Benchmark</p>
            <p className="text-sm text-slate-400 mt-2" dir="rtl">قاعدة بيانات إحصائية رسمية للأردن مع مقارنة إقليمية — مصادر حكومية ودولية موثقة</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <button onClick={handlePrint} className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium border border-white/20 transition-all">
                <Printer className="w-4 h-4" /> Print Report
              </button>
              <button onClick={handleDownload} className="flex items-center gap-2 px-5 py-2.5 bg-emerald hover:bg-emerald-dark text-white rounded-full text-sm font-medium transition-all">
                <Download className="w-4 h-4" /> Export JSON
              </button>
              <button onClick={() => document.getElementById('references-section')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium border border-white/20 transition-all">
                <FileText className="w-4 h-4" /> Citations
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ KEY FACTS ═══════ */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {keyFacts.map((fact, i) => (
              <motion.div key={fact.labelEn} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-emerald/30 transition-colors">
                <div className="text-2xl font-bold text-navy">{fact.value}</div>
                <div className="text-xs font-medium text-slate-600 mt-1 leading-tight">{fact.labelEn}</div>
                <div className="text-[10px] text-slate-400 mt-1 leading-tight">{fact.contextEn}</div>
                <div className="text-[10px] text-emerald mt-1">{fact.source}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TABS ═══════ */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 pb-4">
          {[
            { key: "overview", label: "Overview", icon: Activity },
            { key: "comparison", label: "8-Country Comparison", icon: Globe },
            { key: "indicators", label: "Jordan Indicators", icon: BarChart2 },
            { key: "ai", label: "AI Analysis", icon: Brain },
          ].map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.key ? "bg-navy text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-navy"
              }`}>
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {/* ── TAB: OVERVIEW ── */}
        {activeTab === "overview" && (
          <div>
            {/* GDP Timeline */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-1">GDP Trends (2020–2024)</h2>
                  <p className="text-sm text-slate-500">Current USD billions — 8 MENA Countries</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald" />
                  <span className="text-xs text-slate-500 font-medium">Jordan highlighted</span>
                </div>
              </div>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={gdpTimeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gdpGradJo" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0F4C81" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#0F4C81" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#64748b", fontWeight: 500 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}B`} />
                    <Tooltip
                      contentStyle={{ borderRadius: "14px", border: "1px solid #e2e8f0", fontSize: "13px", boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
                      formatter={(value: number, name: string) => [`$${value.toLocaleString()}B`, name]}
                      labelStyle={{ fontWeight: 700, color: "#1e293b", marginBottom: "4px" }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} iconType="circle" iconSize={8} />
                    {countries.map((c, i) => (
                      c.id === "jo" ? (
                        <Area key={c.id} type="monotone" dataKey={c.id} name={c.name} stroke={COLORS[i]} strokeWidth={3} fill="url(#gdpGradJo)" dot={{ r: 5, fill: COLORS[i], strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 7, fill: COLORS[i], strokeWidth: 3, stroke: "#fff" }} />
                      ) : (
                        <Line key={c.id} type="monotone" dataKey={c.id} name={c.name} stroke={COLORS[i]} strokeWidth={1.5} dot={false} strokeOpacity={0.7} />
                      )
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Inflation Timeline */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-1">Inflation Trends (2020–2024)</h2>
                  <p className="text-sm text-slate-500">Consumer Price Index — Annual % Change</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="text-xs text-slate-500 font-medium">Jordan highlighted</span>
                </div>
              </div>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={inflationTimeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="infGradJo" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#E8913A" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#E8913A" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#64748b", fontWeight: 500 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                    <Tooltip
                      contentStyle={{ borderRadius: "14px", border: "1px solid #e2e8f0", fontSize: "13px", boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
                      formatter={(value: number, name: string) => [`${value}%`, name]}
                      labelStyle={{ fontWeight: 700, color: "#1e293b", marginBottom: "4px" }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} iconType="circle" iconSize={8} />
                    {countries.filter((c) => c.id !== "lb").map((c, i) => (
                      c.id === "jo" ? (
                        <Area key={c.id} type="monotone" dataKey={c.id} name={c.name} stroke="#E8913A" strokeWidth={3} fill="url(#infGradJo)" dot={{ r: 5, fill: "#E8913A", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 7, fill: "#E8913A", strokeWidth: 3, stroke: "#fff" }} />
                      ) : (
                        <Line key={c.id} type="monotone" dataKey={c.id} name={c.name} stroke={COLORS[i]} strokeWidth={1.5} dot={false} strokeOpacity={0.7} />
                      )
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-slate-400 mt-2 flex items-center gap-1"><ExternalLink className="w-3 h-3" /> Lebanon excluded from chart due to hyperinflation (171% in 2022)</p>
            </div>

            {/* Jordan Radar Chart */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-1">Jordan Performance Profile</h2>
              <p className="text-sm text-slate-500 mb-4">Normalized scores (0-100) vs MENA Average</p>
              <div className="h-96 flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={[
                    { subject: "GDP Growth", jordan: 75, mena: 70 },
                    { subject: "Per Capita", jordan: 45, mena: 65 },
                    { subject: "Renewables", jordan: 90, mena: 40 },
                    { subject: "Internet", jordan: 88, mena: 82 },
                    { subject: "HDI", jordan: 78, mena: 72 },
                    { subject: "Literacy", jordan: 98, mena: 88 },
                    { subject: "Life Exp.", jordan: 92, mena: 88 },
                    { subject: "Corruption", jordan: 55, mena: 42 },
                  ]}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#64748b" }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: "#94a3b8" }} />
                    <Radar name="Jordan" dataKey="jordan" stroke="#0F4C81" fill="#0F4C81" fillOpacity={0.2} strokeWidth={2} />
                    <Radar name="MENA Avg" dataKey="mena" stroke="#E8913A" fill="#E8913A" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 4" />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: 8-COUNTRY COMPARISON ── */}
        {activeTab === "comparison" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-1">8-Country MENA Comparison</h2>
            <p className="text-sm text-slate-500 mb-6">Click any indicator to rank countries. Jordan highlighted in blue.</p>
            <CountryComparisonTable />
          </div>
        )}

        {/* ── TAB: JORDAN INDICATORS ── */}
        {activeTab === "indicators" && (
          <div>
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button onClick={() => setActiveCategory("all")} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === "all" ? "bg-navy text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-navy"}`}>
                All Categories
              </button>
              {categories.map((cat) => {
                const Icon = categoryIcons[cat.id];
                return (
                  <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${activeCategory === cat.id ? "bg-navy text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-navy"}`}>
                    {Icon && <Icon className="w-4 h-4" />}{cat.nameEn}
                  </button>
                );
              })}
            </div>
            {/* Search */}
            <div className="mb-6">
              <input type="text" placeholder="Search indicators..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-md px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-navy focus:ring-1 focus:ring-navy/20" />
            </div>
            {/* Indicator Cards */}
            {(activeCategory === "all" ? categories : categories.filter((c) => c.id === activeCategory)).map((category) => {
              const catIndicators = getIndicatorsByCategory(category.id).filter((ind) => !searchQuery || ind.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) || ind.nameAr.includes(searchQuery));
              if (catIndicators.length === 0) return null;
              const Icon = categoryIcons[category.id];
              return (
                <div key={category.id} className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    {Icon && <Icon className="w-6 h-6 text-navy" />}
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">{category.nameEn}</h2>
                      <p className="text-sm text-slate-500">{category.descriptionEn}</p>
                    </div>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-6">
                    {catIndicators.map((indicator) => <IndicatorCard key={indicator.id} indicator={indicator} />)}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── TAB: AI ANALYSIS ── */}
        {activeTab === "ai" && (
          <div>
            {/* AI Indicators */}
            <div className="bg-navy rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-7 h-7 text-emerald" />
                <div>
                  <h2 className="text-2xl font-bold text-white">AI-Powered Analysis</h2>
                  <p className="text-sm text-slate-400">Smart indicator evaluation with benchmark comparison</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {aiIndicators.map((ind, i) => (
                  <motion.div key={ind.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <StatusBadge status={ind.status} />
                      {ind.trend === "up" ? <ArrowUpRight className="w-4 h-4 text-emerald" /> : ind.trend === "down" ? <ArrowDownRight className="w-4 h-4 text-red-400" /> : <Minus className="w-4 h-4 text-slate-400" />}
                    </div>
                    <div className="text-2xl font-bold text-white">{ind.value.toLocaleString()}</div>
                    <div className="text-sm text-slate-300 mt-1">{ind.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">Benchmark: {ind.benchmark.toLocaleString()}</div>
                    <div className="w-full h-2 bg-white/10 rounded-full mt-3 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{
                        width: `${Math.min((ind.value / ind.benchmark) * 100, 100)}%`,
                        backgroundColor: ind.status === "good" ? "#2D8B6F" : ind.status === "warning" ? "#E8913A" : "#C0392B",
                      }} />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">{ind.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Smart Insights */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-navy" />
                <h2 className="text-xl font-bold text-slate-800">Strategic Insights</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: TrendingUp, title: "Tourism-Driven Recovery", desc: "Travel receipts reached $5.3B in 2023, contributing to a 62.8% improvement in services surplus. Tourism is Jordan's primary growth engine post-COVID." },
                  { icon: Award, title: "Renewable Energy Leader", desc: "With 29% renewable electricity and 3,600 MW installed capacity, Jordan outperforms all MENA peers except Morocco. Target: 50% by 2030." },
                  { icon: TrendingDown, title: "Structural Unemployment Challenge", desc: "Youth unemployment at 43.6% is the highest in MENA. Skills mismatch between education outputs and labor market needs requires urgent reform." },
                  { icon: ShieldCheck, title: "Fiscal Consolidation Progress", desc: "Public debt declining from 91% to 88.5% of GDP. IMF EFF program and revenue mobilization efforts showing positive trajectory." },
                ].map((insight, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex gap-4">
                    <div className="w-10 h-10 bg-navy/10 rounded-lg flex items-center justify-center shrink-0">
                      <insight.icon className="w-5 h-5 text-navy" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-sm">{insight.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{insight.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ═══════ COMPARATIVE ANALYSIS (always visible) ═══════ */}
      <section className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8">Comparative Analysis</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">GDP Growth vs Inflation</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { year: 2020, growth: -1.6, inflation: 0.33 },
                    { year: 2021, growth: 2.2, inflation: 1.35 },
                    { year: 2022, growth: 2.4, inflation: 4.23 },
                    { year: 2023, growth: 2.7, inflation: 2.08 },
                    { year: 2024, growth: 2.5, inflation: 1.56 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="year" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} />
                    <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} />
                    <Tooltip contentStyle={{ background: "#1e293b", border: "none", borderRadius: "8px", color: "#fff" }} />
                    <Legend wrapperStyle={{ color: "#94a3b8" }} />
                    <Line type="monotone" dataKey="growth" name="GDP Growth (%)" stroke="#2D8B6F" strokeWidth={2} dot={{ fill: "#2D8B6F" }} />
                    <Line type="monotone" dataKey="inflation" name="Inflation (%)" stroke="#E8913A" strokeWidth={2} dot={{ fill: "#E8913A" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Trade Balance vs FDI</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { year: 2020, trade: -5557, fdi: 698 },
                    { year: 2021, trade: -6711, fdi: 641 },
                    { year: 2022, trade: -7585, fdi: 963 },
                    { year: 2023, trade: -4664, fdi: 843 },
                    { year: 2024, trade: -4200, fdi: 1635 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="year" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} />
                    <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} />
                    <Tooltip contentStyle={{ background: "#1e293b", border: "none", borderRadius: "8px", color: "#fff" }} />
                    <Legend wrapperStyle={{ color: "#94a3b8" }} />
                    <Line type="monotone" dataKey="trade" name="Trade Balance (M JOD)" stroke="#C0392B" strokeWidth={2} dot={{ fill: "#C0392B" }} />
                    <Line type="monotone" dataKey="fdi" name="FDI (M USD)" stroke="#2D8B6F" strokeWidth={2} dot={{ fill: "#2D8B6F" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Phosphate vs Potash</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ReBarChart data={[
                    { year: 2020, phosphate: 8938, potash: 1950 },
                    { year: 2021, phosphate: 10015, potash: 2100 },
                    { year: 2022, phosphate: 9600, potash: 2250 },
                    { year: 2023, phosphate: 9800, potash: 2400 },
                    { year: 2024, phosphate: 10200, potash: 2550 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="year" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} />
                    <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} />
                    <Tooltip contentStyle={{ background: "#1e293b", border: "none", borderRadius: "8px", color: "#fff" }} />
                    <Legend wrapperStyle={{ color: "#94a3b8" }} />
                    <Bar dataKey="phosphate" name="Phosphate (K Tonnes)" fill="#E8913A" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="potash" name="Potash (K Tonnes)" fill="#2D8B6F" radius={[4, 4, 0, 0]} />
                  </ReBarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">CO2 vs Renewable Capacity</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { year: 2020, co2: 24.1, renewable: 2000 },
                    { year: 2021, co2: 21.7, renewable: 2400 },
                    { year: 2022, co2: 23.3, renewable: 2800 },
                    { year: 2023, co2: 24.0, renewable: 3200 },
                    { year: 2024, co2: 24.1, renewable: 3600 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="year" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} />
                    <YAxis yAxisId="left" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} />
                    <Tooltip contentStyle={{ background: "#1e293b", border: "none", borderRadius: "8px", color: "#fff" }} />
                    <Legend wrapperStyle={{ color: "#94a3b8" }} />
                    <Line yAxisId="left" type="monotone" dataKey="co2" name="CO2 (Mt)" stroke="#C0392B" strokeWidth={2} dot={{ fill: "#C0392B" }} />
                    <Line yAxisId="right" type="monotone" dataKey="renewable" name="Renewable (MW)" stroke="#2D8B6F" strokeWidth={2} dot={{ fill: "#2D8B6F" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ REFERENCES ═══════ */}
      <section id="references-section" className="bg-white py-16 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-6 h-6 text-navy" />
            <h2 className="text-2xl font-bold text-slate-800">References & Citations</h2>
          </div>
          <p className="text-sm text-slate-500 mb-6">
            All data sourced from official government and international organizations. Citations follow APA 7th edition format.
          </p>
          {Array.from(new Set(references.map((r) => r.type))).map((type) => {
            const typeRefs = references.filter((r) => r.type === type);
            return (
              <div key={type} className="mb-6">
                <h3 className="text-sm font-bold text-navy uppercase tracking-wide mb-3">{type}</h3>
                <div className="space-y-2">
                  {typeRefs.map((ref) => (
                    <div key={ref.id} className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm">
                      <p className="text-slate-700 leading-relaxed">{ref.citation}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] bg-navy/10 text-navy px-2 py-0.5 rounded-full">{ref.type}</span>
                        <a href={ref.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-emerald flex items-center gap-1 hover:underline">
                          <ExternalLink className="w-3 h-3" /> Access Source
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <div className="bg-navy/5 border border-navy/20 rounded-xl p-6 mt-8">
            <h3 className="text-lg font-bold text-navy mb-3">How to Cite This Index</h3>
            <div className="bg-white rounded-lg p-4 font-mono text-xs text-slate-600 leading-relaxed border border-slate-200">
              Pioneers International. ({new Date().getFullYear()}). Pioneers Brand Index: Official Statistics
              <br />of the Hashemite Kingdom of Jordan (2020–2025). Amman, Jordan.
              <br />Retrieved from https://www.pioneersint.com/brand-index
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ DISCLAIMER ═══════ */}
      <section className="bg-slate-50 py-8 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Data Integrity Disclaimer</span>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl mx-auto leading-relaxed">
            All data presented is sourced from official government publications and internationally recognized databases.
            Figures may be subject to revision by originating institutions. This index is provided for research and educational purposes.
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}.
          </p>
        </div>
      </section>
    </div>
  );
}
