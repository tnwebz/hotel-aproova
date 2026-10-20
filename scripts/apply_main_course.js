const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '../public/menu-images/main-course');
const backupDir = path.join(dir, 'backup_scrambled_webp');
const originalsDir = path.join(dir, 'originals_jpg');

if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
if (!fs.existsSync(originalsDir)) fs.mkdirSync(originalsDir, { recursive: true });

// Backup existing webp files
const existingWebp = fs.readdirSync(dir).filter(f => f.endsWith('.webp'));
console.log(`Backing up ${existingWebp.length} scrambled webp files...`);
for (const f of existingWebp) {
  fs.copyFileSync(path.join(dir, f), path.join(backupDir, f));
}

// Exact 1-to-1 Mapping from Original JPG to canonical dish webp filename
const mapping = {
  // 1. Tikka Masala (2 items)
  'image_20261018_085000.jpg': 'paneer-tikka-masala.webp',
  'image_20261018_085020.jpg': 'mushroom-tikka-masala.webp',

  // 2. Pallipalayam (4 items)
  'image_20261018_085004.jpg': 'paneer-pallipalayam.webp',
  'image_20261018_085009.jpg': 'mushroom-pallipalayam.webp',
  'image_20261018_085015.jpg': 'gobi-pallipalayam.webp',
  'image_20261018_085017.jpg': 'babycorn-pallipalayam.webp',

  // 3. Methi (Apoorvaa Spl) (3 items)
  'image_20261018_085012.jpg': 'paneer-methi.webp',
  'image_20261018_085000_2.jpg': 'mushroom-methi.webp',
  'image_20261018_085010.jpg': 'gobi-methi.webp',

  // 4. Maharani (Dry) (4 items)
  'image_20261018_085001.jpg': 'paneer-maharani-dry.webp',
  'image_20261018_085000_1.jpg': 'mushroom-maharani-dry.webp',
  'image_20261018_084512.jpg': 'gobi-maharani-dry.webp',
  'image_20261018_084507.jpg': 'babycorn-maharani-dry.webp',

  // 5. Chinthamani (4 items)
  'image_20261018_084855.jpg': 'paneer-chinthamani.webp',
  'image_20261018_084905_1.jpg': 'mushroom-chinthamani.webp',
  'image_20261018_084854.jpg': 'gobi-chithamani.webp',
  'image_20261018_084857.jpg': 'babycorn-chithamani.webp',

  // 6. Mutter Rogan Gravy (4 items)
  'image_20261018_084851.jpg': 'paneer-mutter-rogan-gravy.webp',
  'image_20261018_084903.jpg': 'mushroom-mutter-rogan-gravy.webp',
  'image_20261018_084849.jpg': 'gobi-mutter-rogan-gravy.webp',
  'image_20261018_084902.jpg': 'babycorn-mutter-rogan-gravy.webp',

  // 7. Butter Masala (1 item)
  'image_20261018_084630.jpg': 'paneer-butter-masala.webp',

  // 8. Hariyali (4 items)
  'image_20261018_084631.jpg': 'paneer-hariyali.webp',
  'image_20261018_084632.jpg': 'mushroom-hariyali.webp',
  'image_20261018_084633.jpg': 'gobi-hariyali.webp',
  'image_20261018_084634_1.jpg': 'babycorn-hariyali.webp',

  // 9. Hyderabad Gravy (4 items)
  'image_20261018_084634.jpg': 'paneer-hyderabad-gravy.webp',
  'image_20261018_084639.jpg': 'mushroom-hyderabad-gravy.webp',
  'image_20261018_084640.jpg': 'gobi-hyderabad-gravy.webp',
  'image_20261018_084641.jpg': 'babycorn-hyderabad-gravy.webp',

  // 10. Apoorvaa Special (4 items)
  'image_20261018_084849_1.jpg': 'paneer-apoorvaa-special.webp',
  'image_20261018_085009_1.jpg': 'mushroom-apoorvaa-special.webp',
  'image_20261018_084650.jpg': 'gobi-apoorvaa-special.webp',
  'image_20261018_084905.jpg': 'babycorn-apoorvaa-special.webp',

  // 11. Chettinad (4 items)
  'image_20261018_084508_2.jpg': 'paneer-chettinad.webp',
  'image_20261018_084506.jpg': 'mushroom-chettinad.webp',
  'image_20261018_084505_1.jpg': 'gobi-chettinad.webp',
  'image_20261018_084516.jpg': 'babycorn-chettinad.webp',

  // 12. Kadaai (5 items)
  'image_20261018_084507_1.jpg': 'kadaai-paneer.webp',
  'image_20261018_084508.jpg': 'kadaai-mushroom.webp',
  'image_20261018_084505.jpg': 'kadaai-gobi.webp',
  'image_20261018_084508_1.jpg': 'kadaai-babycorn.webp',
  'image_20261018_084406.jpg': 'kadaai-veg.webp',

  // 13. Sizzler (1 item)
  'image_20261018_084419.jpg': 'paneer-sizzler.webp',

  // 14. Mughlai (4 items)
  'image_20261018_084405_2.jpg': 'mughlai-paneer.webp',
  'image_20261018_084405_1.jpg': 'mughlai-mushroom.webp',
  'image_20261018_084407.jpg': 'mughlai-gobi.webp',
  'image_20261018_084405.jpg': 'mughlai-babycorn.webp',

  // 15. Monika (4 items)
  'image_20261018_084406_1.jpg': 'monika-paneer.webp',
  'image_20261018_084409.jpg': 'monika-mushroom.webp',
  'image_20261018_084413.jpg': 'monika-gobi.webp',
  'image_20261018_084407_1.jpg': 'monika-babycorn.webp',
};

async function applyConversions() {
  console.log(`Starting conversion of 52 dishes from authentic high-res camera assets...`);
  for (const [srcJpg, targetWebp] of Object.entries(mapping)) {
    const srcPath = path.join(dir, srcJpg);
    const targetPath = path.join(dir, targetWebp);

    if (!fs.existsSync(srcPath)) {
      throw new Error(`Source file missing: ${srcPath}`);
    }

    await sharp(srcPath)
      .webp({ quality: 88, effort: 4 })
      .toFile(targetPath);

    console.log(`✓ Converted ${srcJpg} -> ${targetWebp}`);
  }

  // Create spelling aliases
  const aliases = [
    ['gobi-chithamani.webp', 'gobi-chinthamani.webp'],
    ['babycorn-chithamani.webp', 'babycorn-chinthamani.webp'],
    ['paneer-methi.webp', 'paneer-methi-apoorvaa-spl.webp'],
    ['mushroom-methi.webp', 'mushroom-methi-apoorvaa-spl.webp'],
    ['gobi-methi.webp', 'gobi-methi-apoorvaa-spl.webp'],
  ];

  for (const [src, alias] of aliases) {
    fs.copyFileSync(path.join(dir, src), path.join(dir, alias));
    console.log(`✓ Created alias ${alias} -> ${src}`);
  }

  // Move all JPGs to originals_jpg for safekeeping
  const jpgFiles = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));
  for (const f of jpgFiles) {
    fs.renameSync(path.join(dir, f), path.join(originalsDir, f));
  }
  console.log(`✓ Moved ${jpgFiles.length} JPG files to originals_jpg/ directory`);

  console.log('ALL MAIN COURSE DISHES SUCCESSFULLY AUDITED AND REARRANGED!');
}

applyConversions().catch(console.error);
