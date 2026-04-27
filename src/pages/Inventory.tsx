import { useState } from "react";
import { products } from "@/lib/mockData";
import { Search, Plus, Package, AlertTriangle, XCircle, CheckCircle2 } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { cn } from "@/lib/utils";

export default function Inventory() {
  const [q, setQ] = useState("");
  const filtered = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
  const lowCount = products.filter((p) => p.stock > 0 && p.stock < p.minStock).length;
  const outCount = products.filter((p) => p.stock === 0).length;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Inventory</h1>
          <p className="text-sm text-muted-foreground">Live stock levels across {products.length} products</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-4 py-2.5 rounded-xl font-semibold text-sm shadow-glow hover:opacity-90 transition-smooth">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Total Products" value={`${products.length}`} icon={Package} tone="primary" />
        <StatCard label="Healthy Stock" value={`${products.length - lowCount - outCount}`} icon={CheckCircle2} tone="success" />
        <StatCard label="Low Stock" value={`${lowCount}`} icon={AlertTriangle} tone="warning" />
        <StatCard label="Out of Stock" value={`${outCount}`} icon={XCircle} tone="alert" />
      </div>

      <div className="rounded-2xl bg-card border border-border/60 shadow-soft overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search inventory…"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-muted/60 border border-transparent focus:bg-card focus:border-primary outline-none transition-smooth text-sm"
            />
          </div>
        </div>

        <div className="divide-y divide-border/60">
          {filtered.map((p) => {
            const pct = Math.min(100, Math.round((p.stock / Math.max(p.minStock * 2, 1)) * 100));
            const status =
              p.stock === 0 ? "out" : p.stock < p.minStock ? "low" : "good";
            const barColor =
              status === "out" ? "bg-alert" : status === "low" ? "bg-warning" : "bg-success";
            const badge =
              status === "out"
                ? "bg-alert-soft text-alert"
                : status === "low"
                ? "bg-warning-soft text-warning"
                : "bg-success-soft text-success";
            return (
              <div key={p.id} className="p-4 flex items-center gap-4 hover:bg-muted/30 transition-smooth animate-fade-up">
                <div className="text-3xl shrink-0">{p.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-sm">{p.name}</p>
                    <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{p.category}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden max-w-xs">
                      <div className={cn("h-full rounded-full transition-all", barColor)} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {p.stock} / {p.minStock} {p.unit}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0 hidden sm:block">
                  <p className="text-sm font-bold text-foreground tabular-nums">₹{p.price}</p>
                  <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider", badge)}>
                    {status === "out" ? "Out" : status === "low" ? "Low" : "Good"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
