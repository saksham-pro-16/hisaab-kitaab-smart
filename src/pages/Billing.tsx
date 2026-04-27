import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { products, Product, billStore, Bill } from "@/lib/mockData";
import {
  Search, Plus, Minus, Trash2, Receipt, Share2, Printer, Sparkles,
  ScanLine, X, ShoppingBag, ArrowRight, ArrowLeft, CheckCircle2, FileText, Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type CartItem = { product: Product; qty: number };

function useBills() {
  return useSyncExternalStore(
    (cb) => billStore.subscribe(cb),
    () => billStore.getAll(),
    () => billStore.getAll(),
  );
}

export default function Billing() {
  const bills = useBills();
  const [wizardOpen, setWizardOpen] = useState(false);
  const [viewBill, setViewBill] = useState<Bill | null>(null);

  return (
    <div className="space-y-6">
      {/* Hero / CTA */}
      <div className="rounded-3xl bg-gradient-hero p-6 md:p-8 text-primary-foreground shadow-glow relative overflow-hidden">
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-col md:flex-row md:items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-white/15 grid place-items-center backdrop-blur shrink-0">
            <Receipt className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold">Smart Billing</h1>
            <p className="mt-1 opacity-85 text-sm md:text-base">
              Create a bill in seconds. Pick products, choose quantity — pricing is calculated automatically from your inventory.
            </p>
          </div>
          <button
            onClick={() => setWizardOpen(true)}
            className="bg-white text-primary px-5 py-3 rounded-xl font-bold text-sm shadow-soft hover:scale-105 transition-smooth inline-flex items-center gap-2 shrink-0"
          >
            <Plus className="h-4 w-4" /> Make a Bill
          </button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatBox label="Bills Today" value={bills.filter(b => isToday(b.date)).length.toString()} />
        <StatBox label="Today's Revenue" value={`₹${bills.filter(b => isToday(b.date)).reduce((s, b) => s + b.total, 0).toFixed(0)}`} />
        <StatBox label="Total Bills" value={bills.length.toString()} />
      </div>

      {/* Previous Bills */}
      <section className="rounded-2xl bg-card border border-border/60 shadow-soft overflow-hidden">
        <div className="p-4 md:p-5 border-b border-border bg-gradient-card flex items-center gap-2">
          <FileText className="h-4.5 w-4.5 text-primary" />
          <h2 className="font-semibold">Previous Bills</h2>
          <span className="ml-auto text-xs text-muted-foreground">{bills.length} total</span>
        </div>
        {bills.length === 0 ? (
          <div className="p-10 text-center text-sm text-muted-foreground">
            <Receipt className="h-10 w-10 mx-auto mb-3 opacity-40" />
            No bills yet. Click "Make a Bill" to create one.
          </div>
        ) : (
          <div className="divide-y divide-border/60">
            {bills.map((b) => (
              <button
                key={b.id}
                onClick={() => setViewBill(b)}
                className="w-full p-4 flex items-center gap-4 hover:bg-muted/40 transition-smooth text-left animate-fade-up"
              >
                <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary grid place-items-center text-lg shrink-0">
                  🧾
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-sm">{b.id}</p>
                    <span className="text-[10px] text-muted-foreground">•</span>
                    <p className="text-xs text-muted-foreground">{formatDate(b.date)}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {b.items.length} items — {b.items.slice(0, 2).map(i => i.name).join(", ")}
                    {b.items.length > 2 ? `…` : ""}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-primary tabular-nums">₹{b.total.toFixed(2)}</p>
                  <p className="text-[10px] text-muted-foreground inline-flex items-center gap-1 justify-end">
                    View <Eye className="h-3 w-3" />
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {wizardOpen && <BillWizard onClose={() => setWizardOpen(false)} />}
      {viewBill && <BillDetails bill={viewBill} onClose={() => setViewBill(null)} />}
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-card border border-border/60 p-4 shadow-soft">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</p>
      <p className="mt-1 text-xl md:text-2xl font-bold text-foreground tabular-nums">{value}</p>
    </div>
  );
}

function isToday(iso: string) {
  const d = new Date(iso);
  const t = new Date();
  return d.toDateString() === t.toDateString();
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

/* ---------------- Wizard: Make a Bill ---------------- */
function BillWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
    [],
  );

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (category === "All" || p.category === category) &&
          p.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [query, category],
  );

  const add = (p: Product) =>
    setCart((c) => {
      const f = c.find((i) => i.product.id === p.id);
      if (f) return c.map((i) => (i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { product: p, qty: 1 }];
    });
  const setQty = (id: string, qty: number) =>
    setCart((c) =>
      c.map((i) => (i.product.id === id ? { ...i, qty: Math.max(0, qty) } : i)).filter((i) => i.qty > 0),
    );
  const remove = (id: string) => setCart((c) => c.filter((i) => i.product.id !== id));

  const subtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const gst = subtotal * 0.05;
  const total = Math.max(0, subtotal + gst - discount);

  const save = () => {
    const id = `B-${Math.floor(1000 + Math.random() * 9000)}`;
    billStore.add({
      id,
      date: new Date().toISOString(),
      items: cart.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        emoji: i.product.emoji,
        price: i.product.price,
        qty: i.qty,
      })),
      subtotal, gst, discount, total,
    });
    toast.success(`Bill ${id} saved to Previous Bills`);
    onClose();
  };

  return (
    <Modal onClose={onClose} title="Make a Bill" maxWidth="max-w-4xl">
      {/* Stepper */}
      <div className="px-5 md:px-6 pt-4">
        <div className="flex items-center gap-2 text-xs">
          {[
            { n: 1, label: "Add Products" },
            { n: 2, label: "Set Quantity" },
            { n: 3, label: "Review & Save" },
          ].map((s, idx) => (
            <div key={s.n} className="flex items-center gap-2 flex-1">
              <div
                className={cn(
                  "h-7 w-7 rounded-full grid place-items-center font-bold text-[11px] shrink-0",
                  step >= (s.n as 1 | 2 | 3)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {s.n}
              </div>
              <span className={cn("font-semibold hidden sm:inline", step >= s.n ? "text-foreground" : "text-muted-foreground")}>
                {s.label}
              </span>
              {idx < 2 && <div className={cn("h-0.5 flex-1 rounded", step > s.n ? "bg-primary" : "bg-muted")} />}
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 md:px-6 py-5 max-h-[65vh] overflow-y-auto">
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search 50+ products…"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-muted/60 border border-transparent focus:bg-card focus:border-primary outline-none text-sm transition-smooth"
                />
              </div>
              <button className="px-3 rounded-xl bg-primary-soft text-primary grid place-items-center hover:bg-primary hover:text-primary-foreground transition-smooth">
                <ScanLine className="h-5 w-5" />
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-smooth border",
                    category === c
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-muted-foreground border-border hover:border-primary/40",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filtered.map((p) => {
                const inCart = cart.find((i) => i.product.id === p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => add(p)}
                    disabled={p.stock === 0}
                    className={cn(
                      "relative rounded-2xl bg-card border p-3 text-left shadow-soft transition-smooth hover:-translate-y-0.5 hover:shadow-elevated disabled:opacity-50 disabled:cursor-not-allowed",
                      inCart ? "border-primary ring-2 ring-primary/20" : "border-border/60 hover:border-primary/30",
                    )}
                  >
                    {inCart && (
                      <span className="absolute top-2 right-2 h-5 min-w-5 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold grid place-items-center">
                        {inCart.qty}
                      </span>
                    )}
                    <div className="text-3xl mb-1.5">{p.emoji}</div>
                    <p className="text-xs font-semibold line-clamp-2 leading-tight min-h-[2rem]">{p.name}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-bold text-primary">₹{p.price}</span>
                      <span
                        className={cn(
                          "text-[10px] font-semibold px-1.5 py-0.5 rounded",
                          p.stock === 0 ? "bg-alert-soft text-alert" : p.stock < p.minStock ? "bg-warning-soft text-warning" : "bg-success-soft text-success",
                        )}
                      >
                        {p.stock === 0 ? "Out" : `${p.stock} left`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            {filtered.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-8">No products match your search.</p>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Adjust quantity for each item. Stock availability is checked from your inventory.
            </p>
            {cart.length === 0 ? (
              <div className="rounded-xl bg-muted/40 p-8 text-center text-sm text-muted-foreground">
                No products added yet. Go back to step 1.
              </div>
            ) : (
              cart.map((i) => {
                const overstock = i.qty > i.product.stock;
                return (
                  <div key={i.product.id} className="rounded-2xl border border-border/60 p-3 flex items-center gap-3 bg-card">
                    <div className="text-2xl">{i.product.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{i.product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        ₹{i.product.price} / {i.product.unit} · {i.product.stock} in stock
                      </p>
                      {overstock && (
                        <p className="text-[11px] text-alert font-semibold mt-0.5">
                          ⚠ Only {i.product.stock} available
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
                      <button onClick={() => setQty(i.product.id, i.qty - 1)} className="h-8 w-8 grid place-items-center rounded-md hover:bg-card transition-smooth">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <input
                        type="number"
                        value={i.qty}
                        onChange={(e) => setQty(i.product.id, Number(e.target.value) || 0)}
                        className="w-12 text-center text-sm font-bold tabular-nums bg-transparent outline-none"
                      />
                      <button onClick={() => setQty(i.product.id, i.qty + 1)} className="h-8 w-8 grid place-items-center rounded-md hover:bg-card transition-smooth">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="text-sm font-bold tabular-nums w-20 text-right">₹{(i.product.price * i.qty).toFixed(2)}</p>
                    <button onClick={() => remove(i.product.id)} className="text-muted-foreground hover:text-alert transition-smooth">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-border/60 overflow-hidden">
              <div className="p-3 bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Bill Preview
              </div>
              {cart.map((i) => (
                <div key={i.product.id} className="px-4 py-2.5 border-t border-border/60 flex items-center gap-3 text-sm">
                  <span className="text-xl">{i.product.emoji}</span>
                  <span className="flex-1 truncate">{i.product.name}</span>
                  <span className="text-muted-foreground tabular-nums">₹{i.product.price} × {i.qty}</span>
                  <span className="font-semibold tabular-nums w-20 text-right">₹{(i.product.price * i.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-muted/30 p-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span><span className="tabular-nums">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>GST (5%)</span><span className="tabular-nums">₹{gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Discount</span>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                  className="w-24 text-right px-2 py-1 rounded-md bg-card border border-border text-sm tabular-nums outline-none focus:border-primary"
                />
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                <span>Total</span><span className="text-primary tabular-nums">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer nav */}
      <div className="border-t border-border p-4 flex items-center gap-2 bg-card">
        <div className="text-xs text-muted-foreground mr-auto">
          {cart.length > 0 && (
            <>
              <ShoppingBag className="h-3.5 w-3.5 inline mr-1" />
              {cart.length} items · <span className="font-semibold text-foreground tabular-nums">₹{total.toFixed(2)}</span>
            </>
          )}
        </div>
        {step > 1 && (
          <button
            onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
            className="px-4 py-2 rounded-xl bg-muted hover:bg-secondary text-sm font-semibold inline-flex items-center gap-1 transition-smooth"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        )}
        {step < 3 ? (
          <button
            onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3)}
            disabled={cart.length === 0}
            className="px-4 py-2 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-bold inline-flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed shadow-glow transition-smooth"
          >
            Next <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={save}
            disabled={cart.length === 0}
            className="px-4 py-2 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-bold inline-flex items-center gap-1 disabled:opacity-50 shadow-glow transition-smooth"
          >
            <CheckCircle2 className="h-4 w-4" /> Save Bill
          </button>
        )}
      </div>
    </Modal>
  );
}

/* ---------------- Bill Details Modal ---------------- */
function BillDetails({ bill, onClose }: { bill: Bill; onClose: () => void }) {
  return (
    <Modal onClose={onClose} title={`Bill ${bill.id}`} maxWidth="max-w-md">
      <div className="px-5 py-4 space-y-3">
        <p className="text-xs text-muted-foreground">{formatDate(bill.date)}</p>
        <div className="rounded-2xl border border-border/60 overflow-hidden">
          {bill.items.map((i) => (
            <div key={i.productId} className="px-3 py-2.5 border-b border-border/60 last:border-0 flex items-center gap-3 text-sm">
              <span className="text-xl">{i.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{i.name}</p>
                <p className="text-xs text-muted-foreground">₹{i.price} × {i.qty}</p>
              </div>
              <p className="font-semibold tabular-nums">₹{(i.price * i.qty).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-muted/30 p-4 space-y-1.5 text-sm">
          <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span className="tabular-nums">₹{bill.subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-muted-foreground"><span>GST</span><span className="tabular-nums">₹{bill.gst.toFixed(2)}</span></div>
          {bill.discount > 0 && <div className="flex justify-between text-muted-foreground"><span>Discount</span><span className="tabular-nums">-₹{bill.discount.toFixed(2)}</span></div>}
          <div className="flex justify-between text-base font-bold pt-2 border-t border-border"><span>Total</span><span className="text-primary tabular-nums">₹{bill.total.toFixed(2)}</span></div>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button className="flex items-center justify-center gap-1 py-2.5 rounded-xl bg-muted hover:bg-secondary text-xs font-semibold transition-smooth">
            <Printer className="h-4 w-4" /> Print
          </button>
          <button className="flex items-center justify-center gap-1 py-2.5 rounded-xl bg-success-soft text-success hover:bg-success hover:text-success-foreground text-xs font-semibold transition-smooth">
            <Share2 className="h-4 w-4" /> WhatsApp
          </button>
          <button className="flex items-center justify-center gap-1 py-2.5 rounded-xl bg-gradient-primary text-primary-foreground text-xs font-semibold shadow-glow transition-smooth">
            <Sparkles className="h-4 w-4" /> AI Insight
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ---------------- Modal shell ---------------- */
function Modal({
  children, onClose, title, maxWidth = "max-w-lg",
}: { children: React.ReactNode; onClose: () => void; title: string; maxWidth?: string }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-foreground/40 backdrop-blur-sm animate-fade-up" onClick={onClose}>
      <div
        className={cn("w-full bg-card rounded-3xl shadow-elevated border border-border/60 overflow-hidden animate-scale-in", maxWidth)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-5 md:px-6 py-4 border-b border-border">
          <h2 className="font-bold text-lg flex-1">{title}</h2>
          <button onClick={onClose} className="h-9 w-9 grid place-items-center rounded-full hover:bg-muted transition-smooth">
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
