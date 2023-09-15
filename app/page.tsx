import { Suspense } from 'react'

import { RoundsLoading } from '@/components/rounds-loading'
import { RoundsWrapper } from '@/components/rounds-wrapper'

export const revalidate = 6

export default function RootPage() {
  return (
    <>
      <section>
        <div className="container">
          <Suspense fallback={<RoundsLoading />}>
            <RoundsWrapper />
          </Suspense>
        </div>
      </section>
    </>
  )
}
