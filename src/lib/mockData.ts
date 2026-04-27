export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  unit: string;
  emoji: string;
};

export const products: Product[] = [
  { id: "p1", name: "Parle-G Biscuit", category: "Snacks", price: 10, stock: 48, minStock: 20, unit: "pkt", emoji: "🍪" },
  { id: "p2", name: "Amul Milk 500ml", category: "Dairy", price: 30, stock: 12, minStock: 25, unit: "pkt", emoji: "🥛" },
  { id: "p3", name: "Coca-Cola 750ml", category: "Beverages", price: 40, stock: 6, minStock: 15, unit: "btl", emoji: "🥤" },
  { id: "p4", name: "Lays Classic", category: "Snacks", price: 20, stock: 75, minStock: 30, unit: "pkt", emoji: "🥔" },
  { id: "p5", name: "Maggi 70g", category: "Grocery", price: 14, stock: 0, minStock: 20, unit: "pkt", emoji: "🍜" },
  { id: "p6", name: "Surf Excel 1kg", category: "Household", price: 165, stock: 22, minStock: 10, unit: "pkt", emoji: "🧺" },
  { id: "p7", name: "Colgate 100g", category: "Personal Care", price: 55, stock: 34, minStock: 15, unit: "pcs", emoji: "🪥" },
  { id: "p8", name: "Tata Salt 1kg", category: "Grocery", price: 28, stock: 9, minStock: 20, unit: "pkt", emoji: "🧂" },
  { id: "p9", name: "Britannia Bread", category: "Bakery", price: 45, stock: 18, minStock: 15, unit: "pkt", emoji: "🍞" },
  { id: "p10", name: "Dairy Milk 50g", category: "Snacks", price: 50, stock: 60, minStock: 25, unit: "pcs", emoji: "🍫" },
  { id: "p11", name: "Bingo Mad Angles", category: "Snacks", price: 20, stock: 40, minStock: 20, unit: "pkt", emoji: "🌶️" },
  { id: "p12", name: "Bisleri 1L", category: "Beverages", price: 20, stock: 88, minStock: 30, unit: "btl", emoji: "💧" },
  { id: "p13", name: "Kurkure Masala", category: "Snacks", price: 20, stock: 52, minStock: 25, unit: "pkt", emoji: "🌽" },
  { id: "p14", name: "Haldiram Bhujia", category: "Snacks", price: 60, stock: 28, minStock: 15, unit: "pkt", emoji: "🥜" },
  { id: "p15", name: "Good Day Cookies", category: "Snacks", price: 30, stock: 36, minStock: 20, unit: "pkt", emoji: "🍪" },
  { id: "p16", name: "Oreo Biscuits", category: "Snacks", price: 30, stock: 44, minStock: 20, unit: "pkt", emoji: "🍫" },
  { id: "p17", name: "Marie Gold", category: "Snacks", price: 25, stock: 30, minStock: 15, unit: "pkt", emoji: "🍪" },
  { id: "p18", name: "Amul Butter 100g", category: "Dairy", price: 56, stock: 18, minStock: 12, unit: "pkt", emoji: "🧈" },
  { id: "p19", name: "Amul Cheese Slice", category: "Dairy", price: 125, stock: 14, minStock: 10, unit: "pkt", emoji: "🧀" },
  { id: "p20", name: "Mother Dairy Curd 400g", category: "Dairy", price: 45, stock: 22, minStock: 15, unit: "pkt", emoji: "🥛" },
  { id: "p21", name: "Amul Lassi 200ml", category: "Dairy", price: 25, stock: 30, minStock: 20, unit: "btl", emoji: "🥤" },
  { id: "p22", name: "Pepsi 750ml", category: "Beverages", price: 40, stock: 24, minStock: 15, unit: "btl", emoji: "🥤" },
  { id: "p23", name: "Sprite 750ml", category: "Beverages", price: 40, stock: 26, minStock: 15, unit: "btl", emoji: "🥤" },
  { id: "p24", name: "Frooti 250ml", category: "Beverages", price: 20, stock: 50, minStock: 25, unit: "btl", emoji: "🥭" },
  { id: "p25", name: "Real Mixed Fruit 1L", category: "Beverages", price: 110, stock: 12, minStock: 8, unit: "btl", emoji: "🧃" },
  { id: "p26", name: "Red Bull 250ml", category: "Beverages", price: 125, stock: 18, minStock: 10, unit: "btl", emoji: "⚡" },
  { id: "p27", name: "Tata Tea Gold 500g", category: "Grocery", price: 280, stock: 16, minStock: 10, unit: "pkt", emoji: "🍵" },
  { id: "p28", name: "Bru Coffee 100g", category: "Grocery", price: 195, stock: 14, minStock: 8, unit: "btl", emoji: "☕" },
  { id: "p29", name: "Aashirvaad Atta 5kg", category: "Grocery", price: 285, stock: 20, minStock: 12, unit: "pkt", emoji: "🌾" },
  { id: "p30", name: "Fortune Sunflower Oil 1L", category: "Grocery", price: 165, stock: 18, minStock: 10, unit: "btl", emoji: "🛢️" },
  { id: "p31", name: "Daawat Basmati 1kg", category: "Grocery", price: 130, stock: 24, minStock: 12, unit: "pkt", emoji: "🍚" },
  { id: "p32", name: "Tata Sampann Dal 1kg", category: "Grocery", price: 145, stock: 22, minStock: 12, unit: "pkt", emoji: "🫘" },
  { id: "p33", name: "MDH Garam Masala", category: "Grocery", price: 85, stock: 30, minStock: 15, unit: "pkt", emoji: "🌶️" },
  { id: "p34", name: "Catch Black Pepper", category: "Grocery", price: 95, stock: 18, minStock: 10, unit: "pkt", emoji: "⚫" },
  { id: "p35", name: "Madhur Sugar 1kg", category: "Grocery", price: 48, stock: 26, minStock: 15, unit: "pkt", emoji: "🍬" },
  { id: "p36", name: "Saffola Honey 250g", category: "Grocery", price: 180, stock: 12, minStock: 8, unit: "btl", emoji: "🍯" },
  { id: "p37", name: "Kissan Mixed Fruit Jam", category: "Grocery", price: 130, stock: 16, minStock: 10, unit: "btl", emoji: "🍓" },
  { id: "p38", name: "Maggi Ketchup 1kg", category: "Grocery", price: 145, stock: 14, minStock: 8, unit: "btl", emoji: "🍅" },
  { id: "p39", name: "Vim Bar 200g", category: "Household", price: 20, stock: 60, minStock: 25, unit: "pcs", emoji: "🧼" },
  { id: "p40", name: "Harpic 500ml", category: "Household", price: 95, stock: 22, minStock: 12, unit: "btl", emoji: "🚽" },
  { id: "p41", name: "Lizol 500ml", category: "Household", price: 110, stock: 18, minStock: 10, unit: "btl", emoji: "🧴" },
  { id: "p42", name: "Good Knight Refill", category: "Household", price: 75, stock: 26, minStock: 15, unit: "pcs", emoji: "🦟" },
  { id: "p43", name: "Tide 1kg", category: "Household", price: 155, stock: 20, minStock: 10, unit: "pkt", emoji: "🧺" },
  { id: "p44", name: "Lifebuoy Soap", category: "Personal Care", price: 30, stock: 70, minStock: 30, unit: "pcs", emoji: "🧼" },
  { id: "p45", name: "Dove Soap 100g", category: "Personal Care", price: 65, stock: 38, minStock: 20, unit: "pcs", emoji: "🛁" },
  { id: "p46", name: "Head & Shoulders 180ml", category: "Personal Care", price: 195, stock: 16, minStock: 10, unit: "btl", emoji: "💆" },
  { id: "p47", name: "Clinic Plus 175ml", category: "Personal Care", price: 110, stock: 22, minStock: 12, unit: "btl", emoji: "🧴" },
  { id: "p48", name: "Pepsodent 150g", category: "Personal Care", price: 65, stock: 28, minStock: 15, unit: "pcs", emoji: "🪥" },
  { id: "p49", name: "Gillette Razor", category: "Personal Care", price: 145, stock: 14, minStock: 8, unit: "pcs", emoji: "🪒" },
  { id: "p50", name: "Nivea Cream 100ml", category: "Personal Care", price: 175, stock: 16, minStock: 10, unit: "btl", emoji: "🧴" },
  { id: "p51", name: "Whisper Pads 15s", category: "Personal Care", price: 95, stock: 24, minStock: 12, unit: "pkt", emoji: "🌸" },
  { id: "p52", name: "Pampers Diapers", category: "Personal Care", price: 299, stock: 12, minStock: 8, unit: "pkt", emoji: "👶" },
  { id: "p53", name: "Britannia Cake", category: "Bakery", price: 30, stock: 28, minStock: 15, unit: "pcs", emoji: "🧁" },
  { id: "p54", name: "Modern Brown Bread", category: "Bakery", price: 50, stock: 14, minStock: 10, unit: "pkt", emoji: "🍞" },
  { id: "p55", name: "Veeba Mayo 250g", category: "Grocery", price: 110, stock: 18, minStock: 10, unit: "btl", emoji: "🥪" },

  // ===== Electronics =====
  { id: "p56", name: "boAt Rockerz 450 Headphones", category: "Electronics", price: 1499, stock: 8, minStock: 5, unit: "pcs", emoji: "🎧" },
  { id: "p57", name: "Mi Power Bank 10000mAh", category: "Electronics", price: 999, stock: 14, minStock: 6, unit: "pcs", emoji: "🔋" },
  { id: "p58", name: "Realme Buds Wireless", category: "Electronics", price: 1799, stock: 6, minStock: 5, unit: "pcs", emoji: "🎧" },
  { id: "p59", name: "USB-C Cable 1m", category: "Electronics", price: 199, stock: 40, minStock: 20, unit: "pcs", emoji: "🔌" },
  { id: "p60", name: "Mobile Charger 20W", category: "Electronics", price: 599, stock: 18, minStock: 10, unit: "pcs", emoji: "⚡" },
  { id: "p61", name: "LED Bulb 9W Philips", category: "Electronics", price: 120, stock: 36, minStock: 20, unit: "pcs", emoji: "💡" },
  { id: "p62", name: "Extension Board 4-Plug", category: "Electronics", price: 449, stock: 10, minStock: 6, unit: "pcs", emoji: "🔌" },
  { id: "p63", name: "Duracell AA Battery 4pk", category: "Electronics", price: 180, stock: 28, minStock: 15, unit: "pkt", emoji: "🔋" },
  { id: "p64", name: "Bluetooth Speaker Mini", category: "Electronics", price: 899, stock: 9, minStock: 5, unit: "pcs", emoji: "🔊" },
  { id: "p65", name: "Smart Watch Fire-Boltt", category: "Electronics", price: 1599, stock: 5, minStock: 4, unit: "pcs", emoji: "⌚" },
  { id: "p66", name: "Earphones Wired boAt", category: "Electronics", price: 399, stock: 24, minStock: 12, unit: "pcs", emoji: "🎧" },
  { id: "p67", name: "Memory Card 32GB", category: "Electronics", price: 349, stock: 16, minStock: 8, unit: "pcs", emoji: "💾" },

  // ===== Clothing =====
  { id: "p68", name: "Men's Cotton T-Shirt", category: "Clothing", price: 349, stock: 22, minStock: 12, unit: "pcs", emoji: "👕" },
  { id: "p69", name: "Women's Kurti", category: "Clothing", price: 599, stock: 14, minStock: 8, unit: "pcs", emoji: "👗" },
  { id: "p70", name: "Kids Shorts", category: "Clothing", price: 249, stock: 18, minStock: 10, unit: "pcs", emoji: "🩳" },
  { id: "p71", name: "Men's Jeans", category: "Clothing", price: 899, stock: 10, minStock: 6, unit: "pcs", emoji: "👖" },
  { id: "p72", name: "Cotton Socks 3-pair", category: "Clothing", price: 199, stock: 30, minStock: 15, unit: "pkt", emoji: "🧦" },
  { id: "p73", name: "Bath Towel", category: "Clothing", price: 299, stock: 16, minStock: 8, unit: "pcs", emoji: "🛁" },
  { id: "p74", name: "Bedsheet Double", category: "Clothing", price: 749, stock: 8, minStock: 5, unit: "pcs", emoji: "🛏️" },
  { id: "p75", name: "School Uniform Shirt", category: "Clothing", price: 399, stock: 20, minStock: 10, unit: "pcs", emoji: "👔" },
  { id: "p76", name: "Saree Cotton Print", category: "Clothing", price: 1299, stock: 6, minStock: 4, unit: "pcs", emoji: "🥻" },
  { id: "p77", name: "Winter Cap Wool", category: "Clothing", price: 199, stock: 24, minStock: 12, unit: "pcs", emoji: "🧢" },
  { id: "p78", name: "Inner Vest Pack of 3", category: "Clothing", price: 299, stock: 18, minStock: 10, unit: "pkt", emoji: "👕" },
  { id: "p79", name: "Handkerchief Set", category: "Clothing", price: 99, stock: 40, minStock: 20, unit: "pkt", emoji: "🧻" },

  // ===== Toys =====
  { id: "p80", name: "Hot Wheels Car", category: "Toys", price: 149, stock: 28, minStock: 12, unit: "pcs", emoji: "🚗" },
  { id: "p81", name: "Lego Building Blocks", category: "Toys", price: 599, stock: 10, minStock: 6, unit: "pkt", emoji: "🧱" },
  { id: "p82", name: "Barbie Doll", category: "Toys", price: 799, stock: 8, minStock: 5, unit: "pcs", emoji: "👸" },
  { id: "p83", name: "Teddy Bear Medium", category: "Toys", price: 449, stock: 12, minStock: 6, unit: "pcs", emoji: "🧸" },
  { id: "p84", name: "Cricket Bat Plastic", category: "Toys", price: 249, stock: 16, minStock: 8, unit: "pcs", emoji: "🏏" },
  { id: "p85", name: "Football Size 5", category: "Toys", price: 399, stock: 10, minStock: 6, unit: "pcs", emoji: "⚽" },
  { id: "p86", name: "Carrom Board Mini", category: "Toys", price: 899, stock: 6, minStock: 4, unit: "pcs", emoji: "🎯" },
  { id: "p87", name: "Ludo Board Game", category: "Toys", price: 199, stock: 18, minStock: 10, unit: "pcs", emoji: "🎲" },
  { id: "p88", name: "Puzzle 100 Pieces", category: "Toys", price: 299, stock: 14, minStock: 8, unit: "pcs", emoji: "🧩" },
  { id: "p89", name: "Remote Control Car", category: "Toys", price: 1299, stock: 5, minStock: 3, unit: "pcs", emoji: "🚙" },
  { id: "p90", name: "Coloring Book Set", category: "Toys", price: 149, stock: 32, minStock: 15, unit: "pcs", emoji: "🎨" },
  { id: "p91", name: "Stuffed Unicorn", category: "Toys", price: 499, stock: 9, minStock: 5, unit: "pcs", emoji: "🦄" },
  { id: "p92", name: "Yo-Yo Pro", category: "Toys", price: 99, stock: 24, minStock: 12, unit: "pcs", emoji: "🪀" },
  { id: "p93", name: "Skipping Rope", category: "Toys", price: 149, stock: 20, minStock: 10, unit: "pcs", emoji: "🪢" },
  { id: "p94", name: "Magic Slate", category: "Toys", price: 179, stock: 22, minStock: 10, unit: "pcs", emoji: "📝" },

  // ===== Stationery / Misc =====
  { id: "p95", name: "Classmate Notebook", category: "Stationery", price: 60, stock: 50, minStock: 25, unit: "pcs", emoji: "📓" },
  { id: "p96", name: "Reynolds Pen 5pk", category: "Stationery", price: 50, stock: 40, minStock: 20, unit: "pkt", emoji: "🖊️" },
  { id: "p97", name: "Camlin Pencil Box", category: "Stationery", price: 199, stock: 18, minStock: 10, unit: "pcs", emoji: "✏️" },
  { id: "p98", name: "Geometry Box", category: "Stationery", price: 149, stock: 16, minStock: 8, unit: "pcs", emoji: "📐" },
  { id: "p99", name: "A4 Paper Ream", category: "Stationery", price: 320, stock: 12, minStock: 6, unit: "pkt", emoji: "📄" },
  { id: "p100", name: "Sticky Notes", category: "Stationery", price: 80, stock: 30, minStock: 15, unit: "pkt", emoji: "🗒️" },
  { id: "p101", name: "Glue Stick Fevistik", category: "Stationery", price: 35, stock: 44, minStock: 20, unit: "pcs", emoji: "🩹" },
  { id: "p102", name: "Stapler with Pins", category: "Stationery", price: 199, stock: 14, minStock: 8, unit: "pcs", emoji: "📎" },
];

