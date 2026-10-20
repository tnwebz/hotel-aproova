const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Let's create an HTML visual confirmation page with the mapped dish names alongside the images!
const mapping = {
  // 1. Tikka Masala
  'paneer-tikka-masala': 'image_20261018_085000.jpg',
  'mushroom-tikka-masala': 'image_20261018_085020.jpg',

  // 2. Pallipalayam
  'paneer-pallipalayam': 'image_20261018_085004.jpg',
  'mushroom-pallipalayam': 'image_20261018_085009.jpg',
  'gobi-pallipalayam': 'image_20261018_085015.jpg',
  'babycorn-pallipalayam': 'image_20261018_085017.jpg',

  // 3. Methi (Apoorvaa Spl)
  'paneer-methi': 'image_20261018_085012.jpg',
  'mushroom-methi': 'image_20261018_085000_2.jpg',
  'gobi-methi': 'image_20261018_085010.jpg',

  // 4. Maharani (Dry)
  'paneer-maharani-dry': 'image_20261018_085001.jpg',
  'mushroom-maharani-dry': 'image_20261018_085000_1.jpg',
  'gobi-maharani-dry': 'image_20261018_084512.jpg',
  'babycorn-maharani-dry': 'image_20261018_084507.jpg',

  // 5. Chinthamani
  'paneer-chinthamani': 'image_20261018_084855.jpg',
  'mushroom-chinthamani': 'image_20261018_084905_1.jpg',
  'gobi-chithamani': 'image_20261018_084854.jpg',
  'babycorn-chithamani': 'image_20261018_084857.jpg',

  // 6. Mutter Rogan Gravy
  'paneer-mutter-rogan-gravy': 'image_20261018_084851.jpg',
  'mushroom-mutter-rogan-gravy': 'image_20261018_084903.jpg',
  'gobi-mutter-rogan-gravy': 'image_20261018_084849.jpg',
  'babycorn-mutter-rogan-gravy': 'image_20261018_084902.jpg',

  // 7. Butter Masala
  'paneer-butter-masala': 'image_20261018_084630.jpg',

  // 8. Hariyali
  'paneer-hariyali': 'image_20261018_084631.jpg',
  'mushroom-hariyali': 'image_20261018_084632.jpg',
  'gobi-hariyali': 'image_20261018_084633.jpg',
  'babycorn-hariyali': 'image_20261018_084634_1.jpg',

  // 9. Hyderabad Gravy
  'paneer-hyderabad-gravy': 'image_20261018_084634.jpg',
  'mushroom-hyderabad-gravy': 'image_20261018_084639.jpg',
  'gobi-hyderabad-gravy': 'image_20261018_084640.jpg',
  'babycorn-hyderabad-gravy': 'image_20261018_084641.jpg',

  // 10. Apoorvaa Special
  'paneer-apoorvaa-special': 'image_20261018_084849_1.jpg',
  'mushroom-apoorvaa-special': 'image_20261018_085009_1.jpg',
  'gobi-apoorvaa-special': 'image_20261018_084650.jpg',
  'babycorn-apoorvaa-special': 'image_20261018_084905.jpg',

  // 11. Chettinad
  'paneer-chettinad': 'image_20261018_084508_2.jpg',
  'mushroom-chettinad': 'image_20261018_084506.jpg',
  'gobi-chettinad': 'image_20261018_084505_1.jpg',
  'babycorn-chettinad': 'image_20261018_084516.jpg',

  // 12. Kadaai
  'kadaai-paneer': 'image_20261018_084507_1.jpg',
  'kadaai-mushroom': 'image_20261018_084508.jpg',
  'kadaai-gobi': 'image_20261018_084505.jpg',
  'kadaai-babycorn': 'image_20261018_084508_1.jpg',
  'kadaai-veg': 'image_20261018_084406.jpg',

  // 13. Sizzler
  'paneer-sizzler': 'image_20261018_084419.jpg',

  // 14. Mughlai
  'mughlai-paneer': 'image_20261018_084405_2.jpg',
  'mughlai-mushroom': 'image_20261018_084405_1.jpg',
  'mughlai-gobi': 'image_20261018_084407.jpg',
  'mughlai-babycorn': 'image_20261018_084405.jpg',

  // 15. Monika
  'monika-paneer': 'image_20261018_084406_1.jpg',
  'monika-mushroom': 'image_20261018_084409.jpg',
  'monika-gobi': 'image_20261018_084413.jpg',
  'monika-babycorn': 'image_20261018_084407_1.jpg',
};

let html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Final Proposed Audit</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #0f172a; color: #f8fafc; padding: 24px; }
  h1 { font-size: 24px; color: #38bdf8; margin-bottom: 20px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
  .card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; overflow: hidden; padding: 12px; }
  .img-wrap { width: 100%; height: 200px; border-radius: 8px; overflow: hidden; background: #000; }
  .img-wrap img { width: 100%; height: 100%; object-fit: cover; }
  .dish { font-size: 15px; font-weight: 700; color: #10b981; margin-top: 8px; }
  .src { font-size: 11px; color: #94a3b8; }
</style></head><body>
<h1>Final Proposed 52 Main Course Dishes</h1>
<div class="grid">
`;

Object.entries(mapping).forEach(([dish, srcJpg], i) => {
  html += `  <div class="card">
    <div class="img-wrap"><img src="/mc_thumbs/${srcJpg.replace('.jpg', '.webp')}" /></div>
    <div class="dish">${i + 1}. ${dish}</div>
    <div class="src">Original: ${srcJpg}</div>
  </div>\n`;
});

html += `</div></body></html>`;

fs.writeFileSync(path.join(__dirname, '../public/audit_final_mc.html'), html);
console.log('Created public/audit_final_mc.html');
