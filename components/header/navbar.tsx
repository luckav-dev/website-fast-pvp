'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Search } from 'lucide-react'
import { serverConfig } from '@/lib/config'
import { DiscordIcon } from '@/components/ui/icons'
import { CommandMenu } from '@/components/ui/command-menu'
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

  const commandItems = [
    { id: 'home', label: 'Inicio', href: '/' },
    { id: 'players', label: 'Jugadores', href: '/players' },
    { id: 'leaderboard', label: 'Rankings', href: '/leaderboard' },
    { id: 'rules', label: 'Reglas', href: '/rules' },
    { id: 'staff', label: 'Staff', href: '/staff' },
    { id: 'discord', label: 'Discord', href: serverConfig.discord.inviteUrl, action: () => window.open(serverConfig.discord.inviteUrl, '_blank') },
  ]

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
          ? 'bg-background/95 backdrop-blur-xl border-b border-border shadow-lg shadow-background/50' 
          : 'bg-background/50 backdrop-blur-md'
      )}
    >
      <nav className="container-wide h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Image 
              src={serverConfig.logo} 
              alt="" 
              width={100} 
              height={100} 
              priority 
              className="relative z-10 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <span className="font-bold group-hover:text-primary transition-colors hidden sm:inline">
            {serverConfig.name}
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-card/80 border border-border backdrop-blur-md">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200',
                pathname === item.href 
                  ? 'text-foreground bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              {item.name}
              {pathname === item.href && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary rounded-full animate-pulse" />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <CommandMenu 
            items={commandItems}
            trigger={
              <button
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm"
                title="Buscar (Ctrl+K)"
              >
                <Search className="w-4 h-4" />
                <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  Ctrl K
                </kbd>
              </button>
            }
          />
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
        <div 
          className={cn(
            'md:hidden bg-background/95 backdrop-blur-xl border-b border-border',
            'animate-in slide-in-from-top-2 duration-300'
          )}
        >
          <div className="container-wide py-3 space-y-1">
            {NAV.map((item, index) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  'block w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200',
                  'animate-in fade-in-0 slide-in-from-left-4',
                  pathname === item.href 
                    ? 'bg-primary/10 text-primary border-l-2 border-primary' 
                    : 'text-muted-foreground hover:bg-muted active:bg-muted hover:translate-x-1'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.name}
              </button>
            ))}
            <a
              href={serverConfig.discord.inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mt-2 px-4 py-3 bg-[#5865F2] text-white rounded-xl font-semibold hover:bg-[#4752C4] transition-colors animate-in fade-in-0 slide-in-from-bottom-2"
              style={{ animationDelay: `${NAV.length * 50}ms` }}
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
