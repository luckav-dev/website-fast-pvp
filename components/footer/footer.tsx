'use client'

import Link from 'next/link'
import Image from 'next/image'
import { serverConfig } from '@/lib/config'
import { ExternalLink } from 'lucide-react'
import { DiscordIcon, YouTubeIcon, TwitterIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

const LINKS = [
  { name: 'Jugadores', href: '/players' },
  { name: 'Rankings', href: '/leaderboard' },
  { name: 'Reglas', href: '/rules' },
  { name: 'Staff', href: '/staff' },
]

const SOCIALS = [
  { name: 'YouTube', icon: YouTubeIcon, href: serverConfig.social.youtube, color: 'hover:text-red-500' },
  { name: 'Twitter', icon: TwitterIcon, href: serverConfig.social.twitter, color: 'hover:text-sky-400' },
  { name: 'Discord', icon: DiscordIcon, href: serverConfig.discord.inviteUrl, color: 'hover:text-[#5865F2]' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="container-wide py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-3">
              <Image src={serverConfig.logo} alt="" width={36} height={36} />
              <div>
                <span className="font-bold block">{serverConfig.name}</span>
                <span className="text-xs text-muted-foreground">{serverConfig.tagline}</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm mb-4">
              El servidor PVP más competitivo de FiveM. Únete y demuestra tu habilidad.
            </p>
            <div className="flex gap-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={cn(
                    'w-9 h-9 rounded-lg bg-card border border-border',
                    'flex items-center justify-center',
                    'text-muted-foreground transition-colors',
                    social.color
                  )}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Enlaces</h4>
            <ul className="space-y-2">
              {LINKS.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Servidor</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="font-mono text-xs">{serverConfig.fivem.ip}:{serverConfig.fivem.port}</li>
              <li>
                <a 
                  href={serverConfig.fivem.connectUrl}
                  className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  Conectar
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {serverConfig.name}</p>
          <p>Hecho con <span className="text-primary">❤</span> para la comunidad</p>
        </div>
      </div>
    </footer>
  )
}
