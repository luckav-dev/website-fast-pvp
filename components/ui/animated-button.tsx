'use client'

import { ReactNode, useRef, useState, MouseEvent } from 'react'
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
        'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
        'before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700',
        className
      )}
    >
      <span className="relative z-10">{children}</span>
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
        'shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/70',
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
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * 0.3, y: y * 0.3 })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative inline-flex items-center justify-center',
        'transition-transform duration-200 ease-out active:scale-[0.98]',
        className
      )}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
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
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return
    
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newRipple = {
      x,
      y,
      id: Date.now(),
    }
    
    setRipples((prev) => [...prev, newRipple])
    
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 600)
    
    onClick?.()
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={cn(
        'relative overflow-hidden rounded-xl bg-primary px-6 py-3 font-semibold text-white',
        'transition-all duration-200 hover:brightness-110 active:scale-[0.98]',
        className
      )}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none animate-ripple"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </button>
  )
}
