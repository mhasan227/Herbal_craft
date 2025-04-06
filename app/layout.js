import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Herbal Craft - Premium Herbal Products',
  description: 'Your trusted source for premium herbal products and natural remedies.',
  icons: {
    icon: [
      {
        url: 'https://images.unsplash.com/photo-1585637071663-799845ad5212?w=32&h=32&fit=crop&auto=format',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: 'https://images.unsplash.com/photo-1585637071663-799845ad5212?w=16&h=16&fit=crop&auto=format',
        sizes: '16x16',
        type: 'image/png',
      }
    ],
    shortcut: 'https://images.unsplash.com/photo-1585637071663-799845ad5212?w=32&h=32&fit=crop&auto=format',
    apple: 'https://images.unsplash.com/photo-1585637071663-799845ad5212?w=180&h=180&fit=crop&auto=format',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen bg-[#F9FAF7]">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
} 