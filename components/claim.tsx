'use client'

import { useCallback, useState } from 'react'
import { TransactionBlock } from '@mysten/sui.js/transactions'
import { useWalletKit } from '@mysten/wallet-kit'

import { CONTRACT_ADDRESS, EPOCH_ID, ROUNDS_ID } from '@/constants'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function Claim() {
  const { signAndExecuteTransactionBlock } = useWalletKit()

  const [roundNum, setRoundNum] = useState<number>()

  const handleClaim = useCallback(async () => {
    const txb = new TransactionBlock()
    txb.moveCall({
      target: `${CONTRACT_ADDRESS}::prediction::claim`,
      arguments: [txb.pure(ROUNDS_ID), txb.pure(roundNum), txb.pure(EPOCH_ID)],
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
    } catch (error) {}
  }, [roundNum, signAndExecuteTransactionBlock])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">Claim</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Claim</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="roundNum">Epoch Number</Label>
          <Input
            id="roundNum"
            type="number"
            value={roundNum}
            className="col-span-3"
            onChange={(e) => {
              if (e.target.value === '') return setRoundNum(undefined)
              setRoundNum(Number(e.target.value))
            }}
          />
        </div>
        <DialogFooter>
          <Button className="w-full" onClick={handleClaim}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
