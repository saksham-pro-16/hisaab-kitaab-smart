import { useMemo, useState } from "react";
import { products, Product } from "@/lib/mockData";
import { Search, Plus, Minus, Trash2, Receipt, Share2, Printer, Sparkles, ScanLine } from "lucide-react";
import { cn } from "@/lib/utils";

type CartItem = { product: Product; qty: number };

export default function Billing() {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([
    { product: products[0], qty: 2 },
    { product: products[3], qty: 1 },
  ]);
  const [discount, setDiscount] = useState(0);

  const filtered = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 8),
    [query],
  );

  const add = (p: Product) => {
    setCart((c) => {
      const found = c.find((i) => i.product.id === p.id);
      if (found) return c.map((i) => (i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { product: p, qty: 1 }];
    });
  };
  const update = (id: string, delta: number) =>
    setCart((c) =>
      c
        .map((i) => (i.product.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0),
    );
  const remove = (id: string) => setCart((c) => c.filter((i) => i.product.id !== id));

  const subtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const gst = subtotal * 0.05;
  const total = subtotal + gst - discount;

  const suggestion = cart.find((i) => i.product.category === "Beverages")
    ? products.find((p) => p.name.includes("Lays"))
    : cart.find((i) => i.product.category === "Snacks")
    ? products.find((p) => p.name.includes("Coca"))
    : products[9];

  return (
    <div className="grid lg:grid-cols-5 gap-4">
      {/* Product picker */}
      <div className="lg:col-span-3 space-y-4">
        <div className="rounded-2xl bg-card border border-border/60 p-4 shadow-soft">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search product or scan barcode…"
                className="w-full pl-9 pr-3 py-3 rounded-xl bg-muted/60 border border-transparent focus:bg-card focus:border-primary outline-none transition-smooth text-sm"
              />
            </div>
            <button className="px-3 rounded-xl bg-primary-soft text-primary grid place-items-center hover:bg-primary hover:text-primary-foreground transition-smooth">
              <ScanLine className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => add(p)}
              disabled={p.stock === 0}
              className={cn(
                "group rounded-2xl bg-card border border-border/60 p-3 text-left shadow-soft transition-smooth hover:-translate-y-0.5 hover:shadow-elevated hover:border-primary/30 disabled:opacity-50 disabled:cursor-not-allowed animate-fade-up",
              )}
            >
              <div className="text-3xl mb-1.5">{p.emoji}</div>
              <p className="text-xs font-semibold text-foreground line-clamp-2 leading-tight min-h-[2rem]">{p.name}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-bold text-primary">₹{p.price}</span>
                <span
                  className={cn(
                    "text-[10px] font-semibold px-1.5 py-0.5 rounded",
                    p.stock === 0
                      ? "bg-alert-soft text-alert"
                      : p.stock < p.minStock
                      ? "bg-warning-soft text-warning"
                      : "bg-success-soft text-success",
                  )}
                >
                  {p.stock === 0 ? "Out" : `${p.stock}`}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* AI suggestion */}
        {suggestion && cart.length > 0 && (
          <div className="rounded-2xl bg-gradient-primary p-4 text-primary-foreground shadow-glow animate-fade-up">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-semibold opacity-85 uppercase tracking-wider">AI Combo Suggestion</p>
                <p className="mt-1 text-sm">
                  Customers often buy <strong>{suggestion.name}</strong> with these. Add for ₹{suggestion.price}?
                </p>
              </div>
              <button
                onClick={() => add(suggestion)}
                className="bg-white text-primary px-3 py-1.5 rounded-lg text-xs font-bold hover:scale-105 transition-smooth shrink-0"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cart */}
      <div className="lg:col-span-2">
        <div className="rounded-2xl bg-card border border-border/60 shadow-soft sticky top-4 overflow-hidden">
          <div className="p-4 border-b border-border bg-gradient-card flex items-center gap-2">
            <Receipt className="h-4.5 w-4.5 text-primary" />
            <h2 className="font-semibold">Current Bill</h2>
            <span className="ml-auto text-xs text-muted-foreground">{cart.length} items</span>
          </div>

          <div className="max-h-[40vh] overflow-y-auto">
            {cart.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">
                <Receipt className="h-8 w-8 mx-auto mb-2 opacity-40" />
                Add products to start billing
              </div>
            ) : (
              cart.map((i) => (
                <div key={i.product.id} className="px-4 py-3 border-b border-border/50 last:border-0 flex items-center gap-3 animate-fade-up">
                  <div className="text-2xl">{i.product.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{i.product.name}</p>
                    <p className="text-xs text-muted-foreground">₹{i.product.price} × {i.qty}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
                    <button onClick={() => update(i.product.id, -1)} className="h-7 w-7 grid place-items-center rounded-md hover:bg-card transition-smooth">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm font-bold tabular-nums">{i.qty}</span>
                    <button onClick={() => update(i.product.id, 1)} className="h-7 w-7 grid place-items-center rounded-md hover:bg-card transition-smooth">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="text-sm font-bold text-foreground tabular-nums w-16 text-right">₹{i.product.price * i.qty}</p>
                  <button onClick={() => remove(i.product.id)} className="text-muted-foreground hover:text-alert transition-smooth">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="p-4 space-y-2 bg-muted/30 border-t border-border">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span><span className="tabular-nums">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>GST (5%)</span><span className="tabular-nums">₹{gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Discount</span>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                className="w-20 text-right px-2 py-1 rounded-md bg-card border border-border text-sm tabular-nums outline-none focus:border-primary"
              />
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
              <span>Total</span>
              <span className="text-primary tabular-nums">₹{total.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-4 grid grid-cols-3 gap-2">
            <button className="flex flex-col items-center gap-1 py-2.5 rounded-xl bg-muted hover:bg-secondary transition-smooth text-xs font-semibold">
              <Printer className="h-4 w-4" /> Print
            </button>
            <button className="flex flex-col items-center gap-1 py-2.5 rounded-xl bg-success-soft text-success hover:bg-success hover:text-success-foreground transition-smooth text-xs font-semibold">
              <Share2 className="h-4 w-4" /> WhatsApp
            </button>
            <button className="flex flex-col items-center gap-1 py-2.5 rounded-xl bg-gradient-primary text-primary-foreground hover:opacity-90 transition-smooth text-xs font-semibold shadow-glow">
              <Receipt className="h-4 w-4" /> Save Bill
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
