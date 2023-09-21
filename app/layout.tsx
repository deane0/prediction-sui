import type { Metadata } from 'next'

import 'swiper/css'
import '@/styles/globals.css'
import { Toaster } from '@/components/ui/toaster'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'SUI Prediction',
  icons: [{ rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' }],
}

export interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <Providers>
            <Header />
            <main className="flex-1 bg-sky-100 py-20">{children}</main>
            <Footer />
            <Toaster />
          </Providers>
        </div>
      </body>
    </html>
  )
}
