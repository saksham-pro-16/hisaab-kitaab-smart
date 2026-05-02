import { useState, useRef } from "react";
import { Camera, Upload, Sparkles, Check, X, Loader2 } from "lucide-react";
import Webcam from "react-webcam";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { products, billStore, BillItem } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Scan() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [items, setItems] = useState<BillItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleCapture = () => {
    if (webcamRef.current) {
      const src = webcamRef.current.getScreenshot();
      if (src) {
        setImageSrc(src);
        setIsCameraOpen(false);
        processImage(src);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImageSrc(base64);
        processImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (base64Str: string) => {
    setLoading(true);
    let text = "";

    const prompt = `You are a smart billing assistant for an Indian Kirana store. Read this bill image. It may contain English and Hindi text. Extract the items, quantities, and unit prices.
Try to match the extracted items to the closest sounding items in our inventory list below.

Inventory list:
${products.map(p => `${p.id}: ${p.name} (₹${p.price})`).join('\n')}

Return ONLY a valid JSON array of objects with these exact keys:
- productId (string): Match with inventory ID. If no match, use "new".
- name (string): The extracted name or matched inventory name.
- qty (number): The quantity.
- price (number): The unit price.

Important: Output NOTHING else but the raw JSON array. Do NOT wrap in markdown code blocks.`;

    const attemptProviders = async () => {
      const base64Data = base64Str.split(",")[1];
      const mimeType = base64Str.split(",")[0].split(":")[1].split(";")[0];

      // 1. Gemini
      try {
        const geminiApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
        if (!geminiApiKey) throw new Error("Gemini API key is missing.");
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent([
          prompt,
          { inlineData: { data: base64Data, mimeType } },
        ]);
        return result.response.text();
      } catch (e) {
        console.warn("Gemini failed, trying Groq...", e);
      }

      // 2. Groq
      try {
        const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
        if (!groqApiKey) throw new Error("Groq API key is missing.");
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: { "Authorization": `Bearer ${groqApiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "llama-3.2-11b-vision-preview",
            messages: [{ role: "user", content: [{ type: "text", text: prompt }, { type: "image_url", image_url: { url: base64Str } }] }],
            temperature: 0,
          })
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        return data.choices[0].message.content;
      } catch (e) {
        console.warn("Groq failed, trying OpenRouter...", e);
      }

      // 3. OpenRouter
      try {
        const openRouterApiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
        if (!openRouterApiKey) throw new Error("OpenRouter API key is missing.");
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: { "Authorization": `Bearer ${openRouterApiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash", 
            messages: [{ role: "user", content: [{ type: "text", text: prompt }, { type: "image_url", image_url: { url: base64Str } }] }],
            temperature: 0,
          })
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        return data.choices[0].message.content;
      } catch (e) {
        console.warn("OpenRouter failed, trying Mistral...", e);
      }

      // 4. Mistral
      try {
        const mistralApiKey = import.meta.env.VITE_MISTRAL_API_KEY;
        if (!mistralApiKey) throw new Error("Mistral API key is missing.");
        const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
          method: "POST",
          headers: { "Authorization": `Bearer ${mistralApiKey}`, "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            model: "pixtral-12b-2409",
            messages: [{ role: "user", content: [{ type: "text", text: prompt }, { type: "image_url", image_url: { url: base64Str } }] }],
            temperature: 0,
          })
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        return data.choices[0].message.content;
      } catch (e) {
        console.warn("Mistral failed", e);
      }

      throw new Error("All AI models (Gemini, Groq, OpenRouter, Mistral) failed to process the image.");
    };

    try {
      text = await attemptProviders();
    } catch (e: any) {
      console.error(e);
      toast.error(e.message);
      setLoading(false);
      setImageSrc(null);
      return;
    }

    try {
      const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      let parsed = [];
      try {
        parsed = JSON.parse(cleanText);
      } catch (e) {
        throw new Error("AI returned invalid data format. Please try again.");
      }

      const formattedItems: BillItem[] = parsed.map((item: any) => {
        const prod = products.find(p => p.id === item.productId);
        return {
          productId: prod?.id || "new-" + Math.random().toString(36).substr(2, 9),
          name: prod?.name || item.name || "Unknown Item",
          emoji: prod?.emoji || "📦",
          price: Number(item.price) || 0,
          qty: Number(item.qty) || 1,
        };
      });

      setItems(formattedItems);
      toast.success("Bill scanned successfully!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to process image data");
      setImageSrc(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBill = () => {
    if (items.length === 0) {
      toast.error("No items to save");
      return;
    }
    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const gst = subtotal * 0.05;
    const total = subtotal + gst;
    
    const id = `B-${Math.floor(1000 + Math.random() * 9000)}`;
    billStore.add({
      id,
      date: new Date().toISOString(),
      items,
      subtotal,
      gst,
      discount: 0,
      total,
    });
    
    toast.success("Bill created and saved successfully!");
    navigate("/billing");
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Scan Bill to Entry</h1>
        <p className="text-sm text-muted-foreground">Upload a bill photo or capture live — AI will read and create a billing entry.</p>
      </div>

      {!imageSrc && !isCameraOpen && !loading && (
        <div className="rounded-3xl border-2 border-dashed border-border bg-card p-10 text-center animate-scale-in">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-primary-soft text-primary grid place-items-center mb-4">
            <Camera className="h-8 w-8" />
          </div>
          <h2 className="font-semibold text-lg">Capture or upload bill</h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
            Take a clear photo of your bill. Our AI will extract products, quantity and price using Gemini Vision.
          </p>
          <div className="mt-6 flex gap-3 justify-center">
            <button 
              onClick={() => setIsCameraOpen(true)} 
              className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold text-sm shadow-glow hover:opacity-90 transition-smooth"
            >
              <Camera className="h-4 w-4" /> Open Camera
            </button>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
            />
            <button 
              onClick={() => fileInputRef.current?.click()} 
              className="inline-flex items-center gap-2 bg-muted px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-secondary transition-smooth"
            >
              <Upload className="h-4 w-4" /> Upload File
            </button>
          </div>
        </div>
      )}

      {isCameraOpen && (
        <div className="rounded-3xl border border-border/60 overflow-hidden bg-card shadow-elevated relative animate-scale-in">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "environment" }}
            className="w-full h-auto aspect-[4/3] object-cover"
          />
          <div className="absolute bottom-6 inset-x-0 flex justify-center gap-4">
            <button 
              onClick={() => setIsCameraOpen(false)} 
              className="bg-white/20 backdrop-blur text-white px-5 py-3 rounded-full font-bold text-sm hover:bg-white/30 transition-smooth border border-white/20"
            >
              Cancel
            </button>
            <button 
              onClick={handleCapture} 
              className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold shadow-glow hover:scale-105 transition-smooth"
            >
              Capture
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="rounded-3xl border border-border/60 bg-card p-12 text-center flex flex-col items-center justify-center animate-pulse">
          <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
          <h2 className="font-semibold text-lg">AI is reading your bill...</h2>
          <p className="text-sm text-muted-foreground mt-1">Extracting items, prices, and mapping to inventory.</p>
        </div>
      )}

      {imageSrc && !loading && (
        <div className="rounded-2xl bg-card border border-border/60 shadow-soft overflow-hidden animate-scale-in">
          <div className="p-4 bg-gradient-primary text-primary-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <p className="text-sm font-semibold">AI extracted {items.length} items — verify below</p>
          </div>
          
          <div className="p-4 bg-muted/30 border-b border-border flex justify-center">
             <img src={imageSrc} alt="Scanned Bill" className="h-32 object-contain rounded-xl border border-border/50 shadow-sm" />
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
                  placeholder="Qty"
                />
                <input
                  type="number"
                  value={it.price}
                  onChange={(e) => setItems((arr) => arr.map((x, i) => (i === idx ? { ...x, price: +e.target.value } : x)))}
                  className="col-span-3 px-3 py-2 rounded-lg bg-muted/50 outline-none focus:bg-card focus:border-primary border border-transparent text-sm tabular-nums text-right"
                  placeholder="Price"
                />
                <button onClick={() => setItems((arr) => arr.filter((_, i) => i !== idx))} className="col-span-1 grid place-items-center text-muted-foreground hover:text-alert transition-smooth">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            
            {items.length === 0 && (
              <div className="p-8 text-center text-sm text-muted-foreground">
                No items could be clearly extracted. Try scanning again.
              </div>
            )}
          </div>
          <div className="p-4 flex gap-2 bg-muted/30 border-t border-border">
            <button 
              onClick={() => { setImageSrc(null); setItems([]); }} 
              className="flex-1 py-2.5 rounded-xl bg-card border border-border font-semibold text-sm hover:bg-muted transition-smooth"
            >
              Scan Again
            </button>
            <button 
              onClick={handleSaveBill}
              disabled={items.length === 0}
              className="flex-[2] inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-success text-success-foreground font-semibold text-sm shadow-md hover:opacity-90 transition-smooth disabled:opacity-50"
            >
              <Check className="h-4 w-4" /> Save to Billing
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
