'use client'

import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
}

export function Skeleton({ className, variant = 'rectangular' }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-muted rounded',
        variant === 'circular' && 'rounded-full',
        variant === 'text' && 'h-4',
        className
      )}
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" className="w-12 h-12" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="w-3/4 h-4" />
          <Skeleton variant="text" className="w-1/2 h-3" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonPlayerList() {
  return (
    <div className="space-y-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-card border border-border">
          <Skeleton variant="circular" className="w-8 h-8" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" className="w-32 h-4" />
            <Skeleton variant="text" className="w-20 h-3" />
          </div>
          <Skeleton variant="text" className="w-16 h-4" />
        </div>
      ))}
    </div>
  )
}

