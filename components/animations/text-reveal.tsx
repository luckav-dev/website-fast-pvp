'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
  type?: 'word' | 'letter'
}

export function TextReveal({
  text,
  className,
  delay = 0,
  staggerDelay = 0.05,
  type = 'word',
}: TextRevealProps) {
  const items = type === 'word' ? text.split(' ') : text.split('')
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  }
  
  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }
  
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={container}
      className={cn('inline-flex flex-wrap', className)}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={child}
          className={type === 'word' ? 'mr-[0.25em]' : ''}
        >
          {item}
          {type === 'letter' && item === ' ' && '\u00A0'}
        </motion.span>
      ))}
    </motion.span>
  )
}
