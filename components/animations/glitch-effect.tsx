'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface GlitchEffectProps {
  children: React.ReactNode
  className?: string
  intensity?: 'low' | 'medium' | 'high'
  duration?: number
}

export function GlitchEffect({ children, className, intensity = 'low', duration = 3000 }: GlitchEffectProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, duration)

    return () => clearInterval(interval)
  }, [duration])

  const intensityClasses = {
    low: 'glitch-low',
    medium: 'glitch-medium',
    high: 'glitch-high',
  }

  return (
    <span
      className={cn(
        'inline-block relative',
        isGlitching && intensityClasses[intensity],
        className
      )}
    >
      {children}
    </span>
  )
}

