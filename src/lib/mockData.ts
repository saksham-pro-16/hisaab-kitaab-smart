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
];

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
