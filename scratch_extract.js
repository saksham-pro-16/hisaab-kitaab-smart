const fs = require('fs');
const code = fs.readFileSync('d:/Antigravity Automations/Hisaab Kitaab/hisaab-kitaab-smart/src/lib/mockData.ts', 'utf8');
const match = code.match(/export const products: Product\[\] = \[([\s\S]*?)\];/);
if (match) {
  const items = match[1].split('\n').map(line => {
    const m1 = line.match(/name: "(.*?)"/);
    const m2 = line.match(/stock: (\d+)/);
    const m3 = line.match(/minStock: (\d+)/);
    if (m1 && m2 && m3) {
      const stock = parseInt(m2[1]);
      const minStock = parseInt(m3[1]);
      const status = stock === 0 ? 'Out of Stock' : stock < minStock ? 'Low Stock' : 'Good';
      return `${m1[1]} - ${status}`;
    }
    return null;
  }).filter(Boolean);
  console.log(items.join('\n'));
}
