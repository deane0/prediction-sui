'use client'

import { useState } from 'react'
import { WalletKitProvider } from '@mysten/wallet-kit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WalletKitProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WalletKitProvider>
  )
}
