'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ProductCard from '../components/product/ProductCard'

// Temporary mock data - will be replaced with API call
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

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  useEffect(() => {
    setIsLoading(true)
    const results = mockProducts.filter(product => 
      product.name.toLowerCase().includes(initialQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(initialQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(initialQuery.toLowerCase())
    )
    setSearchResults(results)
    setIsLoading(false)
  }, [initialQuery])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300"
          >
            Search
          </button>
        </div>
      </form>

      {/* Search Results */}
      {initialQuery && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-900 mb-2">
            Search Results for "{initialQuery}"
          </h1>
          <p className="text-gray-600">
            Found {searchResults.length} results
          </p>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-900"></div>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : initialQuery ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            No products found
          </h2>
          <p className="text-gray-500">
            Try adjusting your search terms or browse our categories
          </p>
        </div>
      ) : null}
    </div>
  )
} 