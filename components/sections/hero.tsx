'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Users, Copy, Check, Sparkles, ChevronDown } from 'lucide-react'
import { serverConfig } from '@/lib/config'
import { useServerStatus } from '@/hooks/use-server-status'
import { useState, useEffect } from 'react'
import { DiscordIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export function Hero() {
  const { status } = useServerStatus()
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)
  const ip = `${serverConfig.fivem.ip}:${serverConfig.fivem.port}`

  useEffect(() => {
    setMounted(true)
  }, [])

  const copyIP = () => {
    navigator.clipboard.writeText(ip)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />

      <div className="relative z-10 container-wide py-16 md:py-24 flex-1 flex flex-col items-center justify-center">
        <div className="text-center max-w-3xl mx-auto">
          <div className={cn(
            'transition-all duration-700 ease-out',
            mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          )}>
            <div className="relative inline-block mb-5">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150" />
              <Image
                src={serverConfig.logo}
                alt={serverConfig.name}
                width={280}
                height={180}
                className="relative z-10"
                priority
              />
            </div>
          </div>

          <div className={cn(
            'transition-all duration-700 delay-100 ease-out',
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Servidor FiveM PVP</span>
            </div>
          </div>

          <div className={cn(
            'transition-all duration-700 delay-200 ease-out',
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-3">
              {serverConfig.name}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-5">
              {serverConfig.tagline}
            </p>
          </div>

          <div className={cn(
            'transition-all duration-700 delay-300 ease-out',
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto mb-6 leading-relaxed">
              El servidor PVP más competitivo de FiveM. Combate intenso, 
              rankings en tiempo real y la mejor comunidad.
            </p>
          </div>

          <div className={cn(
            'transition-all duration-700 delay-[400ms] ease-out',
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <a
                href={serverConfig.fivem.connectUrl}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Jugar Ahora
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={serverConfig.discord.inviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 text-sm font-semibold rounded-xl bg-[#5865F2] text-white hover:bg-[#4752C4] transition-colors"
              >
                <DiscordIcon className="w-4 h-4" />
                Discord
              </a>
            </div>
          </div>

          <div className={cn(
            'transition-all duration-700 delay-500 ease-out',
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/players"
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm',
                  'bg-card/80 border border-border hover:border-primary/50',
                  'transition-colors'
                )}
              >
                <span className="relative flex h-2 w-2">
                  {status.online && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  )}
                  <span className={cn(
                    'relative inline-flex rounded-full h-2 w-2',
                    status.online ? 'bg-green-500' : 'bg-red-500'
                  )} />
                </span>
                <Users className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="font-medium">
                  {status.online ? `${status.players.online}/${status.players.max}` : 'Offline'}
                </span>
              </Link>

              <button
                onClick={copyIP}
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm',
                  'bg-card/80 border border-border hover:border-primary/50',
                  'transition-colors font-mono'
                )}
              >
                <span className="text-muted-foreground">{ip}</span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-green-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-5 h-5 text-muted-foreground" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
