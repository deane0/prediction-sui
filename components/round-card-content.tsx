import { cn } from '@/lib/utils'
import { getMultiplier, getRoundPosition } from '@/helpers'
import { BetPosition, type Round, RoundStatus } from '@/types'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { EnterPosition } from './enter-position'
import { RoundResult } from './round-result'

export interface RoundCardContentProps {
  round: Round
  lastTokenPrice: bigint
}

export function RoundCardContent({
  round,
  lastTokenPrice,
}: RoundCardContentProps) {
  const { status, lockPrice, closePrice, upAmount, downAmount, totalAmount } =
    round

  const betPosition = getRoundPosition(
    lockPrice,
    status === RoundStatus.PAST ? closePrice : lastTokenPrice,
  )

  const bullMultiplier = getMultiplier(totalAmount, upAmount)
  const bearMultiplier = getMultiplier(totalAmount, downAmount)

  const formattedBullMultiplier = bullMultiplier.toFixed(
    bullMultiplier.isZero() ? 0 : 2,
  )
  const formattedBearMultiplier = bearMultiplier.toFixed(
    bearMultiplier.isZero() ? 0 : 2,
  )

  const isUpPosition = betPosition === BetPosition.BULL

  return (
    <div className="flex flex-col items-center p-6 flex-1">
      <div className="relative -m-px">
        <svg
          height="65px"
          width="240px"
          viewBox="0 0 240 65"
          color="text"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              className={cn(
                status !== RoundStatus.NEXT && isUpPosition
                  ? 'fill-green-600'
                  : 'fill-gray-100',
              )}
              d="M10.0001 49.2757L10.0003 64H234L234 49.2753C234 42.5136 229.749 36.4819 223.381 34.2077L138.48 3.8859C127.823 0.0796983 116.177 0.0796931 105.519 3.8859L20.6188 34.2076C14.2508 36.4819 10.0001 42.5138 10.0001 49.2757Z"
            />
          </g>
        </svg>
        <div className="absolute inset-0 text-white text-center py-1 flex flex-col-reverse">
          <div
            className={cn(
              'text-sm',
              (status === RoundStatus.NEXT || !isUpPosition) && 'text-gray-600',
            )}
          >
            <span>{formattedBullMultiplier}x</span> <span>Payout</span>
          </div>
          <div
            className={cn(
              'text-lg font-semibold',
              (status === RoundStatus.NEXT || !isUpPosition) &&
                'text-green-600',
            )}
          >
            UP
          </div>
        </div>
      </div>
      <div
        className={cn(
          'rounded-xl w-full p-0.5 flex-1 flex',
          status === RoundStatus.NEXT
            ? 'bg-gradient-to-br from-sky-500 to-indigo-500'
            : isUpPosition
            ? 'bg-green-600'
            : 'bg-red-600',
        )}
      >
        <div className="bg-white flex-1 p-4 rounded-xl">
          {status === RoundStatus.NEXT ? (
            <EnterPosition />
          ) : (
            <RoundResult round={round} lastPrice={lastTokenPrice} />
          )}
        </div>
      </div>
      <div className="relative -mt-px">
        <svg
          height="65px"
          width="240px"
          viewBox="0 0 240 65"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              className={cn(isUpPosition ? 'fill-gray-100' : 'fill-red-600')}
              d="M10.0001 15.7243L10.0003 1H234L234 15.7247C234 22.4864 229.749 28.5181 223.381 30.7923L138.48 61.1141C127.823 64.9203 116.177 64.9203 105.519 61.1141L20.6188 30.7924C14.2508 28.5181 10.0001 22.4862 10.0001 15.7243Z"
            />
          </g>
        </svg>
        <div className="absolute inset-0 text-white text-center py-1">
          <div className={cn('text-sm', isUpPosition && 'text-gray-600')}>
            <span>{formattedBearMultiplier}x</span> <span>Payout</span>
          </div>
          <div
            className={cn(
              'text-lg font-semibold',
              isUpPosition && 'text-red-600',
            )}
          >
            DOWN
          </div>
        </div>
      </div>
    </div>
  )
}
