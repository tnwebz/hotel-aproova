const fs = require('fs');
const path = require('path');

// Let's print our full mapping of 52 JPGs to the 52 dishes
const mapping = {
  // 1. Tikka Masala (2 items)
  'paneer-tikka-masala': 'image_20261018_085000.jpg',
  'mushroom-tikka-masala': 'image_20261018_085020.jpg',

  // 2. Pallipalayam (4 items)
  'paneer-pallipalayam': 'image_20261018_085004.jpg',
  'mushroom-pallipalayam': 'image_20261018_085009.jpg',
  'gobi-pallipalayam': 'image_20261018_085015.jpg',
  'babycorn-pallipalayam': 'image_20261018_085017.jpg',

  // 3. Methi (Apoorvaa Spl) (3 items)
  'paneer-methi': 'image_20261018_085012.jpg',
  'mushroom-methi': 'image_20261018_085000_2.jpg',
  'gobi-methi': 'image_20261018_085010.jpg',

  // 4. Maharani (Dry) (4 items)
  'paneer-maharani-dry': 'image_20261018_085001.jpg',
  'mushroom-maharani-dry': 'image_20261018_085000_1.jpg',
  'gobi-maharani-dry': 'image_20261018_084512.jpg',
  'babycorn-maharani-dry': 'image_20261018_084507.jpg',

  // 5. Chinthamani (4 items)
  'paneer-chinthamani': 'image_20261018_084855.jpg',
  'mushroom-chinthamani': 'image_20261018_084905_1.jpg',
  'gobi-chithamani': 'image_20261018_084854.jpg',
  'babycorn-chithamani': 'image_20261018_084857.jpg',

  // 6. Mutter Rogan Gravy (4 items)
  'paneer-mutter-rogan-gravy': 'image_20261018_084851.jpg',
  'mushroom-mutter-rogan-gravy': 'image_20261018_084903.jpg',
  'gobi-mutter-rogan-gravy': 'image_20261018_084849.jpg',
  'babycorn-mutter-rogan-gravy': 'image_20261018_084902.jpg',

  // 7. Butter Masala (1 item)
  'paneer-butter-masala': 'image_20261018_084630.jpg',

  // 8. Hariyali (4 items)
  'paneer-hariyali': 'image_20261018_084631.jpg',
  'mushroom-hariyali': 'image_20261018_084632.jpg',
  'gobi-hariyali': 'image_20261018_084633.jpg',
  'babycorn-hariyali': 'image_20261018_084634_1.jpg',

  // 9. Hyderabad Gravy (4 items)
  'paneer-hyderabad-gravy': 'image_20261018_084634.jpg',
  'mushroom-hyderabad-gravy': 'image_20261018_084639.jpg',
  'gobi-hyderabad-gravy': 'image_20261018_084640.jpg',
  'babycorn-hyderabad-gravy': 'image_20261018_084641.jpg',

  // 10. Apoorvaa Special (4 items)
  'paneer-apoorvaa-special': 'image_20261018_084849_1.jpg',
  'mushroom-apoorvaa-special': 'image_20261018_085009_1.jpg', // let's double check this
  'gobi-apoorvaa-special': 'image_20261018_084650.jpg',
  'babycorn-apoorvaa-special': 'image_20261018_084905.jpg',

  // 11. Chettinad (4 items)
  'paneer-chettinad': 'image_20261018_084508_2.jpg',
  'mushroom-chettinad': 'image_20261018_084506.jpg',
  'gobi-chettinad': 'image_20261018_084505_1.jpg',
  'babycorn-chettinad': 'image_20261018_084516.jpg',

  // 12. Kadaai (5 items)
  'kadaai-paneer': 'image_20261018_084507_1.jpg',
  'kadaai-mushroom': 'image_20261018_084508.jpg',
  'kadaai-gobi': 'image_20261018_084505.jpg',
  'kadaai-babycorn': 'image_20261018_084508_1.jpg',
  'kadaai-veg': 'image_20261018_084406.jpg',

  // 13. Sizzler (1 item)
  'paneer-sizzler': 'image_20261018_084419.jpg',

  // 14. Mughlai (4 items)
  'mughlai-paneer': 'image_20261018_084405_2.jpg',
  'mughlai-mushroom': 'image_20261018_084405_1.jpg',
  'mughlai-gobi': 'image_20261018_084407.jpg',
  'mughlai-babycorn': 'image_20261018_084405.jpg',

  // 15. Monika (4 items)
  'monika-paneer': 'image_20261018_084406_1.jpg',
  'monika-mushroom': 'image_20261018_084409.jpg',
  'monika-gobi': 'image_20261018_084413.jpg',
  'monika-babycorn': 'image_20261018_084407_1.jpg',
};

const mappedValues = Object.values(mapping);
console.log('Total mapped keys:', Object.keys(mapping).length);
console.log('Unique mapped JPGs:', new Set(mappedValues).size);

const dir = path.join(__dirname, '../public/menu-images/main-course');
const allJpgs = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') && !f.includes('(1)'));
const missing = allJpgs.filter(j => !mappedValues.includes(j));
console.log('JPGs in directory not in mapping:', missing);
