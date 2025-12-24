'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Gamepad2 } from 'lucide-react'
import { serverConfig } from '@/lib/config'
import { BorderBeamCard } from '@/components/ui/animated-card'
import { cn } from '@/lib/utils'

export function CTA() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="py-20 md:py-28 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20" />
      </div>
      
      <div className="container-narrow relative z-10">
        <div className={cn(
          'transition-all duration-700',
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}>
          <BorderBeamCard duration={6}>
            <div className="p-8 md:p-14 text-center">
              <div className={cn(
                'transition-all duration-700 delay-100',
                mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              )}>
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Gamepad2 className="w-8 h-8 text-primary" />
                </div>
              </div>

              <div className={cn(
                'transition-all duration-700 delay-200',
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                  ¿Listo para <span className="text-primary">jugar</span>?
                </h2>
              </div>

              <div className={cn(
                'transition-all duration-700 delay-300',
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}>
                <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-md mx-auto">
                  Únete a la comunidad PVP más activa de FiveM
                </p>
              </div>

              <div className={cn(
                'transition-all duration-700 delay-[400ms]',
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={serverConfig.fivem.connectUrl}
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 text-base font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Conectar
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href={serverConfig.discord.inviteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 text-base font-semibold rounded-xl bg-card border border-border hover:bg-secondary transition-colors"
                  >
                    Discord
                  </a>
                </div>
              </div>
            </div>
          </BorderBeamCard>
        </div>
      </div>
    </section>
  )
}
