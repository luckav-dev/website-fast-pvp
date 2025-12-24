'use client'

import { Users, Gamepad2, MessageCircle, Server } from 'lucide-react'
import { useServerStatus } from '@/hooks/use-server-status'
import { CountUp } from '@/components/ui/animated-counter'
import { SpotlightCard } from '@/components/ui/animated-card'
import { cn } from '@/lib/utils'

export function Stats() {
  const { status } = useServerStatus()

  const stats = [
    { 
      icon: Users, 
      label: 'Online', 
      value: status.players.online,
      max: status.players.max,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      showMax: true
    },
    { 
      icon: Gamepad2, 
      label: 'Jugadores', 
      value: 5000,
      suffix: '+',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
    },
    { 
      icon: MessageCircle, 
      label: 'Discord', 
      value: 15000,
      suffix: '+',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    { 
      icon: Server, 
      label: 'Uptime', 
      value: 99.9,
      suffix: '%',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      decimals: 1
    },
  ]

  return (
    <section className="py-16 -mt-16 relative z-20">
      <div className="container-narrow">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div 
              key={stat.label}
              className="transition-all duration-500 ease-out"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <SpotlightCard className={cn('h-full border', stat.borderColor)}>
                <div className="p-5 md:p-6 text-center">
                  <div className={cn(
                    'w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center',
                    stat.bgColor
                  )}>
                    <stat.icon className={cn('w-6 h-6', stat.color)} />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold mb-1">
                    <CountUp 
                      end={stat.value} 
                      duration={2} 
                      decimals={stat.decimals || 0}
                    />
                    {stat.showMax && (
                      <span className="text-muted-foreground text-lg">/{stat.max}</span>
                    )}
                    {stat.suffix && (
                      <span className="text-muted-foreground text-lg">{stat.suffix}</span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
