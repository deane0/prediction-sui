import type { Round } from '@/types'
import { RoundCardHeader } from './round-card-header'
import { RoundCardContent } from './round-card-content'

export interface RoundCardProps {
  round: Round
  lastTokenPrice: bigint
}

export function RoundCard({ round, lastTokenPrice }: RoundCardProps) {
  return (
    <div className="min-w-[320px] border rounded-xl flex flex-col">
      <RoundCardHeader round={round} />
      <RoundCardContent round={round} lastTokenPrice={lastTokenPrice} />
    </div>
  )
}
