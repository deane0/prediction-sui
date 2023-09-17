import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  formatToken,
  formatUsd,
  getPriceDifference,
  getRoundPosition,
} from '@/helpers'
import { BetPosition, Round, RoundStatus } from '@/types'
import { LastPrice } from './last-price'

export interface RoundResultProps {
  round: Round
  lastPrice: bigint
}

export function RoundResult({ round, lastPrice }: RoundResultProps) {
  const { status, lockPrice, closePrice, totalAmount } = round
  const betPosition = getRoundPosition(
    lockPrice,
    round.status === RoundStatus.PAST ? closePrice : lastPrice,
  )
  const priceDifference = getPriceDifference(
    round.status === RoundStatus.PAST ? closePrice : lastPrice,
    lockPrice,
  )

  return (
    <>
      {status === RoundStatus.PAST && (
        <>
          <div className="mb-3 text-sm font-semibold">CLOSED PRICE</div>
          <div className="flex justify-between mb-5">
            <div
              className={cn('text-green-600 font-semibold text-xl', {
                'text-green-600': betPosition === BetPosition.BULL,
                'text-red-600': betPosition === BetPosition.BEAR,
              })}
            >
              {formatUsd({ value: closePrice, decimals: 18 }, 4)}
            </div>
            <div
              className={cn(
                'rounded text-white px-2 flex justify-center items-center',
                {
                  'bg-green-600': betPosition === BetPosition.BULL,
                  'bg-red-600': betPosition === BetPosition.BEAR,
                },
              )}
            >
              {betPosition === BetPosition.BEAR && (
                <ArrowDownIcon className="w-4 h-4" />
              )}
              {betPosition === BetPosition.BULL && (
                <ArrowUpIcon className="w-4 h-4" />
              )}
              <span>
                {formatUsd({ value: priceDifference, decimals: 18 }, 4)}
              </span>
            </div>
          </div>
        </>
      )}
      {status === RoundStatus.LIVE && (
        <LastPrice lastPrice={lastPrice} lockPrice={lockPrice} />
      )}
      <div className="flex justify-between items-center mb-1">
        <span>Locked Price:</span>
        <span>{formatUsd({ value: lockPrice, decimals: 18 }, 4)}</span>
      </div>
      <div className="flex justify-between items-center font-semibold">
        <span>Prize Pool:</span>
        <span>{formatToken({ value: totalAmount, decimals: 9 }, 4)} SUI</span>
      </div>
    </>
  )
}
