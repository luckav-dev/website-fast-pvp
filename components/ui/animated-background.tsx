'use client'

import { cn } from '@/lib/utils'

interface GridBackgroundProps {
  className?: string
  children?: React.ReactNode
}

export function GridBackground({ className, children }: GridBackgroundProps) {
  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      {children}
    </div>
  )
}

interface DotBackgroundProps {
  className?: string
  children?: React.ReactNode
}

export function DotBackground({ className, children }: DotBackgroundProps) {
  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
      {children}
    </div>
  )
}

interface SpotlightProps {
  className?: string
}

export function Spotlight({ className }: SpotlightProps) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div 
        className="absolute -top-40 left-0 h-[400px] w-[400px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        }}
      />
      <div 
        className="absolute -top-20 right-0 h-[300px] w-[300px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}

interface GlowProps {
  className?: string
  color?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Glow({ className, color = 'primary', size = 'lg' }: GlowProps) {
  const sizes = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-72 h-72',
    xl: 'w-96 h-96',
  }

  return (
    <div
      className={cn(
        'absolute rounded-full blur-3xl pointer-events-none opacity-20',
        sizes[size],
        color === 'primary' && 'bg-primary',
        color === 'blue' && 'bg-blue-500',
        color === 'purple' && 'bg-purple-500',
        className
      )}
    />
  )
}
