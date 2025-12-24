'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'outline'
  className?: string
  pulse?: boolean
}

export function Badge({ 
  children, 
  variant = 'default', 
  className,
  pulse = false 
}: BadgeProps) {
  const variants = {
    default: 'bg-white/10 text-white',
    primary: 'bg-primary/20 text-primary border border-primary/30',
    secondary: 'bg-secondary/20 text-secondary border border-secondary/30',
    outline: 'border border-white/20 text-white',
  }
  
  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
        variants[variant],
        pulse && 'animate-pulse-glow',
        className
      )}
    >
      {children}
    </motion.span>
  )
}
