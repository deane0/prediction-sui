'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Keyboard, Mousewheel, FreeMode } from 'swiper/modules'

import { type Round } from '@/types'
import { RoundCard } from './round-card'

export interface RoundsProps {
  rounds: Round[]
  currentEpoch: number
  lastTokenPrice: bigint
}

export async function Rounds({
  rounds,
  currentEpoch,
  lastTokenPrice,
}: RoundsProps) {
  const swiperIndex = rounds.findIndex((round) => round.epoch === currentEpoch)

  return (
    <Swiper
      className="flex items-center space-x-4 py-16"
      initialSlide={swiperIndex}
      spaceBetween={16}
      slidesPerView="auto"
      freeMode={{
        enabled: true,
        sticky: true,
        momentumRatio: 0.25,
        momentumVelocityRatio: 0.5,
      }}
      modules={[Keyboard, Mousewheel, FreeMode]}
      centeredSlides
      mousewheel
      keyboard
      resizeObserver
    >
      {rounds.map((round) => (
        <SwiperSlide key={round.epoch} className="w-80">
          <RoundCard round={round} lastTokenPrice={lastTokenPrice} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
