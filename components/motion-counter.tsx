'use client'

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef } from 'react'

type CounterProps = {
  from: number
  to: number
  duration: number
}

export function MotionCounter({ from, to, duration }: CounterProps) {
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest) => {
    return latest.toFixed(6)
  })
  const ref = useRef(null)
  const inView = useInView(ref)

  // while in view animate the count
  useEffect(() => {
    if (inView) {
      animate(count, to, { duration })
    }
  }, [count, inView, to, duration])

  return <motion.span ref={ref}>{rounded}</motion.span>
}
