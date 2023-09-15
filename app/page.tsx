import { Suspense } from 'react'

import { RoundsLoading } from '@/components/rounds-loading'
import { RoundsWrapper } from '@/components/rounds-wrapper'
import { SUIPrice } from '@/components/sui-price'

export const revalidate = 6

export default function RootPage() {
  return (
    <>
      <section>
        <div className="container pt-20">
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
      <section></section>
    </>
  )
}
