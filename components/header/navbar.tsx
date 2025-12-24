'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { serverConfig } from '@/lib/config'
import { DiscordIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

const NAV = [
  { name: 'Inicio', href: '/' },
  { name: 'Jugadores', href: '/players' },
  { name: 'Rankings', href: '/leaderboard' },
  { name: 'Reglas', href: '/rules' },
  { name: 'Staff', href: '/staff' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const handleNavClick = useCallback((href: string) => {
    setOpen(false)
    router.push(href)
  }, [router])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled 
          ? 'bg-background/95 backdrop-blur-lg border-b border-border' 
          : 'bg-background/50 backdrop-blur-sm'
      )}
    >
      <nav className="container-wide h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image src={serverConfig.logo} alt="" width={100} height={100} priority />
          <span className="font-bold group-hover:text-primary transition-colors hidden sm:inline">
            {serverConfig.name}
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-card/80 border border-border">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors',
                pathname === item.href 
                  ? 'text-foreground bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={serverConfig.discord.inviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#5865F2] text-white text-sm font-semibold rounded-full hover:bg-[#4752C4] transition-colors"
          >
            <DiscordIcon className="w-4 h-4" />
            Discord
          </a>
          
          <button 
            onClick={() => setOpen(!open)} 
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container-wide py-3 space-y-1">
            {NAV.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  'block w-full text-left px-4 py-3 rounded-xl font-medium transition-colors',
                  pathname === item.href 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:bg-muted active:bg-muted'
                )}
              >
                {item.name}
              </button>
            ))}
            <a
              href={serverConfig.discord.inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mt-2 px-4 py-3 bg-[#5865F2] text-white rounded-xl font-semibold"
            >
              <DiscordIcon className="w-4 h-4" />
              Discord
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
