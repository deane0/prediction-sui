'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'

import SuiLogo from '@/assets/sui.png'
import { cn } from '@/lib/utils'
import { MotionCounter } from '@/components/motion-counter'

export function SUIPrice() {
  const [prevPrice, setPrevPrice] = useState(0)

  const { data, isFetching, isRefetching } = useQuery({
    queryKey: ['coingecko', 'token', 'price', 'sui'],
    queryFn: async () => {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=sui&vs_currencies=usd',
      )

      if (!res.ok) return null

      const data = await res.json()
      return data.sui.usd as number
    },
    refetchInterval: 1000 * 10,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    initialData: 0,
  })

  useEffect(() => {
    if (isRefetching) {
      setPrevPrice(data)
    }
  }, [isRefetching, data])

  return (
    <div className="flex items-center">
      <div
        className={cn(
          'rounded-full bg-white p-2.5 flex justify-center items-center',
          (isFetching || isRefetching) && 'animate-spin',
        )}
      >
        <Image src={SuiLogo} alt="" width={32} height={32} />
      </div>
      <div className="bg-white -ml-3 py-1 px-4 rounded-r-full font-medium">
        <MotionCounter from={prevPrice} to={data ?? 0} duration={0.4} />
      </div>
    </div>
  )
}
