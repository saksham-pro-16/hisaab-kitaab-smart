import { StatCard } from "@/components/StatCard";
import { InsightCard } from "@/components/InsightCard";
import { insights, salesData, topProducts, trending, predictionData } from "@/lib/mockData";
import { IndianRupee, ShoppingCart, Package, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartTooltip = {
  contentStyle: {
    background: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: 12,
    boxShadow: "var(--shadow-md)",
    fontSize: 12,
  },
  cursor: { fill: "hsl(var(--primary-soft))" },
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Hero greeting */}
      <section className="rounded-3xl bg-gradient-hero p-6 md:p-8 text-primary-foreground shadow-glow relative overflow-hidden animate-scale-in">
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -right-6 bottom-0 h-32 w-32 rounded-full bg-white/5 blur-xl" />
        <div className="relative">
          <p className="text-xs font-semibold opacity-80 uppercase tracking-wider">Good morning, Raju Bhai 👋</p>
          <h1 className="mt-2 text-2xl md:text-4xl font-bold leading-tight">
            Aaj ka business <span className="opacity-80">— ek nazar mein</span>
          </h1>
          <p className="mt-2 text-sm md:text-base opacity-85 max-w-xl">
            Sab kuch sahi chal raha hai. Aapki sales pichle hafte se 18% zyada hain.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button className="bg-white text-primary px-4 py-2 rounded-xl text-sm font-semibold hover:scale-105 transition-smooth shadow-md">
              Start Billing
            </button>
            <button className="bg-white/15 backdrop-blur text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-white/25 transition-smooth border border-white/20">
              View Insights
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard label="Today's Sales" value="₹8,420" delta="+18% vs yesterday" trend="up" icon={IndianRupee} tone="primary" />
        <StatCard label="Bills Today" value="42" delta="+6 bills" trend="up" icon={ShoppingCart} tone="success" />
        <StatCard label="Low Stock" value="4" delta="Reorder soon" trend="down" icon={Package} tone="alert" />
        <StatCard label="Profit (Week)" value="₹11,380" delta="+12.4%" trend="up" icon={TrendingUp} tone="success" />
      </section>

      {/* Charts row */}
      <section className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl bg-card border border-border/60 p-5 shadow-soft animate-fade-up">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="font-semibold text-foreground">Sales this week</h2>
              <p className="text-xs text-muted-foreground">Daily revenue & profit</p>
            </div>
            <span className="text-xs font-semibold text-success bg-success-soft px-2.5 py-1 rounded-full">+18.2%</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip {...chartTooltip} />
                <Area type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#salesGrad)" />
                <Line type="monotone" dataKey="profit" stroke="hsl(var(--success))" strokeWidth={2.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border/60 p-5 shadow-soft animate-fade-up">
          <h2 className="font-semibold text-foreground">Top Products</h2>
          <p className="text-xs text-muted-foreground">This week</p>
          <div className="h-64 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical" margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} width={75} />
                <Tooltip {...chartTooltip} />
                <Bar dataKey="sold" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* AI Insights */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4.5 w-4.5 text-primary" />
            <h2 className="font-semibold text-foreground">AI Business Insights</h2>
          </div>
          <a href="/insights" className="text-sm font-semibold text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {insights.slice(0, 4).map((i) => (
            <InsightCard key={i.id} insight={i} />
          ))}
        </div>
      </section>

      {/* Prediction + Trending */}
      <section className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-card border border-border/60 p-5 shadow-soft animate-fade-up">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-semibold text-foreground">Stock Prediction · Coca-Cola</h2>
              <p className="text-xs text-muted-foreground">Next 3 weeks (AI forecast)</p>
            </div>
            <span className="text-xs font-semibold text-alert bg-alert-soft px-2.5 py-1 rounded-full">Out in 4 days</span>
          </div>
          <div className="h-56 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={predictionData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip {...chartTooltip} />
                <Line type="monotone" dataKey="actual" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 3 }} name="Actual" />
                <Line type="monotone" dataKey="predicted" stroke="hsl(var(--alert))" strokeWidth={2.5} strokeDasharray="5 5" dot={{ r: 3 }} name="Predicted" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 p-3 rounded-xl bg-primary-soft text-primary text-sm font-medium">
            💡 Suggested reorder: <strong>48 bottles</strong> by Friday
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border/60 p-5 shadow-soft animate-fade-up">
          <h2 className="font-semibold text-foreground">Trending in your area</h2>
          <p className="text-xs text-muted-foreground">Market demand intelligence</p>
          <div className="mt-3 space-y-2">
            {trending.map((t) => (
              <div key={t.name} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-smooth">
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.reason}</p>
                </div>
                <span className="text-sm font-bold text-success bg-success-soft px-2.5 py-1 rounded-lg">{t.change}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
