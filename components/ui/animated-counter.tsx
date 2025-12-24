'use client'

import { useEffect, useState, useRef } from 'react'
import { cn } from '@/lib/utils'

interface CountUpProps {
  end: number
  start?: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  decimals?: number
}

export function CountUp({
  end,
  start = 0,
  duration = 2,
  suffix = '',
  prefix = '',
  className,
  decimals = 0,
}: CountUpProps) {
  const [count, setCount] = useState(start)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    const startTime = Date.now()
    const endTime = startTime + duration * 1000

    const tick = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / (endTime - startTime), 1)
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      const currentValue = start + (end - start) * easeProgress

      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [hasStarted, start, end, duration])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  )
}

interface AnimatedCounterProps {
  value: number
  className?: string
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  return <CountUp end={value} className={className} />
}
