'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/app/store/slices/cartSlice'

// Temporary mock data - will be replaced with Redux state
const mockWishlist = [
  {
    id: 1,
    name: 'Organic Green Tea',
    description: 'Premium quality green tea leaves with natural antioxidants',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1564944184957-8c4c789a7c10?w=800&h=800&fit=crop',
    rating: 4.5,
    discount: 0
  },
  {
    id: 2,
    name: 'Lavender Essential Oil',
    description: 'Pure lavender essential oil for aromatherapy and relaxation',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1576323180845-5c6c4d2bf7d1?w=800&h=800&fit=crop',
    rating: 5,
    discount: 10
  }
]

export default function WishlistPage() {
  const dispatch = useDispatch()
  const [wishlist, setWishlist] = useState(mockWishlist)

  const handleRemoveFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId))
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price * (100 - product.discount) / 100,
      image: product.image,
      quantity: 1
    }))
    handleRemoveFromWishlist(product.id)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-green-900 mb-8">My Wishlist</h1>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {wishlist.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-48 aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                      -{product.discount}%
                    </div>
                  )}
                </div>

                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link
                        href={`/products/${product.id}`}
                        className="text-xl font-semibold text-green-900 hover:text-green-700"
                      >
                        {product.name}
                      </Link>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            className={`w-4 h-4 ${
                              index < product.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-sm text-gray-500 ml-1">
                          ({product.rating})
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600">
                        ${(product.price * (100 - product.discount) / 100).toFixed(2)}
                      </div>
                      {product.discount > 0 && (
                        <div className="text-sm text-gray-400 line-through">
                          ${product.price.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 mt-2">{product.description}</p>

                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      className="px-4 py-2 text-red-600 hover:text-red-700 transition duration-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 mb-8">
            Browse our products and add your favorites to the wishlist
          </p>
          <Link
            href="/products"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300"
          >
            Browse Products
          </Link>
        </div>
      )}
    </div>
  )
} 