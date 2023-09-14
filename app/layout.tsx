import '@/styles/globals.css'
import { Header } from '@/components/header'
import { Providers } from './providers'

export const metadata = {
  title: 'SUI Prediction',
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
