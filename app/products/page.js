'use client'

import { useState } from 'react'
import ProductCard from '../components/product/ProductCard'

// This is temporary mock data, will be replaced with actual API data later
const mockProducts = [
  {
    id: 1,
    name: 'Organic Green Tea',
    description: 'Premium quality green tea leaves with natural antioxidants',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1564944184957-8c4c789a7c10?w=800&h=800&fit=crop',
    rating: 4.5,
    discount: 0,
    category: 'Teas'
  },
  {
    id: 2,
    name: 'Lavender Essential Oil',
    description: 'Pure lavender essential oil for aromatherapy and relaxation',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1576323180845-5c6c4d2bf7d1?w=800&h=800&fit=crop',
    rating: 5,
    discount: 10,
    category: 'Oils'
  },
  {
    id: 3,
    name: 'Herbal Sleep Aid',
    description: 'Natural sleep supplement with chamomile and valerian root',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1611241893603-3c359704e0ee?w=800&h=800&fit=crop',
    rating: 4,
    discount: 0,
    category: 'Supplements'
  },
  {
    id: 4,
    name: 'Organic Turmeric Powder',
    description: 'High-quality organic turmeric powder with curcumin',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1597775793419-1f76c669c705?w=800&h=800&fit=crop',
    rating: 4.8,
    discount: 15,
    category: 'Supplements'
  }
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8

  // Filter products by category
  const filteredProducts = selectedCategory === 'All'
    ? mockProducts
    : mockProducts.filter(product => product.category === selectedCategory)

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low-high':
        return a.price - b.price
      case 'price-high-low':
        return b.price - a.price
      case 'popular':
        return b.rating - a.rating
      default: // newest
        return b.id - a.id
    }
  })

  // Calculate pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-green-900 mb-2">Our Products</h1>
        <p className="text-gray-600">
          Discover our collection of premium herbal products and natural remedies
        </p>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        {/* Categories */}
        <div className="flex gap-2">
          {['All', 'Teas', 'Oils', 'Supplements'].map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full transition duration-300 ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-green-600 hover:bg-green-50'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <nav className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-full transition duration-300 ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'border border-gray-300 hover:bg-green-50'
            }`}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`px-4 py-2 rounded-full transition duration-300 ${
                currentPage === index + 1
                  ? 'bg-green-600 text-white'
                  : 'border border-gray-300 hover:bg-green-50'
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={`px-4 py-2 rounded-full transition duration-300 ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'border border-gray-300 hover:bg-green-50'
            }`}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  )
} 