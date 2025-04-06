'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/app/store/slices/cartSlice'

export default function ProductCard({ product }) {
  const dispatch = useDispatch()
  const {
    id,
    name,
    description,
    price,
    image,
    rating,
    discount
  } = product

  const handleAddToCart = (e) => {
    e.preventDefault()
    dispatch(addToCart({
      id,
      name,
      price: price * (100 - discount) / 100,
      image,
      quantity: 1
    }))
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      <Link href={`/products/${id}`}>
        <div className="relative aspect-square">
          {image && (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
            />
          )}
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
              -{discount}%
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${id}`}>
          <h3 className="text-lg font-semibold mb-1 hover:text-green-600 transition duration-300">
            {name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-4 h-4 ${
                index < rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-sm text-gray-500 ml-1">({rating})</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold text-green-600">
              ${(price * (100 - discount) / 100).toFixed(2)}
            </span>
            {discount > 0 && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ${price.toFixed(2)}
              </span>
            )}
          </div>
          <button 
            className="bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-700 transition duration-300"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
} 