'use client'

import { cn } from '@/lib/utils'

interface WaveSeparatorProps {
  className?: string
  flip?: boolean
}

export function WaveSeparator({ className, flip = false }: WaveSeparatorProps) {
  return (
    <div className={cn('relative w-full h-16 overflow-hidden', className)}>
      <svg
        className={cn('absolute inset-0 w-full h-full', flip && 'rotate-180')}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,60 C300,20 600,100 900,60 C1050,40 1125,50 1200,60 L1200,120 L0,120 Z"
          fill="hsl(var(--background))"
        />
      </svg>
    </div>
  )
}

