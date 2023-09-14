import type { Metadata } from 'next'

import '@/styles/globals.css'
import { Header } from '@/components/header'
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
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
