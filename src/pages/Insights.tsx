import { Link } from "react-router-dom";
import { InsightCard } from "@/components/InsightCard";
import { insights, trending } from "@/lib/mockData";
import { Sparkles, TrendingUp, Brain } from "lucide-react";

export default function Insights() {
  const grouped = {
    Urgent: insights.filter((i) => i.priority === "Urgent"),
    Important: insights.filter((i) => i.priority === "Important"),
    Opportunity: insights.filter((i) => i.priority === "Opportunity"),
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-gradient-hero p-6 md:p-8 text-primary-foreground shadow-glow relative overflow-hidden">
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-col md:flex-row md:items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-white/15 grid place-items-center backdrop-blur shrink-0">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold">AI Business Insights</h1>
            <p className="mt-1 opacity-85 text-sm md:text-base max-w-2xl">
              Smart recommendations from your sales, stock and local market trends — updated every hour.
            </p>
          </div>
          <Link
            to="/insights/predict"
            className="bg-white text-primary px-5 py-3 rounded-xl font-bold text-sm shadow-soft hover:scale-105 transition-smooth inline-flex items-center gap-2 shrink-0"
          >
            <Brain className="h-4 w-4" /> Predict Future Stock
          </Link>
        </div>
      </div>

      {(["Urgent", "Important", "Opportunity"] as const).map((key) =>
        grouped[key].length ? (
          <section key={key}>
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">{key}</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {grouped[key].map((i) => (
                <InsightCard key={i.id} insight={i} />
              ))}
            </div>
          </section>
        ) : null,
      )}

      <section className="rounded-2xl bg-card border border-border/60 p-5 shadow-soft">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4.5 w-4.5 text-primary" />
          <h2 className="font-semibold">Market Demand Insights</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {trending.map((t) => (
            <div key={t.name} className="rounded-xl border border-border/60 p-4 hover:border-primary/40 transition-smooth">
              <p className="text-xs text-muted-foreground">{t.reason}</p>
              <p className="mt-1 font-semibold">{t.name}</p>
              <p className="mt-2 text-success font-bold text-lg">{t.change}</p>
            </div>
          ))}
        </div>
      </section>

      {predictOpen && <PredictModal onClose={() => setPredictOpen(false)} />}
    </div>
  );
}

