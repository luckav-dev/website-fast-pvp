'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max: number
  className?: string
  showLabel?: boolean
  color?: 'primary' | 'green' | 'yellow' | 'red' | 'blue'
  animated?: boolean
}

const colorClasses = {
  primary: 'bg-primary',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  red: 'bg-red-500',
  blue: 'bg-blue-500',
}

export function ProgressBar({
  value,
  max,
  className,
  showLabel = false,
  color = 'primary',
  animated = true,
}: ProgressBarProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const percentage = Math.min((value / max) * 100, 100)

  useEffect(() => {
    if (animated) {
      const duration = 1000
      const steps = 60
      const increment = percentage / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= percentage) {
          setDisplayValue(percentage)
          clearInterval(timer)
        } else {
          setDisplayValue(current)
        }
      }, duration / steps)

      return () => clearInterval(timer)
    } else {
      setDisplayValue(percentage)
    }
  }, [percentage, animated])

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2 text-sm">
          <span className="text-muted-foreground">Progreso</span>
          <span className="font-medium">{value}/{max}</span>
        </div>
      )}
      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            colorClasses[color],
            'relative overflow-hidden'
          )}
          style={{ width: `${displayValue}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  )
}

