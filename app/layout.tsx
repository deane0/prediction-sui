import '@/styles/globals.css'
import { Header } from '@/components/header'

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
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
