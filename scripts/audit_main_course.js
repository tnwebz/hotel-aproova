const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dir = path.join(__dirname, '../public/menu-images/main-course');
const files = fs.readdirSync(dir);
const jpgs = files.filter(f => f.endsWith('.jpg') && !f.includes('(1)')); // remove the 3 duplicates

console.log('Unique JPG count:', jpgs.length);

// Let's create an HTML visual inspection file for the 52 JPGs
let html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Audit 52 JPGs</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #0f172a; color: #f8fafc; padding: 24px; }
  h1 { font-size: 24px; color: #38bdf8; margin-bottom: 20px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px; }
  .card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; overflow: hidden; padding: 12px; }
  .img-wrap { width: 100%; height: 240px; border-radius: 8px; overflow: hidden; background: #000; }
  .img-wrap img { width: 100%; height: 100%; object-fit: cover; }
  .num { font-size: 16px; font-weight: 800; color: #f59e0b; margin-top: 8px; }
  .name { font-size: 13px; font-weight: 600; color: #38bdf8; word-break: break-all; }
</style></head><body>
<h1>52 Original Main Course JPGs Visual Audit</h1>
<div class="grid">
`;

jpgs.sort().forEach((f, idx) => {
  html += `  <div class="card">
    <div class="img-wrap"><img src="/menu-images/main-course/${f}" /></div>
    <div class="num">#${idx + 1}</div>
    <div class="name">${f}</div>
  </div>\n`;
});

html += `</div></body></html>`;

fs.writeFileSync(path.join(__dirname, '../public/audit_jpgs.html'), html);
console.log('Created public/audit_jpgs.html');
