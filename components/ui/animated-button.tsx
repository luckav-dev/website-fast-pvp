'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ShimmerButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function ShimmerButton({ children, className, onClick }: ShimmerButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden rounded-xl',
        'bg-primary px-6 py-3 font-semibold text-white',
        'transition-all duration-200 hover:brightness-110 active:scale-[0.98]',
        className
      )}
    >
      {children}
    </button>
  )
}

interface GlowButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function GlowButton({ children, className, onClick }: GlowButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative overflow-hidden rounded-xl bg-primary px-6 py-3 font-semibold text-white',
        'transition-all duration-200 hover:brightness-110 active:scale-[0.98]',
        className
      )}
    >
      <span className="relative z-10">{children}</span>
    </button>
  )
}

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function MagneticButton({ children, className, onClick }: MagneticButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative inline-flex items-center justify-center',
        'transition-transform duration-200 active:scale-[0.98]',
        className
      )}
    >
      {children}
    </button>
  )
}

interface RippleButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function RippleButton({ children, className, onClick }: RippleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative overflow-hidden rounded-xl bg-primary px-6 py-3 font-semibold text-white',
        'transition-all duration-200 hover:brightness-110 active:scale-[0.98]',
        className
      )}
    >
      {children}
    </button>
  )
}
