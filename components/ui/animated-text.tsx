'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  staggerChildren?: number
  once?: boolean
}

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  duration = 0.05,
  staggerChildren = 0.03,
  once = true,
}: AnimatedTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-100px' })

  const words = text.split(' ')

  return (
    <motion.span
      ref={ref}
      className={cn('inline-block', className)}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ staggerChildren, delayChildren: delay }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              variants={letterVariants}
              transition={{ duration }}
            >
              {char}
            </motion.span>
          ))}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </motion.span>
  )
}

interface BlurTextProps {
  text: string
  className?: string
  delay?: number
}

export function BlurText({ text, className, delay = 0 }: BlurTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.span
      ref={ref}
      className={cn('inline-block', className)}
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.8, delay }}
    >
      {text}
    </motion.span>
  )
}

interface GradientTextProps {
  text: string
  className?: string
  from?: string
  via?: string
  to?: string
}

export function GradientText({
  text,
  className,
  from = 'from-primary',
  via = 'via-pink-500',
  to = 'to-primary',
}: GradientTextProps) {
  return (
    <span
      className={cn(
        'bg-clip-text text-transparent bg-gradient-to-r bg-[length:200%_auto] animate-text-gradient',
        from,
        via,
        to,
        className
      )}
    >
      {text}
    </span>
  )
}

interface TypewriterProps {
  text: string
  className?: string
  speed?: number
  delay?: number
}

export function Typewriter({ text, className, speed = 50, delay = 0 }: TypewriterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.span
      ref={ref}
      className={cn('inline-block', className)}
      initial={{ width: 0 }}
      animate={isInView ? { width: 'auto' } : {}}
      transition={{ duration: text.length * (speed / 1000), delay, ease: 'linear' }}
      style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
    >
      {text}
    </motion.span>
  )
}
