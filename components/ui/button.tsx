'use client'

import { forwardRef, ButtonHTMLAttributes } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { buttonHover, buttonTap } from '@/lib/animations'

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', glow = false, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary hover:bg-primary-light text-white',
      secondary: 'bg-secondary hover:bg-secondary-light text-black',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
      ghost: 'bg-transparent hover:bg-white/10 text-white',
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }
    
    return (
      <motion.button
        ref={ref}
        whileHover={buttonHover}
        whileTap={buttonTap}
        className={cn(
          'relative inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300',
          variants[variant],
          sizes[size],
          glow && variant === 'primary' && 'glow-primary',
          glow && variant === 'secondary' && 'glow-secondary',
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
