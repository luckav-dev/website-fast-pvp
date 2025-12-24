'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FloatingElementProps {
  children: ReactNode
  duration?: number
  distance?: number
  delay?: number
  className?: string
}

export function FloatingElement({
  children,
  duration = 4,
  distance = 15,
  delay = 0,
  className,
}: FloatingElementProps) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{
        y: [-distance, distance, -distance],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={cn('will-change-transform', className)}
    >
      {children}
    </motion.div>
  )
}