// ===== Bills store (in-memory) =====
export type BillItem = { productId: string; name: string; emoji: string; price: number; qty: number };
export type Bill = {
  id: string;
  date: string; // ISO
  items: BillItem[];
  subtotal: number;
  gst: number;
  discount: number;
  total: number;
};

const initialBills: Bill[] = [
  {
    id: "B-1042",
    date: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    items: [
      { productId: "p1", name: "Parle-G Biscuit", emoji: "🍪", price: 10, qty: 4 },
      { productId: "p3", name: "Coca-Cola 750ml", emoji: "🥤", price: 40, qty: 2 },
    ],
    subtotal: 120, gst: 6, discount: 0, total: 126,
  },
  {
    id: "B-1041",
    date: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    items: [
      { productId: "p29", name: "Aashirvaad Atta 5kg", emoji: "🌾", price: 285, qty: 1 },
      { productId: "p30", name: "Fortune Sunflower Oil 1L", emoji: "🛢️", price: 165, qty: 1 },
      { productId: "p8", name: "Tata Salt 1kg", emoji: "🧂", price: 28, qty: 2 },
    ],
    subtotal: 506, gst: 25.3, discount: 10, total: 521.3,
  },
];

type Listener = () => void;
class BillStore {
  private bills: Bill[] = [...initialBills];
  private listeners = new Set<Listener>();
  getAll() { return this.bills; }
  add(bill: Bill) { this.bills = [bill, ...this.bills]; this.emit(); }
  subscribe(l: Listener) { this.listeners.add(l); return () => this.listeners.delete(l); }
  private emit() { this.listeners.forEach((l) => l()); }
}
export const billStore = new BillStore();

