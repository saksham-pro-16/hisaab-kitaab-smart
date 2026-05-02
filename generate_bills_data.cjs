const fs = require('fs');
const xlsx = require('xlsx');

// 1. Load products from mockData.ts
const mockDataPath = 'src/lib/mockData.ts';
const mockDataContent = fs.readFileSync(mockDataPath, 'utf8');
const productsMatch = mockDataContent.match(/export const products: Product\[\] = \[([\s\S]*?)\];/);
const products = [];
if (productsMatch) {
  const lines = productsMatch[1].split('\n');
  for (const line of lines) {
    const mId = line.match(/id:\s*"([^"]+)"/);
    const mName = line.match(/name:\s*"([^"]+)"/);
    const mEmoji = line.match(/emoji:\s*"([^"]+)"/);
    if (mId && mName && mEmoji) {
      products.push({ id: mId[1], name: mName[1], emoji: mEmoji[1] });
    }
  }
}
const productMap = {};
products.forEach(p => { productMap[p.name.toLowerCase().trim()] = p; });

// 2. Read Bills
const workbook = xlsx.readFile('retail_sales_bills.xlsx');
const newBills = [];

for (let i = 1; i <= 30; i++) {
  const sheetName = `Bill ${i}`;
  if (!workbook.Sheets[sheetName]) continue;
  
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet, {header: 1});
  
  let billId = `BILL-${i}`;
  let dateStr = new Date().toISOString();
  let items = [];
  let subtotal = 0;
  let discount = 0;
  let netTotal = 0;
  let inItems = false;
  
  for (const row of data) {
    if (!row || row.length === 0) continue;
    
    if (row[0] === 'Bill No:') billId = row[1];
    if (row[0] === 'Date:') {
      // row[1] format: DD-MM-YYYY
      const parts = row[1].split('-');
      if (parts.length === 3) {
        dateStr = new Date(`${parts[2]}-${parts[1]}-${parts[0]}T12:00:00Z`).toISOString();
      }
    }
    
    if (row[0] === 'Product') {
      inItems = true;
      continue;
    }
    
    if (inItems) {
      if (!row[0] || String(row[1]).includes('Subtotal')) {
        inItems = false;
      } else {
        const pName = row[0];
        const pPrice = row[1] || 0;
        const pQty = row[2] || 1;
        
        const mappedP = productMap[pName.toLowerCase().trim()] || { id: "p0", emoji: "📦" };
        items.push({
          productId: mappedP.id,
          name: pName,
          emoji: mappedP.emoji,
          price: pPrice,
          qty: pQty
        });
      }
    }
    
    if (row[1] === 'Subtotal') subtotal = row[3];
    if (row[1] === 'Discount') discount = row[3];
    if (row[1] === 'NET TOTAL') netTotal = row[3];
  }
  
  // Calculate gst as 5% of subtotal if missing, but we'll just derive it roughly
  const gst = netTotal - subtotal + Math.abs(discount);
  
  newBills.push({
    id: billId,
    date: dateStr,
    items,
    subtotal: subtotal || 0,
    gst: gst > 0 ? gst : 0,
    discount: discount || 0,
    total: netTotal || 0
  });
}

// 3. Update mockData.ts
let billsStr = 'const initialBills: Bill[] = [\n';
for (const b of newBills) {
  billsStr += `  {
    id: "${b.id}",
    date: "${b.date}",
    items: [
${b.items.map(it => `      { productId: "${it.productId}", name: "${it.name}", emoji: "${it.emoji}", price: ${it.price}, qty: ${it.qty} }`).join(',\n')}
    ],
    subtotal: ${b.subtotal}, gst: ${b.gst}, discount: ${Math.abs(b.discount)}, total: ${b.total},
  },\n`;
}
billsStr += '];';

// Replace the old initialBills array
const oldBillsRegex = /const initialBills: Bill\[\] = \[[\s\S]*?\];/;
const newContent = mockDataContent.replace(oldBillsRegex, billsStr);
fs.writeFileSync(mockDataPath, newContent);

console.log(`Updated mockData.ts with ${newBills.length} new bills.`);

