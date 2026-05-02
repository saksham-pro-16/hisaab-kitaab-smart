const fs = require('fs');

const mockDataPath = 'src/lib/mockData.ts';
let mockDataContent = fs.readFileSync(mockDataPath, 'utf8');

const newSalesData = `export const salesData: SalesPoint[] = [
  { day: "Mon", sales: 4800, profit: 1120 },
  { day: "Tue", sales: 5300, profit: 1350 },
  { day: "Wed", sales: 4100, profit: 940 },
  { day: "Thu", sales: 6800, profit: 1780 },
  { day: "Fri", sales: 8100, profit: 2150 },
  { day: "Sat", sales: 9800, profit: 2840 },
  { day: "Sun", sales: 8900, profit: 2420 },
];`;

const newPredictionData = `export const predictionData = [
  { day: "W-3", actual: 240, predicted: null as number | null },
  { day: "W-2", actual: 280, predicted: null },
  { day: "W-1", actual: 265, predicted: null },
  { day: "Now", actual: 310, predicted: 310 },
  { day: "W+1", actual: null, predicted: 345 },
  { day: "W+2", actual: null, predicted: 380 },
  { day: "W+3", actual: null, predicted: 435 },
];`;

const newTopProducts = `export const topProducts = [
  { name: "Dairy Milk 50g", sold: 156 },
  { name: "Coca-Cola 750ml", sold: 148 },
  { name: "Maggi 70g", sold: 112 },
  { name: "Amul Lassi 200ml", sold: 98 },
  { name: "Haldiram Bhujia", sold: 82 },
];`;

const newInsights = `export const insights: Insight[] = [
  {
    id: "i1",
    title: "Maggi is out of stock",
    detail: "High volume of Maggi 70g noticed in recent bills. Restock at least 40 packets immediately.",
    priority: "Urgent",
    icon: "⚠️",
  },
  {
    id: "i2",
    title: "Dairy Milk 50g soaring",
    detail: "Based on the 30 processed bills, Dairy Milk 50g is the top seller. Increase stock buffer by 30%.",
    priority: "Opportunity",
    icon: "📈",
  },
  {
    id: "i3",
    title: "Weekend Sales Spike Predicted",
    detail: "Historical bill patterns indicate a 15% surge this coming weekend. Prepare extra stock for cold beverages.",
    priority: "Important",
    icon: "📊",
  },
  {
    id: "i4",
    title: "Slow moving: Surf Excel",
    detail: "Surf Excel 1kg appeared rarely in the latest batch of 30 bills. Consider a small discount to clear.",
    priority: "Important",
    icon: "🧊",
  },
  {
    id: "i5",
    title: "Combo suggestion: Beverages + Snacks",
    detail: "Coca-Cola 750ml is frequently bought with Haldiram Bhujia. Bundle them for a 5% discount to boost AOV.",
    priority: "Opportunity",
    icon: "🤝",
  },
];`;

const newTrending = `export const trending = [
  { name: "Chocolates", change: "+45%", reason: "Recent trend in new bills" },
  { name: "Cold Beverages", change: "+38%", reason: "Consistent high volume" },
  { name: "Quick Snacks", change: "+28%", reason: "Frequent pairing with drinks" },
  { name: "Stationery", change: "+12%", reason: "School reopening soon" },
];`;

mockDataContent = mockDataContent.replace(/export const salesData[\s\S]*?\];/, newSalesData);
mockDataContent = mockDataContent.replace(/export const predictionData[\s\S]*?\];/, newPredictionData);
mockDataContent = mockDataContent.replace(/export const topProducts[\s\S]*?\];/, newTopProducts);
mockDataContent = mockDataContent.replace(/export const insights[\s\S]*?\];/, newInsights);
mockDataContent = mockDataContent.replace(/export const trending[\s\S]*?\];/, newTrending);

fs.writeFileSync(mockDataPath, mockDataContent);
console.log('Insights and predictions updated.');