export type SalesPoint = { day: string; sales: number; profit: number };

export const salesData: SalesPoint[] = [
  { day: "Mon", sales: 4200, profit: 980 },
  { day: "Tue", sales: 5100, profit: 1240 },
  { day: "Wed", sales: 3800, profit: 820 },
  { day: "Thu", sales: 6200, profit: 1610 },
  { day: "Fri", sales: 7400, profit: 1980 },
  { day: "Sat", sales: 9100, profit: 2540 },
  { day: "Sun", sales: 8200, profit: 2210 },
];

export const predictionData = [
  { day: "W-3", actual: 220, predicted: null as number | null },
  { day: "W-2", actual: 260, predicted: null },
  { day: "W-1", actual: 245, predicted: null },
  { day: "Now", actual: 290, predicted: 290 },
  { day: "W+1", actual: null, predicted: 320 },
  { day: "W+2", actual: null, predicted: 360 },
  { day: "W+3", actual: null, predicted: 410 },
];

export const topProducts = [
  { name: "Coca-Cola", sold: 142 },
  { name: "Parle-G", sold: 128 },
  { name: "Lays", sold: 96 },
  { name: "Maggi", sold: 84 },
  { name: "Dairy Milk", sold: 71 },
];

export type Insight = {
  id: string;
  title: string;
  detail: string;
  priority: "Urgent" | "Important" | "Opportunity";
  icon: string;
};

