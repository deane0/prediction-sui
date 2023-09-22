import { Suspense } from 'react'
import Script from 'next/script'

import { RoundsLoading } from '@/components/rounds-loading'
import { RoundsWrapper } from '@/components/rounds-wrapper'
import { SUIPrice } from '@/components/sui-price'
import TradingViewWidget from '@/components/trading-view'
import { PriceChartTabs } from '@/components/price-chart-tabs'

export const revalidate = 6

export default function RootPage() {
  return (
    <>
      <section>
        <div className="container">
          <SUIPrice />
        </div>
      </section>
      <section>
        <div className="mx-auto px-4 md:px-6">
          <Suspense fallback={<RoundsLoading />}>
            <RoundsWrapper />
          </Suspense>
        </div>
      </section>
      <section>
        <PriceChartTabs />
      </section>
    </>
  )
}
