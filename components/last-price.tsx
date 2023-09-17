'use client'

import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { BetPosition } from '@/types'
import { formatUsd, getPriceDifference, getRoundPosition } from '@/helpers'
import { suiClient } from '@/lib/sui'
import { SUI_PRICE_FEED_ID } from '@/constants'
import { MotionCounter } from './motion-counter'

export interface LastPriceProps {
  lastPrice: bigint
  lockPrice: bigint
}

export function LastPrice({ lastPrice, lockPrice }: LastPriceProps) {
  const [prevPrice, setPrevPrice] = useState(lastPrice)

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
    initialData: lastPrice,
  })

  useEffect(() => {
    if (isRefetching) {
      setPrevPrice(data)
    }
  }, [isRefetching, data])

  const betPosition = useMemo(
    () => getRoundPosition(lockPrice, lastPrice),
    [lastPrice, lockPrice],
  )
  const priceDifference = useMemo(
    () => getPriceDifference(data, lockPrice),
    [data, lockPrice],
  )

  return (
    <>
      <div className="mb-3 text-sm font-semibold">LAST PRICE</div>
      <div className="flex justify-between mb-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  'text-green-600 font-semibold text-xl decoration-wavy underline',
                  {
                    'text-green-600 decoration-green-600':
                      betPosition === BetPosition.BULL,
                    'text-red-600 decoration-red-600':
                      betPosition === BetPosition.BEAR,
                  },
                )}
              >
                {'$'}
                <MotionCounter
                  from={Number(
                    formatUsd({ value: prevPrice, decimals: 18 }, 4, ''),
                  )}
                  to={Number(formatUsd({ value: data, decimals: 18 }, 4, ''))}
                  duration={0.4}
                  displayedDecimals={4}
                />
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
          {betPosition === BetPosition.BEAR && (
            <ArrowDownIcon className="w-4 h-4" />
          )}
          {betPosition === BetPosition.BULL && (
            <ArrowUpIcon className="w-4 h-4" />
          )}
          <span>{formatUsd({ value: priceDifference, decimals: 18 }, 4)}</span>
        </div>
      </div>
    </>
  )
}
