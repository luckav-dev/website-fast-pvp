'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Container } from './container'
import { fadeInUp, staggerContainer } from '@/lib/animations'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  background?: 'default' | 'light' | 'gradient' | 'grid' | 'dots'
  container?: boolean
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export function Section({ 
  children, 
  className, 
  id,
  background = 'default',
  container = true,
  containerSize = 'lg'
}: SectionProps) {
  const backgrounds = {
    default: '',
    light: 'bg-background-light',
    gradient: 'bg-gradient-to-b from-background via-background-light to-background',
    grid: 'grid-bg',
    dots: 'dots-bg',
  }
  
  return (
    <section
      id={id}
      className={cn(
        'relative py-20 md:py-28 overflow-hidden',
        backgrounds[background],
        className
      )}
    >
      {container ? (
        <Container size={containerSize}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {children}
          </motion.div>
        </Container>
      ) : (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {children}
        </motion.div>
      )}
    </section>
  )
}

interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  align?: 'left' | 'center' | 'right'
  className?: string
}

export function SectionHeader({ 
  title, 
  subtitle,
  description, 
  align = 'center',
  className 
}: SectionHeaderProps) {
  const alignments = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }
  
  return (
    <motion.div 
      variants={fadeInUp}
      className={cn('max-w-3xl mb-16', alignments[align], className)}
    >
      {subtitle && (
        <motion.span 
          variants={fadeInUp}
          className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4"
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2 
        variants={fadeInUp}
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p 
          variants={fadeInUp}
          className="text-lg text-gray-400 leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
