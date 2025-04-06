import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-green-50 to-green-100">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-green-900 mb-6">
              Natural Solutions for 
              <span className="text-green-600"> Better Living</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Discover our premium selection of organic herbs and natural remedies. 
              Enhance your wellness journey with nature's finest ingredients.
            </p>
            <div className="space-x-4">
              <Link 
                href="/products" 
                className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition duration-300"
              >
                Shop Now
              </Link>
              <Link 
                href="/about" 
                className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-full hover:bg-green-50 transition duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Herbal Tea', 'Essential Oils', 'Natural Supplements'].map((category) => (
              <div key={category} className="bg-green-50 rounded-lg p-6 text-center hover:shadow-lg transition duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  {/* Add icons later */}
                </div>
                <h3 className="text-xl font-semibold text-green-800">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((product) => (
              <div key={product} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300">
                <div className="aspect-square relative bg-gray-200">
                  {/* Product image placeholder */}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Organic Green Tea</h3>
                  <p className="text-gray-600 text-sm mb-2">Premium quality green tea leaves</p>
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 font-semibold">$24.99</span>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-700 transition duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">Why Choose Herbal Craft?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '100% Organic',
                description: 'All our products are certified organic and naturally sourced'
              },
              {
                title: 'Expert Curated',
                description: 'Products selected by herbal medicine experts'
              },
              {
                title: 'Quality Assured',
                description: 'Rigorous quality control and testing processes'
              }
            ].map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  {/* Add icons later */}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 