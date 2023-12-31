import { cn } from '@/lib/utils'
import { RoundStatus, type Round } from '@/types'
import { RoundCardHeader } from './round-card-header'
import { RoundCardContent } from './round-card-content'
import { EnteredTag } from './entered-tag'

export interface RoundCardProps {
  round: Round
  lastTokenPrice: bigint
}

export function RoundCard({ round, lastTokenPrice }: RoundCardProps) {
  return (
    <div
      className={cn(
        'border rounded-2xl flex flex-col drop-shadow-xl bg-white relative pb-8',
        round.status === RoundStatus.PAST && 'opacity-80 hover:opacity-100',
        round.status === RoundStatus.LIVE && 'shadow-violet-600',
      )}
    >
      <RoundCardHeader round={round} />
      <RoundCardContent round={round} lastTokenPrice={lastTokenPrice} />

      <EnteredTag round={round} />
    </div>
  )
}
