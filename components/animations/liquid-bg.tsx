'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface LiquidBgProps {
  className?: string
  color?: string
  speed?: number
}

export function LiquidBg({ className, color = '#fc043c', speed = 1 }: LiquidBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, `${color}15`)
      gradient.addColorStop(0.5, `${color}08`)
      gradient.addColorStop(1, `${color}15`)

      ctx.fillStyle = gradient
      
      const wave1 = Math.sin(time * 0.001 * speed) * 50
      const wave2 = Math.cos(time * 0.0015 * speed) * 40
      
      ctx.beginPath()
      ctx.moveTo(0, canvas.height / 2 + wave1)
      
      for (let x = 0; x < canvas.width; x += 10) {
        const y = canvas.height / 2 + 
          Math.sin((x / canvas.width) * Math.PI * 4 + time * 0.001 * speed) * 30 +
          Math.cos((x / canvas.width) * Math.PI * 2 + time * 0.0015 * speed) * 20
        ctx.lineTo(x, y)
      }
      
      ctx.lineTo(canvas.width, canvas.height)
      ctx.lineTo(0, canvas.height)
      ctx.closePath()
      ctx.fill()

      time += 16
      animationFrameId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [color, speed])

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 pointer-events-none opacity-30', className)}
    />
  )
}

