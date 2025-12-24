'use client'

import { useState, useEffect } from 'react'
import { Swords, Shield, Trophy, Zap, Target, Users } from 'lucide-react'
import { SpotlightCard } from '@/components/ui/animated-card'
import { cn } from '@/lib/utils'

const features = [
  { 
    icon: Swords, 
    title: 'Combate PVP', 
    desc: 'Sistema optimizado con feedback instantáneo y hitmarkers precisos',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'hover:border-red-500/30',
  },
  { 
    icon: Shield, 
    title: 'Anti-Cheat', 
    desc: 'Protección avanzada contra trampas para un juego justo',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'hover:border-green-500/30',
  },
  { 
    icon: Trophy, 
    title: 'Rankings', 
    desc: 'Sistema de clasificación competitivo en tiempo real',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'hover:border-yellow-500/30',
  },
  { 
    icon: Zap, 
    title: 'Bajo Ping', 
    desc: 'Servidores de alta velocidad para la mejor latencia',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'hover:border-purple-500/30',
  },
  { 
    icon: Target, 
    title: 'Hit Registration', 
    desc: 'Detección de daño precisa en cada disparo',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'hover:border-orange-500/30',
  },
  { 
    icon: Users, 
    title: 'Comunidad', 
    desc: 'Miles de jugadores activos y eventos regulares',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'hover:border-blue-500/30',
  },
]

export function Features() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="py-20 md:py-28">
      <div className="container-wide">
        <div className={cn(
          'text-center mb-12 md:mb-16 transition-all duration-700',
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Características
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            ¿Por qué <span className="text-primary">FastPVP</span>?
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Todo lo que necesitas para una experiencia PVP de primer nivel
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={cn(
                'transition-all duration-500 ease-out',
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <SpotlightCard className={cn('h-full transition-colors', feature.borderColor)}>
                <div className="p-6">
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                    feature.bgColor
                  )}>
                    <feature.icon className={cn('w-6 h-6', feature.color)} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
