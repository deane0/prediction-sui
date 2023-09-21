'use client'

import { suiClient } from '@/lib/sui'
import { useWalletKit } from '@mysten/wallet-kit'
import { useQuery } from '@tanstack/react-query'
import { RoundStatus, type AddressValueFields, type Round } from '@/types'
import { cn } from '@/lib/utils'
import { ClaimNew } from './claim-new'

export interface EnteredTagProps {
  round: Round
}

export function EnteredTag({ round }: EnteredTagProps) {
  const { downAddresses, upAddresses, upOrDown, status } = round

  const { currentAccount } = useWalletKit()

  const { data: downData } = useQuery({
    queryKey: ['entered', 'down', downAddresses.id, currentAccount?.address],
    queryFn: async () => {
      try {
        const res = await suiClient.getDynamicFieldObject({
          parentId: downAddresses.id,
          name: { type: 'address', value: currentAccount.address },
        })

        if (!res.data) {
          if (res.error) {
            throw res.error
          } else {
            throw new Error('Unknown error')
          }
        }

        if (res.data.content.dataType !== 'moveObject') {
          throw new Error('Unknown error')
        }

        return res.data.content.fields as unknown as AddressValueFields
      } catch (error) {
        throw error
      }
    },
    enabled: !!downAddresses.size && !!currentAccount?.address,
  })

  const { data: upData } = useQuery({
    queryKey: ['entered', 'up', upAddresses.id, currentAccount?.address],
    queryFn: async () => {
      try {
        const res = await suiClient.getDynamicFieldObject({
          parentId: upAddresses.id,
          name: { type: 'address', value: currentAccount.address },
        })

        if (!res.data) {
          if (res.error) {
            throw res.error
          } else {
            throw new Error('Unknown error')
          }
        }

        if (res.data.content.dataType !== 'moveObject') {
          throw new Error('Unknown error')
        }

        return res.data.content.fields as unknown as AddressValueFields
      } catch (error) {
        throw error
      }
    },
    enabled: upAddresses.size > 0 && !!currentAccount?.address,
  })

  if (status === RoundStatus.NEXT || (!upData && !downData)) {
    return null
  }

  return (
    <div
      className={cn(
        'absolute h-auto px-2 py-1 left-0 bottom-0 right-0 flex items-center z-10 rounded-xl mx-2 mb-2 backdrop-blur shadow-sm bg-gray-950/10',
      )}
    >
      <p
        className={cn(
          'flex-1 text-tiny',
          upData && 'text-green-600/80',
          downData && 'text-red-600/80',
        )}
      >
        You have bet {upData ? 'bull' : 'bear'}.
      </p>
      {status !== RoundStatus.LIVE &&
        ((upOrDown && upData) || (!upOrDown && downData)) && (
          <ClaimNew epoch={round.epoch} />
        )}
    </div>
  )
}
