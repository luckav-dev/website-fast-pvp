'use client'

import { useRef, useState, MouseEvent } from 'react'
import { cn } from '@/lib/utils'

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = 'rgba(252, 4, 60, 0.08)',
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  function handleMouseMove(e: MouseEvent) {
    if (!ref.current) return
    const { left, top } = ref.current.getBoundingClientRect()
    setPosition({ x: e.clientX - left, y: e.clientY - top })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        'relative rounded-xl border border-border bg-card overflow-hidden transition-colors',
        className
      )}
    >
      {isHovering && (
        <div
          className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 60%)`,
          }}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  )
}

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  rotationFactor?: number
}

export function TiltCard({ children, className, rotationFactor = 5 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -rotationFactor
    const rotateY = ((x - centerX) / centerX) * rotationFactor
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`)
  }

  function handleMouseLeave() {
    setTransform('')
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: 'transform 0.15s ease-out' }}
      className={cn('relative', className)}
    >
      {children}
    </div>
  )
}

interface GlowingCardProps {
  children: React.ReactNode
  className?: string
}

export function GlowingCard({ children, className }: GlowingCardProps) {
  return (
    <div className={cn('relative group', className)}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-pink-600 rounded-xl blur opacity-15 group-hover:opacity-30 transition duration-300" />
      <div className="relative bg-card rounded-xl border border-border overflow-hidden">
        {children}
      </div>
    </div>
  )
}

interface BorderBeamCardProps {
  children: React.ReactNode
  className?: string
  duration?: number
}

export function BorderBeamCard({ children, className, duration = 8 }: BorderBeamCardProps) {
  return (
    <div className={cn('relative rounded-xl overflow-hidden', className)}>
      <div className="absolute inset-0 rounded-xl">
        <div
          className="absolute inset-0 rounded-xl opacity-50"
          style={{
            background: `conic-gradient(from 0deg, transparent, hsl(var(--primary)), transparent 30%)`,
            animation: `spin ${duration}s linear infinite`,
          }}
        />
      </div>
      <div className="absolute inset-[1px] rounded-xl bg-card" />
      <div className="relative">{children}</div>
    </div>
  )
}
