'use client'

import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
}

interface CursorParticlesProps {
  count?: number
  color?: string
  size?: number
}

export function CursorParticles({ count = 5, color = '#fc043c', size = 3 }: CursorParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const mousePos = useRef({ x: 0, y: 0 })
  const animationFrame = useRef<number>()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      
      const newParticles: Particle[] = []
      for (let i = 0; i < count; i++) {
        newParticles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
          maxLife: 1,
        })
      }
      setParticles((prev) => [...prev, ...newParticles].slice(-50))
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [count])

  useEffect(() => {
    const animate = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.02,
            vx: p.vx * 0.98,
            vy: p.vy * 0.98,
          }))
          .filter((p) => p.life > 0)
      )
      animationFrame.current = requestAnimationFrame(animate)
    }

    animationFrame.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            opacity: particle.life,
            transform: `translate(-50%, -50%)`,
            transition: 'opacity 0.1s',
          }}
        />
      ))}
    </div>
  )
}

