import { cn } from '@/lib/utils'
import {
  formatToken,
  formatUsd,
  getPriceDifference,
  getRoundPosition,
} from '@/helpers'
import { BetPosition, Round, RoundStatus } from '@/types'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

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
      <div className="mb-3 text-sm font-semibold">
        {status === RoundStatus.PAST && 'CLOSED PRICE'}
        {status === RoundStatus.LIVE && 'LAST PRICE'}
      </div>
      <div className="flex justify-between mb-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn('text-green-600 font-semibold text-xl', {
                  'text-green-600': betPosition === BetPosition.BULL,
                  'text-red-600': betPosition === BetPosition.BEAR,
                  'decoration-wavy underline': status === RoundStatus.LIVE,
                  'decoration-green-600':
                    status === RoundStatus.LIVE &&
                    betPosition === BetPosition.BULL,
                  'decoration-red-600':
                    status === RoundStatus.LIVE &&
                    betPosition === BetPosition.BEAR,
                })}
              >
                {formatUsd(
                  {
                    value:
                      round.status === RoundStatus.PAST
                        ? closePrice
                        : lastPrice,
                    decimals: 18,
                  },
                  4,
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Last price from Supra Oracle</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div
          className={cn(
            'rounded text-white px-2 flex justify-center items-center',
            {
              'bg-green-600': betPosition === BetPosition.BULL,
              'bg-red-600': betPosition === BetPosition.BEAR,
            },
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="m5 12 7-7 7 7" />
            <path d="M12 19V5" />
          </svg>
          <span>{formatUsd({ value: priceDifference, decimals: 18 }, 4)}</span>
        </div>
      </div>
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
