'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface GlowEffectProps {
  children: ReactNode
  color?: string
  className?: string
  intensity?: 'low' | 'medium' | 'high'
}

export function GlowEffect({
  children,
  color = '#fc043c',
  className,
  intensity = 'medium',
}: GlowEffectProps) {
  const intensities = {
    low: { blur: 20, opacity: 0.3 },
    medium: { blur: 40, opacity: 0.5 },
    high: { blur: 60, opacity: 0.7 },
  }
  
  const { blur, opacity } = intensities[intensity]
  
  return (
    <motion.div
      className={cn('relative', className)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 rounded-inherit -z-10"
        animate={{
          boxShadow: [
            `0 0 ${blur}px ${color}${Math.round(opacity * 0.5 * 255).toString(16)}`,
            `0 0 ${blur * 1.5}px ${color}${Math.round(opacity * 255).toString(16)}`,
            `0 0 ${blur}px ${color}${Math.round(opacity * 0.5 * 255).toString(16)}`,
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {children}
    </motion.div>
  )
}
