'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { SUI_PRICE_FEED_ID } from '@/constants'
import { suiClient } from '@/lib/sui'
import { type LastTokenPriceFields } from '@/types'
import { MotionCounter } from './motion-counter'
import { formatUsd } from '@/helpers'

export interface OracleSUIPriceProps {
  initialPrice: bigint
}

export function OracleSUIPrice({ initialPrice }: OracleSUIPriceProps) {
  const [prevPrice, setPrevPrice] = useState(initialPrice)

  const { data, isRefetching } = useQuery({
    queryKey: ['oracle', 'sui', 'price'],
    queryFn: async () => {
      const res = await suiClient.getObject({
        id: SUI_PRICE_FEED_ID,
        options: { showContent: true },
      })

      if (!res.data) {
        return 0n
      }

      return BigInt(
        // @ts-ignore
        (res.data.content!.fields as unknown as LastTokenPriceFields).value
          .fields.value,
      )
    },
    refetchInterval: 1000 * 6,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    initialData: initialPrice,
  })

  useEffect(() => {
    if (isRefetching) {
      setPrevPrice(data)
    }
  }, [isRefetching, data])

  return (
    <>
      {'$'}
      <MotionCounter
        from={Number(formatUsd({ value: prevPrice, decimals: 18 }, 4, ''))}
        to={Number(formatUsd({ value: data, decimals: 18 }, 4, ''))}
        duration={0.4}
        displayedDecimals={4}
      />
    </>
  )
}
