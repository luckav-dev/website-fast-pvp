'use client'

import { Users, Gamepad2, MessageCircle, Server } from 'lucide-react'
import { IconTrendingUp, IconUsers, IconBrandDiscord } from '@tabler/icons-react'
import { useServerStatus } from '@/hooks/use-server-status'
import { CountUp } from '@/components/ui/animated-counter'
import { SpotlightCard } from '@/components/ui/animated-card'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

export function Stats() {
  const { status } = useServerStatus()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const stats = [
    { 
      icon: Users, 
      label: 'Online', 
      value: status.players.online,
      max: status.players.max,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      showMax: true,
      showProgress: true,
      badge: status.players.online > status.players.max * 0.8 ? 'hot' : status.players.online > 0 ? 'success' : undefined
    },
    { 
      icon: Gamepad2, 
      label: 'Jugadores', 
      value: 5000,
      suffix: '+',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      badge: 'new' as const
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
      decimals: 1,
      badge: 'success' as const
    },
  ]

  return (
    <section className="py-16 -mt-16 relative z-20">
      <div className="container-narrow">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div 
              key={stat.label}
              className={cn(
                'transition-all duration-500 ease-out',
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <SpotlightCard className={cn('h-full border group hover:border-primary/40 transition-colors', stat.borderColor)}>
                <div className="p-5 md:p-6 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className={cn(
                    'w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-all duration-300',
                    stat.bgColor,
                    'group-hover:scale-110 group-hover:rotate-3'
                  )}>
                    <stat.icon className={cn('w-6 h-6 transition-transform duration-300 group-hover:scale-110', stat.color)} />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold mb-1 relative z-10">
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
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                    {stat.badge && (
                      <Badge variant={stat.badge} className="text-xs" />
                    )}
                  </div>
                  {stat.showProgress && (
                    <div className="mt-3 relative z-10">
                      <ProgressBar 
                        value={stat.value} 
                        max={stat.max} 
                        color={stat.value > stat.max * 0.8 ? 'red' : stat.value > stat.max * 0.5 ? 'yellow' : 'green'}
                        animated={mounted}
                      />
                    </div>
                  )}
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
