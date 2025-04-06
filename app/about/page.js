import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-900 mb-6">About Herbal Craft</h1>
        
        <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1585637071663-799845ad5212?w=1920&h=1080&fit=crop"
            alt="Herbal Craft Store"
            fill
            className="object-cover"
          />
        </div>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-6">
            Founded in 2020, Herbal Craft was born from a passion for natural wellness and a desire to make premium herbal products accessible to everyone. Our journey began in a small workshop, carefully crafting herbal remedies using traditional methods and the finest natural ingredients.
          </p>

          <h2 className="text-2xl font-semibold text-green-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            At Herbal Craft, our mission is to provide high-quality, natural herbal products that enhance your well-being while maintaining harmony with nature. We believe in the power of traditional herbal wisdom combined with modern scientific understanding.
          </p>

          <h2 className="text-2xl font-semibold text-green-800 mb-4">Our Commitment</h2>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            <li>Sourcing the highest quality organic herbs</li>
            <li>Sustainable and eco-friendly practices</li>
            <li>Rigorous quality testing and control</li>
            <li>Supporting local herb farmers</li>
            <li>Continuous research and development</li>
          </ul>

          <h2 className="text-2xl font-semibold text-green-800 mb-4">Quality Assurance</h2>
          <p className="text-gray-600 mb-6">
            Every product at Herbal Craft goes through extensive quality testing to ensure safety and efficacy. Our facility adheres to strict GMP (Good Manufacturing Practice) standards, and we work with certified laboratories to verify the purity of our ingredients.
          </p>

          <div className="bg-green-50 p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <h3 className="font-semibold text-green-700 mb-2">Quality</h3>
                <p className="text-gray-600">Premium ingredients and rigorous testing</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-green-700 mb-2">Sustainability</h3>
                <p className="text-gray-600">Eco-friendly practices and packaging</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-green-700 mb-2">Transparency</h3>
                <p className="text-gray-600">Clear information about our products</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-green-800 mb-4">Join Our Journey</h2>
          <p className="text-gray-600">
            We invite you to be part of our growing community of health-conscious individuals who believe in the power of natural healing. Together, we can promote wellness through the gifts of nature.
          </p>
        </div>
      </div>
    </div>
  )
} 