// Unsplash image utility functions

// Collection IDs for different categories
const COLLECTIONS = {
  herbs: '3788032',  // Herbal/Natural collection
  products: '9470468',  // Product photography collection
  wellness: '4856033',  // Wellness/Lifestyle collection
};

/**
 * Get a random Unsplash image URL for a specific category
 * @param {string} category - Category of image (herbs, products, wellness)
 * @param {number} width - Desired width of image
 * @param {number} height - Desired height of image
 * @returns {string} Unsplash image URL
 */
export const getUnsplashImage = (category = 'herbs', width = 800, height = 600) => {
  const collectionId = COLLECTIONS[category] || COLLECTIONS.herbs;
  return `https://source.unsplash.com/collection/${collectionId}/${width}x${height}`;
};

/**
 * Get a specific Unsplash image URL by ID
 * @param {string} imageId - Unsplash image ID
 * @param {number} width - Desired width of image
 * @param {number} height - Desired height of image
 * @returns {string} Unsplash image URL
 */
export const getSpecificUnsplashImage = (imageId, width = 800, height = 600) => {
  return `https://source.unsplash.com/${imageId}/${width}x${height}`;
};

// Example herb-related image IDs for consistent imagery
export const FEATURED_IMAGES = {
  hero: 'photo-1585637071663-799845ad5212',
  products: [
    'photo-1564944184957-8c4c789a7c10', // Herbal tea
    'photo-1576323180845-5c6c4d2bf7d1', // Essential oils
    'photo-1597775793419-1f76c669c705', // Dried herbs
    'photo-1611241893603-3c359704e0ee'  // Natural supplements
  ],
  categories: [
    'photo-1611241893603-3c359704e0ee', // Supplements
    'photo-1564944184957-8c4c789a7c10', // Teas
    'photo-1576323180845-5c6c4d2bf7d1', // Oils
    'photo-1597775793419-1f76c669c705'  // Raw herbs
  ]
}; 