'use client'

import { TransactionBlock } from '@mysten/sui.js/transactions'
import { useWalletKit } from '@mysten/wallet-kit'

import { CONTRACT_ADDRESS, EPOCH_ID, ROUNDS_ID } from '@/constants'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

export interface ClaimNewProps {
  epoch: number
}

export function ClaimNew({ epoch }: ClaimNewProps) {
  const { signAndExecuteTransactionBlock } = useWalletKit()

  const { toast } = useToast()

  const handleClaim = async () => {
    const txb = new TransactionBlock()
    txb.moveCall({
      target: `${CONTRACT_ADDRESS}::prediction::claim`,
      arguments: [txb.pure(ROUNDS_ID), txb.pure(epoch), txb.pure(EPOCH_ID)],
    })

    try {
      const res = await signAndExecuteTransactionBlock({
        transactionBlock: txb,
        options: {
          showInput: true,
          showEvents: true,
          showEffects: true,
        },
      })

      console.log(res)

      toast({
        variant: 'default',
        title: 'Claim Success',
        description: `You have claimed your reward.`, // TODO
      })
    } catch (error) {
      // TODO
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message ?? 'Unknown error',
      })
    }
  }

  return (
    <Button
      className="text-tiny text-white bg-black/20 rounded-full"
      color="default"
      size="sm"
      onClick={handleClaim}
    >
      Claim
    </Button>
  )
}
