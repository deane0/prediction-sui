'use client'

import { useState } from 'react'
import { ConnectButton, useWalletKit } from '@mysten/wallet-kit'
import { TransactionBlock } from '@mysten/sui.js/transactions'

import { suiClient } from '@/lib/sui'
import { CONTRACT_ADDRESS, EPOCH_ID, ROUNDS_ID } from '@/constants'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import BigNumber from 'bignumber.js'

enum Action {
  ENTER_UP = 'betUp',
  ENTER_DOWN = 'betDown',
}

export function EnterPosition() {
  const { isConnected, signAndExecuteTransactionBlock } = useWalletKit()

  const [amount, setAmount] = useState(0)

  const handleSubmit = async (action: Action) => {
    const txb = new TransactionBlock()
    const value = new BigNumber(amount).multipliedBy('1000000000').toFixed(0) // TODO

    const coin = txb.splitCoins(txb.gas, [txb.pure(value.toString())])

    const epoch = await suiClient.getObject({
      id: EPOCH_ID,
      options: { showContent: true },
    })

    // @ts-ignore
    const currentEpoch = Number(epoch.data?.content?.fields.currentEpoch)

    // TODO
    txb.moveCall({
      target: `${CONTRACT_ADDRESS}::prediction::${action}`,
      arguments: [
        txb.pure(ROUNDS_ID),
        txb.pure(EPOCH_ID),
        coin,
        txb.pure(currentEpoch + 1),
      ],
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
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-xl p-4">
        <ConnectButton className="w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div>
        <Input
          type="number"
          onChange={(event) => {
            setAmount(Number(event.target.value))
          }}
        />
      </div>
      <div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleSubmit(Action.ENTER_UP)}
        >
          Enter UP
        </Button>
      </div>
      <div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleSubmit(Action.ENTER_DOWN)}
        >
          Enter DOWN
        </Button>
      </div>
    </div>
  )
}
