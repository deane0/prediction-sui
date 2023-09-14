import { cn } from '@/lib/utils'
import { type Round, RoundStatus } from '@/types'

export interface RoundCardHeaderProps {
  round: Round
}

export function RoundCardHeader({ round }: RoundCardHeaderProps) {
  let title: string = 'Unknown'
  if (round.status === RoundStatus.PAST) title = 'Expired'
  if (round.status === RoundStatus.LIVE) title = 'Live'
  if (round.status === RoundStatus.NEXT) title = 'Next'

  return (
    <div className="flex justify-between items-center px-4 md:px-6 py-1">
      <div className="flex justify-center items-center">
        {/* TODO: Icon */}
        <span
          className={cn(
            'uppercase text-sm',
            round.status === RoundStatus.LIVE &&
              'font-semibold text-violet-600',
          )}
        >
          {title}
        </span>
      </div>
      <div>
        <span className="text-xs text-gray-400">#{round.epoch}</span>
      </div>
    </div>
  )
}
