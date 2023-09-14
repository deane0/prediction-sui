'use client'

import { WalletKitProvider } from '@mysten/wallet-kit'

export interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return <WalletKitProvider>{children}</WalletKitProvider>
}