/* ---------------- Predict Future Stock Modal ---------------- */
function PredictModal({ onClose }: { onClose: () => void }) {
  // AI suggestions: low stock + trending categories
  const suggestions = useMemo(() => {
    const lowStock = products.filter((p) => p.stock < p.minStock);
    return lowStock.slice(0, 6).map((p) => ({
      product: p,
      reason: p.stock === 0 ? "Out of stock" : `Only ${p.stock} left, below min ${p.minStock}`,
      suggestedQty: Math.max(p.minStock * 2 - p.stock, p.minStock),
    }));
  }, []);

  const [reorder, setReorder] = useState<ReorderItem[]>([]);
  const [query, setQuery] = useState("");
  const [showCatalog, setShowCatalog] = useState(false);

  const filteredCatalog = useMemo(
    () =>
      products
        .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
        .filter((p) => !reorder.some((r) => r.product.id === p.id))
        .slice(0, 12),
    [query, reorder],
  );

  const addToReorder = (p: Product, qty: number) =>
    setReorder((r) => {
      if (r.some((i) => i.product.id === p.id)) return r;
      return [...r, { product: p, qty }];
    });
  const setQty = (id: string, qty: number) =>
    setReorder((r) =>
      r.map((i) => (i.product.id === id ? { ...i, qty: Math.max(0, qty) } : i)).filter((i) => i.qty > 0),
    );
  const remove = (id: string) => setReorder((r) => r.filter((i) => i.product.id !== id));

  const totalCost = reorder.reduce((s, i) => s + i.product.price * i.qty, 0);

  const placeOrder = () => {
    toast.success(`Reorder list created — ${reorder.length} products, est. ₹${totalCost.toFixed(0)}`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4 bg-foreground/40 backdrop-blur-sm animate-fade-up"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-card rounded-3xl shadow-elevated border border-border/60 overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 md:px-6 py-4 border-b border-border bg-gradient-hero text-primary-foreground flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/15 grid place-items-center">
            <Brain className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-lg">Predict Future Stock</h2>
            <p className="text-xs opacity-85">AI suggestions based on sales velocity, season & demand trends.</p>
          </div>
          <button onClick={onClose} className="h-9 w-9 grid place-items-center rounded-full hover:bg-white/15 transition-smooth">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 md:px-6 py-5 max-h-[65vh] overflow-y-auto space-y-5">
          {/* AI suggestions */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-sm">AI Predicted Reorders</h3>
              <span className="ml-auto text-xs text-muted-foreground">{suggestions.length} items</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {suggestions.map((s) => {
                const added = reorder.find((r) => r.product.id === s.product.id);
                return (
                  <div key={s.product.id} className="rounded-2xl border border-border/60 p-3 flex items-center gap-3 bg-card hover:border-primary/40 transition-smooth">
                    <div className="text-2xl">{s.product.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{s.product.name}</p>
                      <p className="text-[11px] text-muted-foreground">{s.reason}</p>
                      <p className="text-[11px] text-primary font-semibold mt-0.5">Suggested: {s.suggestedQty} {s.product.unit}</p>
                    </div>
                    {added ? (
                      <span className="text-xs font-bold text-success inline-flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" /> Added
                      </span>
                    ) : (
                      <button
                        onClick={() => addToReorder(s.product, s.suggestedQty)}
                        className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:scale-105 transition-smooth inline-flex items-center gap-1"
                      >
                        <Plus className="h-3.5 w-3.5" /> Add
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Add own products */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <ShoppingCart className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-sm">Add Products You Want to Reorder</h3>
              <button
                onClick={() => setShowCatalog((v) => !v)}
                className="ml-auto text-xs font-semibold text-primary hover:underline"
              >
                {showCatalog ? "Hide catalog" : "Browse 50+ products"}
              </button>
            </div>

            {showCatalog && (
              <div className="rounded-2xl border border-border/60 p-3 bg-muted/20 mb-3 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products to add…"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-card border border-border focus:border-primary outline-none text-sm transition-smooth"
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                  {filteredCatalog.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => addToReorder(p, p.minStock)}
                      className="flex items-center gap-2 p-2 rounded-xl bg-card border border-border/60 hover:border-primary/40 hover:-translate-y-0.5 transition-smooth text-left"
                    >
                      <span className="text-xl">{p.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate">{p.name}</p>
                        <p className="text-[10px] text-muted-foreground">₹{p.price} · {p.stock} left</p>
                      </div>
                      <Plus className="h-3.5 w-3.5 text-primary shrink-0" />
                    </button>
                  ))}
                  {filteredCatalog.length === 0 && (
                    <p className="col-span-full text-center text-xs text-muted-foreground py-6">
                      All matching products already added.
                    </p>
                  )}
                </div>
              </div>
            )}

            {reorder.length === 0 ? (
              <div className="rounded-xl bg-muted/40 p-6 text-center text-sm text-muted-foreground">
                No products in your reorder list yet. Add from AI suggestions above or browse the catalog.
              </div>
            ) : (
              <div className="space-y-2">
                {reorder.map((i) => (
                  <div key={i.product.id} className="rounded-xl border border-border/60 p-2.5 flex items-center gap-3 bg-card animate-fade-up">
                    <div className="text-xl">{i.product.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{i.product.name}</p>
                      <p className="text-[11px] text-muted-foreground">₹{i.product.price} / {i.product.unit}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
                      <button onClick={() => setQty(i.product.id, i.qty - 1)} className="h-7 w-7 grid place-items-center rounded-md hover:bg-card transition-smooth">
                        <Minus className="h-3 w-3" />
                      </button>
                      <input
                        type="number"
                        value={i.qty}
                        onChange={(e) => setQty(i.product.id, Number(e.target.value) || 0)}
                        className="w-12 text-center text-sm font-bold tabular-nums bg-transparent outline-none"
                      />
                      <button onClick={() => setQty(i.product.id, i.qty + 1)} className="h-7 w-7 grid place-items-center rounded-md hover:bg-card transition-smooth">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="text-sm font-bold tabular-nums w-20 text-right">₹{(i.product.price * i.qty).toFixed(2)}</p>
                    <button onClick={() => remove(i.product.id)} className="text-muted-foreground hover:text-alert transition-smooth">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="border-t border-border p-4 flex items-center gap-3 bg-card">
          <div className="flex-1">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Estimated Cost</p>
            <p className="text-xl font-bold text-primary tabular-nums">₹{totalCost.toFixed(2)}</p>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-muted hover:bg-secondary text-sm font-semibold transition-smooth"
          >
            Cancel
          </button>
          <button
            onClick={placeOrder}
            disabled={reorder.length === 0}
            className={cn(
              "px-5 py-2.5 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-bold shadow-glow inline-flex items-center gap-2 transition-smooth",
              reorder.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-105",
            )}
          >
            <CheckCircle2 className="h-4 w-4" /> Confirm Reorder
          </button>
        </div>
      </div>
    </div>
  );
}
