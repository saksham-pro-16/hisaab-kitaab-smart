import { useState } from "react";
import { Camera, Upload, Sparkles, Check, X } from "lucide-react";

const sampleExtract = [
  { name: "Parle-G Biscuit", qty: 12, price: 10 },
  { name: "Amul Milk 500ml", qty: 6, price: 30 },
  { name: "Tata Salt 1kg", qty: 4, price: 28 },
  { name: "Maggi 70g", qty: 20, price: 14 },
];

export default function Scan() {
  const [scanned, setScanned] = useState(false);
  const [items, setItems] = useState(sampleExtract);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Scan Paper Bill</h1>
        <p className="text-sm text-muted-foreground">Upload a supplier bill — AI will read and add to inventory.</p>
      </div>

      {!scanned ? (
        <div className="rounded-3xl border-2 border-dashed border-border bg-card p-10 text-center">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-primary-soft text-primary grid place-items-center mb-4">
            <Camera className="h-8 w-8" />
          </div>
          <h2 className="font-semibold text-lg">Capture or upload bill</h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
            Take a clear photo of your supplier bill. Our AI will extract products, quantity and price.
          </p>
          <div className="mt-6 flex gap-3 justify-center">
            <button onClick={() => setScanned(true)} className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold text-sm shadow-glow hover:opacity-90 transition-smooth">
              <Camera className="h-4 w-4" /> Click Photo
            </button>
            <button onClick={() => setScanned(true)} className="inline-flex items-center gap-2 bg-muted px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-secondary transition-smooth">
              <Upload className="h-4 w-4" /> Upload File
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-card border border-border/60 shadow-soft overflow-hidden animate-scale-in">
          <div className="p-4 bg-gradient-primary text-primary-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <p className="text-sm font-semibold">AI extracted {items.length} items — verify below</p>
          </div>
          <div className="divide-y divide-border/60">
            {items.map((it, idx) => (
              <div key={idx} className="p-3 grid grid-cols-12 gap-2 items-center">
                <input
                  value={it.name}
                  onChange={(e) => setItems((arr) => arr.map((x, i) => (i === idx ? { ...x, name: e.target.value } : x)))}
                  className="col-span-6 px-3 py-2 rounded-lg bg-muted/50 outline-none focus:bg-card focus:border-primary border border-transparent text-sm"
                />
                <input
                  type="number"
                  value={it.qty}
                  onChange={(e) => setItems((arr) => arr.map((x, i) => (i === idx ? { ...x, qty: +e.target.value } : x)))}
                  className="col-span-2 px-3 py-2 rounded-lg bg-muted/50 outline-none focus:bg-card focus:border-primary border border-transparent text-sm tabular-nums text-right"
                />
                <input
                  type="number"
                  value={it.price}
                  onChange={(e) => setItems((arr) => arr.map((x, i) => (i === idx ? { ...x, price: +e.target.value } : x)))}
                  className="col-span-3 px-3 py-2 rounded-lg bg-muted/50 outline-none focus:bg-card focus:border-primary border border-transparent text-sm tabular-nums text-right"
                />
                <button onClick={() => setItems((arr) => arr.filter((_, i) => i !== idx))} className="col-span-1 grid place-items-center text-muted-foreground hover:text-alert transition-smooth">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="p-4 flex gap-2 bg-muted/30 border-t border-border">
            <button onClick={() => setScanned(false)} className="flex-1 py-2.5 rounded-xl bg-card border border-border font-semibold text-sm hover:bg-muted transition-smooth">
              Scan Again
            </button>
            <button className="flex-[2] inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-success text-success-foreground font-semibold text-sm shadow-md hover:opacity-90 transition-smooth">
              <Check className="h-4 w-4" /> Add {items.length} items to Inventory
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
