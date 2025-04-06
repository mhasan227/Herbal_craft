'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/app/store/slices/cartSlice'

// Temporary mock data - will be replaced with API call
const mockProducts = [
  {
    id: 1,
    name: 'Organic Green Tea',
    description: 'Premium quality green tea leaves with natural antioxidants. Our organic green tea is carefully sourced from sustainable farms, ensuring you get the purest and most beneficial tea experience. Rich in antioxidants and known for its metabolism-boosting properties.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1564944184957-8c4c789a7c10?w=800&h=800&fit=crop',
    rating: 4.5,
    discount: 0,
    category: 'Teas',
    ingredients: ['Organic Green Tea Leaves', 'Natural Antioxidants'],
    benefits: ['Boosts Metabolism', 'Rich in Antioxidants', 'Improves Mental Clarity'],
    usage: 'Steep one tea bag in hot water (80°C) for 2-3 minutes. Enjoy 2-3 cups daily.',
    stock: 50
  },
  {
    id: 2,
    name: 'Lavender Essential Oil',
    description: 'Pure lavender essential oil for aromatherapy and relaxation. Sourced from organic lavender fields, this essential oil provides a calming and soothing experience.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1576323180845-5c6c4d2bf7d1?w=800&h=800&fit=crop',
    rating: 5,
    discount: 10,
    category: 'Oils',
    ingredients: ['100% Pure Lavender Oil'],
    benefits: ['Promotes Relaxation', 'Improves Sleep Quality', 'Natural Aromatherapy'],
    usage: 'Add 3-4 drops to a diffuser or dilute with carrier oil for topical use.',
    stock: 35
  },
  {
    id: 3,
    name: 'Herbal Sleep Aid',
    description: 'Natural sleep supplement with chamomile and valerian root. Our carefully formulated blend helps you achieve restful sleep naturally.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1611241893603-3c359704e0ee?w=800&h=800&fit=crop',
    rating: 4,
    discount: 0,
    category: 'Supplements',
    ingredients: ['Chamomile Extract', 'Valerian Root', 'Passionflower', 'Melatonin'],
    benefits: ['Improves Sleep Quality', 'Reduces Stress', 'Non-Habit Forming'],
    usage: 'Take 1 capsule 30 minutes before bedtime with water.',
    stock: 45
  },
  {
    id: 4,
    name: 'Organic Turmeric Powder',
    description: 'High-quality organic turmeric powder with enhanced curcumin absorption. Perfect for cooking and therapeutic use.',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1597775793419-1f76c669c705?w=800&h=800&fit=crop',
    rating: 4.8,
    discount: 15,
    category: 'Supplements',
    ingredients: ['Organic Turmeric', 'Black Pepper Extract'],
    benefits: ['Anti-inflammatory', 'Antioxidant Properties', 'Supports Joint Health'],
    usage: 'Add 1/4 teaspoon to food or beverages. Best absorbed with black pepper.',
    stock: 60
  }
]

export default function ProductPage({ params }) {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  
  // Find product by ID (will be replaced with API call)
  const product = mockProducts.find(p => p.id === parseInt(params.id)) || null

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">
          Product Not Found
        </h1>
        <p className="text-gray-500">
          The product you're looking for doesn't exist or has been removed.
        </p>
      </div>
    )
  }

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price * (100 - product.discount) / 100,
      image: product.image,
      quantity
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          {product.discount > 0 && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full">
              -{product.discount}% OFF
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-green-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-5 h-5 ${
                  index < product.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-gray-500 ml-2">({product.rating})</span>
          </div>

          <div className="flex items-center mb-6">
            <span className="text-3xl font-bold text-green-600">
              ${(product.price * (100 - product.discount) / 100).toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span className="text-xl text-gray-400 line-through ml-3">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Key Benefits:</h3>
            <ul className="list-disc list-inside text-gray-600">
              {product.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Ingredients:</h3>
            <p className="text-gray-600">{product.ingredients.join(', ')}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Recommended Usage:</h3>
            <p className="text-gray-600">{product.usage}</p>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded-full">
              <button
                className="px-4 py-2 text-green-600 hover:text-green-800 disabled:text-gray-400"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                className="px-4 py-2 text-green-600 hover:text-green-800 disabled:text-gray-400"
                onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
            <button
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-full hover:bg-green-700 transition duration-300"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>

          <p className="text-gray-500">
            Stock: {product.stock} units available
          </p>
        </div>
      </div>
    </div>
  )
} 