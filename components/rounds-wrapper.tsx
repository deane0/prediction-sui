import { suiClient } from '@/lib/sui'
import { EPOCH_ID, ROUNDS_ID, SUI_PRICE_FEED_ID } from '@/constants'
import {
  type CurrentEpochFields,
  type LastTokenPriceFields,
  type Round,
  RoundStatus,
  type RoundsFields,
} from '@/types'
import { Rounds } from './rounds'

export async function RoundsWrapper() {
  const [roundsRes, currentEpochRes, lastSUIPriceRes] =
    await suiClient.multiGetObjects({
      ids: [ROUNDS_ID, EPOCH_ID, SUI_PRICE_FEED_ID],
      options: { showContent: true },
    })

  if (!roundsRes.data || !currentEpochRes.data || !lastSUIPriceRes.data) {
    return <></>
  }

  if (
    currentEpochRes.data.content!.dataType !== 'moveObject' ||
    lastSUIPriceRes.data.content!.dataType !== 'moveObject' ||
    roundsRes.data.content!.dataType !== 'moveObject'
  ) {
    return <></>
  }

  // TODO: fix type error
  const currentEpoch = Number(
    (currentEpochRes.data.content!.fields as unknown as CurrentEpochFields)
      .currentEpoch,
  )

  const suiPrice = {
    value: BigInt(
      (lastSUIPriceRes.data.content!.fields as unknown as LastTokenPriceFields)
        .value.fields.value,
    ),
    decimal: (
      lastSUIPriceRes.data.content!.fields as unknown as LastTokenPriceFields
    ).value.fields.decimal,
    round: BigInt(
      (lastSUIPriceRes.data.content!.fields as unknown as LastTokenPriceFields)
        .value.fields.round,
    ),
    timestamp: Number(
      (lastSUIPriceRes.data.content!.fields as unknown as LastTokenPriceFields)
        .value.fields.timestamp,
    ),
  }

  // TODO: fix type error
  const rounds: Round[] = (
    roundsRes.data.content!.fields as unknown as RoundsFields
  ).rounds
    .slice(-5)
    .map(
      ({
        fields: {
          epoch: epochStr,
          lockPrice,
          closePrice,
          upAmount,
          downAmount,
          totalAmount,
          lockTimestamp,
          closeTimestamp,
        },
      }) => {
        const epoch = Number(epochStr)
        const status =
          epoch === currentEpoch
            ? RoundStatus.LIVE
            : epoch > currentEpoch
            ? RoundStatus.NEXT
            : RoundStatus.PAST

        return {
          epoch,
          status,
          lockPrice: BigInt(lockPrice),
          closePrice: BigInt(closePrice),
          upAmount: BigInt(upAmount),
          downAmount: BigInt(downAmount),
          totalAmount: BigInt(totalAmount),
          lockTimestamp: Number(lockTimestamp),
          closeTimestamp: Number(closeTimestamp),
          upAddresses: [],
          downAddresses: [],
        }
      },
    )

  return (
    <Rounds
      rounds={rounds}
      currentEpoch={currentEpoch}
      lastTokenPrice={suiPrice.value}
    />
  )
}