export const insights: Insight[] = [
  {
    id: "i1",
    title: "Maggi is out of stock",
    detail: "You've lost ~₹420 in potential sales in the last 2 days. Reorder 30 packets.",
    priority: "Urgent",
    icon: "⚠️",
  },
  {
    id: "i2",
    title: "Cold drinks demand rising",
    detail: "Coca-Cola sales up 38% this week. Summer surge — stock 2x for next 10 days.",
    priority: "Opportunity",
    icon: "📈",
  },
  {
    id: "i3",
    title: "Sales dropped 15% on Wednesday",
    detail: "Footfall dipped midweek. Try a combo offer: Chips + Cold drink at ₹55.",
    priority: "Important",
    icon: "📊",
  },
  {
    id: "i4",
    title: "Dead stock detected",
    detail: "Surf Excel hasn't moved in 21 days. Consider a small discount to clear.",
    priority: "Important",
    icon: "🧊",
  },
  {
    id: "i5",
    title: "Combo suggestion",
    detail: "73% of customers buying Bread also buy Amul Milk. Bundle them at the counter.",
    priority: "Opportunity",
    icon: "🤝",
  },
];

export const trending = [
  { name: "Cold Drinks", change: "+38%", reason: "Summer season" },
  { name: "Ice Cream", change: "+52%", reason: "Hot weather nearby" },
  { name: "Mango Juice", change: "+24%", reason: "Seasonal demand" },
  { name: "Mosquito Coil", change: "+18%", reason: "Monsoon approaching" },
];
