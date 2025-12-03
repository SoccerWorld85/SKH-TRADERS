/**
 * Products Database - SKH TRADERS
 * Premium export-grade spices for international B2B buyers
 * All products: Sortex-cleaned, export-certified, natural & clean
 */

const PRODUCTS = [
  {
    id: 'coriander-seeds',
    name: 'Coriander Seeds',
    category: 'Whole Spices',
    price: 2.50, // USD per kg
    bulkPrices: { '100kg': 2.40, '500kg': 2.20, '1000kg': 2.00 },
    image: './attached_assets/generated_images/coriander_seeds_product_photo.png',
    description: 'Singapore & Europe Grade whole coriander seeds. Pure, naturally aromatic with bright golden color.',
    specs: {
      purity: '99–99.5%',
      aroma: 'Fresh & citrus-like',
      moisture: '<10%',
      packaging: '25kg / 50kg PP bags',
      origin: 'Pakistan',
      processing: 'Sortex-cleaned'
    },
    benefits: ['100% natural', 'Export-grade purity', 'Sortex-processed', 'Food-safe certified'],
    applications: ['Food Manufacturing', 'Seasoning Companies', 'Spice Blends', 'Oil Extraction'],
    certification: ['Export Certified', 'Quality Assured', 'Metal Detection Passed'],
    inStock: true,
    minOrder: '100kg'
  },
  {
    id: 'fennel-seeds',
    name: 'Fennel Seeds (Saunf)',
    category: 'Whole Spices',
    price: 3.00,
    bulkPrices: { '100kg': 2.80, '500kg': 2.60, '1000kg': 2.40 },
    image: './attached_assets/generated_images/fennel_seeds_product_photo.png',
    description: 'Premium Singapore & Europe Grade fennel seeds. Sweet, aromatic, and naturally polished.',
    specs: {
      purity: '99–99.5%',
      aroma: 'Sweet & aromatic',
      moisture: '<10%',
      packaging: '25kg / 50kg PP bags',
      origin: 'Pakistan',
      processing: 'Sortex-cleaned'
    },
    benefits: ['100% natural', 'Sweet aroma', 'Sortex-processed', 'Restaurant grade'],
    applications: ['Beverages', 'Food Manufacturing', 'Spice Blends', 'Pharmaceutical'],
    certification: ['Export Certified', 'Quality Assured', 'Moisture Controlled'],
    inStock: true,
    minOrder: '100kg'
  },
  {
    id: 'cumin-seeds',
    name: 'Cumin Seeds (Zeera)',
    category: 'Whole Spices',
    price: 4.50,
    bulkPrices: { '100kg': 4.20, '500kg': 3.90, '1000kg': 3.50 },
    image: './attached_assets/generated_images/cumin_zeera_seeds_product_photo.png',
    description: 'Bold, premium cumin seeds with strong earthy aroma. Export-ready quality for international buyers.',
    specs: {
      purity: '99–99.5%',
      aroma: 'Bold & earthy',
      moisture: '<10%',
      packaging: '25kg / 50kg PP bags',
      origin: 'Pakistan',
      processing: 'Sortex-cleaned'
    },
    benefits: ['Premium seeds', 'Strong aroma', 'Export-grade', 'Bulk availability'],
    applications: ['Food Manufacturing', 'Spice Blends', 'Seasoning Companies', 'Oil Extraction'],
    certification: ['Export Certified', 'Quality Assured', 'Metal Detection Passed'],
    inStock: true,
    minOrder: '100kg'
  },
  {
    id: 'carom-seeds',
    name: 'Carom Seeds (Ajwain)',
    category: 'Whole Spices',
    price: 5.00,
    bulkPrices: { '100kg': 4.70, '500kg': 4.40, '1000kg': 4.00 },
    image: './attached_assets/generated_images/carom_seeds_product_photo.png',
    description: 'High thymol content carom seeds with strong aromatic profile. Sortex-cleaned for export.',
    specs: {
      purity: '99–99.5%',
      thymolContent: 'High',
      aroma: 'Strong & pungent',
      moisture: '<10%',
      packaging: '25kg / 50kg PP bags',
      origin: 'Pakistan',
      processing: 'Sortex-cleaned'
    },
    benefits: ['High thymol', 'Strong aroma', 'Pharmaceutical grade', 'Natural'],
    applications: ['Pharmaceutical Industry', 'Food Manufacturing', 'Ayurvedic', 'Traditional Medicine'],
    certification: ['Export Certified', 'Pharmaceutical Grade', 'Thymol Tested'],
    inStock: true,
    minOrder: '100kg'
  },
  {
    id: 'black-pepper-whole',
    name: 'Black Pepper (Whole)',
    category: 'Ground & Whole',
    price: 6.50,
    bulkPrices: { '100kg': 6.00, '500kg': 5.50, '1000kg': 5.00 },
    image: './attached_assets/generated_images/black_pepper.png',
    description: 'Premium jet-black whole peppercorns. Restaurant & wholesale grade with bold flavor profile.',
    specs: {
      purity: '99–99.5%',
      density: '500–550 GL',
      color: 'Jet-black',
      moisture: '<10%',
      packaging: '25kg / 50kg PP bags',
      origin: 'Vietnam / India',
      processing: 'Hand-graded'
    },
    benefits: ['Restaurant grade', 'Bold flavor', 'Premium quality', 'Sortex option'],
    applications: ['Food Manufacturing', 'Restaurants', 'Spice Blends', 'Grinding Companies'],
    certification: ['Export Certified', 'Quality Assured', 'Purity Tested'],
    inStock: true,
    minOrder: '100kg'
  },
  {
    id: 'red-chilli-whole',
    name: 'Red Chilli (Whole / Stemless)',
    category: 'Ground & Whole',
    price: 7.00,
    bulkPrices: { '100kg': 6.50, '500kg': 6.00, '1000kg': 5.50 },
    image: './attached_assets/generated_images/red_chillies.png',
    description: 'Bright red whole chillies with consistent heat levels (SHU: 20,000–50,000). Low moisture, ideal for crushing & grinding.',
    specs: {
      purity: '99–99.5%',
      shu: '20,000–50,000',
      color: 'Bright red',
      moisture: '<8%',
      packaging: '25kg / 50kg PP bags',
      origin: 'Pakistan',
      processing: 'Stemless available'
    },
    benefits: ['Bright color', 'Consistent heat', 'Low moisture', 'Grinding-ready'],
    applications: ['Food Manufacturing', 'Sauce Companies', 'Grinding', 'Seasoning Blends'],
    certification: ['Export Certified', 'Heat Verified', 'Color Graded'],
    inStock: true,
    minOrder: '100kg'
  },
  {
    id: 'turmeric-powder',
    name: 'Turmeric (Fingers / Powder)',
    category: 'Ground & Whole',
    price: 4.00,
    bulkPrices: { '100kg': 3.70, '500kg': 3.40, '1000kg': 3.00 },
    image: './attached_assets/generated_images/turmeric_powder.png',
    description: 'Golden yellow turmeric with naturally high curcumin content. Ideal for seasoning companies and food manufacturers.',
    specs: {
      purity: '99–99.5%',
      color: 'Golden yellow',
      curcumin: 'Naturally high',
      moisture: '<10%',
      packaging: '25kg / 50kg PP bags',
      origin: 'Pakistan',
      processing: 'Powder / Fingers available'
    },
    benefits: ['Natural curcumin', 'Golden color', 'Food-safe', 'Pure & clean'],
    applications: ['Food Manufacturing', 'Cosmetics', 'Seasoning', 'Pharmaceutical'],
    certification: ['Export Certified', 'Food Safe', 'Curcumin Tested'],
    inStock: true,
    minOrder: '100kg'
  }
];

/**
 * Search and filter products
 */
function searchProducts(query) {
  const searchTerm = query.toLowerCase();
  return PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    (product.specs && JSON.stringify(product.specs).toLowerCase().includes(searchTerm))
  );
}

/**
 * Filter products by category
 */
function filterByCategory(category) {
  if (category === 'all') return PRODUCTS;
  return PRODUCTS.filter(product => product.category === category);
}

/**
 * Get unique categories
 */
function getCategories() {
  return [...new Set(PRODUCTS.map(p => p.category))];
}

/**
 * Get bulk pricing for product
 */
function getBulkPrice(productId, quantity) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product || !product.bulkPrices) return product.price;
  
  const quantities = Object.keys(product.bulkPrices).map(q => parseInt(q));
  const applicableQuantity = quantities.filter(q => quantity >= q).pop();
  
  return applicableQuantity ? product.bulkPrices[applicableQuantity + 'kg'] : product.price;
}
