'use client'

import { cn } from '@/lib/utils'
import { Sparkles, Flame, Star } from 'lucide-react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'new' | 'hot' | 'featured'
  className?: string
  animated?: boolean
}

const variants = {
  default: 'bg-muted text-muted-foreground',
  success: 'bg-green-500/10 text-green-400 border-green-500/20',
  warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  error: 'bg-red-500/10 text-red-400 border-red-500/20',
  info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  new: 'bg-primary/10 text-primary border-primary/20',
  hot: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  featured: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
}

export function Badge({ children, variant = 'default', className, animated = false }: BadgeProps) {
  const getIcon = () => {
    if (variant === 'new') return <Sparkles className="w-3 h-3" />
    if (variant === 'hot') return <Flame className="w-3 h-3" />
    if (variant === 'featured') return <Star className="w-3 h-3" />
    return null
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variants[variant],
        animated && 'animate-pulse',
        className
      )}
    >
      {getIcon()}
      {children}
    </span>
  )
}
