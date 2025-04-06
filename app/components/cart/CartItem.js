import Image from 'next/image'

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const {
    name,
    image,
    price,
    quantity,
    discount
  } = item

  const discountedPrice = price * (100 - discount) / 100
  const totalPrice = discountedPrice * quantity

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-200">
      {/* Product Image */}
      <div className="relative w-24 h-24 bg-white rounded-lg overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-gray-200">
          {image && (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
            />
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <div className="flex items-center mt-1">
          <span className="text-green-600 font-semibold">
            ${discountedPrice.toFixed(2)}
          </span>
          {discount > 0 && (
            <span className="text-sm text-gray-400 line-through ml-2">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <div className="flex items-center border border-gray-300 rounded-full">
          <button 
            className="px-3 py-1 text-gray-600 hover:text-green-600"
            onClick={() => onUpdateQuantity(quantity - 1)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="px-3 py-1">{quantity}</span>
          <button 
            className="px-3 py-1 text-gray-600 hover:text-green-600"
            onClick={() => onUpdateQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* Total Price */}
      <div className="text-right min-w-[100px]">
        <div className="text-lg font-semibold text-gray-900">
          ${totalPrice.toFixed(2)}
        </div>
      </div>

      {/* Remove Button */}
      <button 
        onClick={onRemove}
        className="text-gray-400 hover:text-red-500 transition duration-300"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
} 