'use client'

import { useState } from 'react'
import Image from 'next/image'

// Temporary mock data - will be replaced with API call
const mockReviews = [
  {
    id: 1,
    productId: 1,
    productName: 'Organic Green Tea',
    productImage: 'https://images.unsplash.com/photo-1564944184957-8c4c789a7c10?w=400&h=400&fit=crop',
    userName: 'John Doe',
    rating: 5,
    date: '2024-03-15',
    title: "Best tea I've ever had!",
    content: 'This green tea is absolutely amazing. The flavor is perfect and I can really feel the health benefits.',
    verified: true
  },
  {
    id: 2,
    productId: 2,
    productName: 'Lavender Essential Oil',
    productImage: 'https://images.unsplash.com/photo-1576323180845-5c6c4d2bf7d1?w=400&h=400&fit=crop',
    userName: 'Sarah Smith',
    rating: 4,
    date: '2024-03-14',
    title: 'Great quality oil',
    content: 'The lavender scent is very authentic and helps me relax before bed. Would definitely recommend!',
    verified: true
  }
]

export default function ReviewsPage() {
  const [sortBy, setSortBy] = useState('newest')
  const [filterRating, setFilterRating] = useState('all')

  // Filter and sort reviews
  const filteredReviews = mockReviews
    .filter(review => filterRating === 'all' || review.rating === parseInt(filterRating))
    .sort((a, b) => {
      switch (sortBy) {
        case 'highest':
          return b.rating - a.rating
        case 'lowest':
          return a.rating - b.rating
        default: // newest
          return new Date(b.date) - new Date(a.date)
      }
    })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-green-900 mb-2">Customer Reviews</h1>
        <p className="text-gray-600">
          See what our customers are saying about our products
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <div className="flex gap-2">
          <select
            className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        <select
          className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map(review => (
          <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src={review.productImage}
                  alt={review.productName}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-green-900">
                      {review.productName}
                    </h3>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className={`w-4 h-4 ${
                            index < review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="font-medium text-gray-900 mt-3">{review.title}</h4>
                <p className="text-gray-600 mt-2">{review.content}</p>
                <div className="flex items-center mt-4 text-sm">
                  <span className="text-gray-500">{review.userName}</span>
                  {review.verified && (
                    <span className="flex items-center text-green-600 ml-4">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verified Purchase
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 