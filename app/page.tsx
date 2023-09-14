import { Suspense } from 'react'

import { RoundsLoading } from '@/components/rounds-loading'
import { Rounds } from '@/components/rounds'

export const revalidate = 6

export default function RootPage() {
  return (
    <>
      <section>
        <div className="container">
          <Suspense fallback={<RoundsLoading />}>
            <Rounds />
          </Suspense>
        </div>
      </section>
    </>
  )
}
