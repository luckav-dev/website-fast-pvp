'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, RefreshCw, Users, User, WifiOff, Clock } from 'lucide-react'
import { Navbar } from '@/components/header/navbar'
import { Footer } from '@/components/footer/footer'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion-wrapper'
import { SpotlightCard } from '@/components/ui/animated-card'
import { SkeletonPlayerList } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface Player {
  id: number
  name: string
  ping: number
}

interface ServerData {
  online: boolean
  players: { online: number; max: number; list: Player[] }
}

export default function PlayersPage() {
  const [data, setData] = useState<ServerData | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchPlayers = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/server-stats')
      const newData = await res.json()
      setData(newData)
      setLastUpdate(new Date())
    } catch {
      setData({ online: false, players: { online: 0, max: 64, list: [] } })
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPlayers()
    const i = setInterval(fetchPlayers, 15000)
    return () => clearInterval(i)
  }, [])

  const filtered = useMemo(() => {
    if (!data?.players.list) return []
    if (!search) return data.players.list
    const q = search.toLowerCase()
    return data.players.list.filter(p => p.name.toLowerCase().includes(q) || p.id.toString().includes(q))
  }, [data?.players.list, search])

  const highlightText = (text: string, query: string) => {
    if (!query) return text
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-primary/20 text-primary px-0.5 rounded">{part}</mark>
      ) : part
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative z-10 pt-24 pb-16">
        <div className="container-narrow">
          <FadeIn className="section-header">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h1 className="section-title">Jugadores Online</h1>
            <p className="section-description">
              {data?.online 
                ? `${data.players.online} de ${data.players.max} conectados` 
                : 'Servidor offline'}
            </p>
            {lastUpdate && (
              <div className="flex items-center justify-center gap-2 mt-2 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>Actualizado: {lastUpdate.toLocaleTimeString('es-ES')}</span>
              </div>
            )}
          </FadeIn>

          <FadeIn delay={0.1} className="flex gap-2 mb-6 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={cn(
                  'w-full pl-9 pr-3 py-2.5 rounded-xl text-sm',
                  'bg-card border border-border',
                  'placeholder:text-muted-foreground',
                  'focus:outline-none focus:ring-2 focus:ring-primary/50'
                )}
              />
            </div>
            <button 
              onClick={fetchPlayers} 
              disabled={loading}
              className="px-3 rounded-xl bg-card border border-border hover:bg-muted transition-colors disabled:opacity-50"
            >
              <RefreshCw className={cn('w-4 h-4', loading && 'animate-spin')} />
            </button>
          </FadeIn>

          <FadeIn delay={0.2}>
            {loading && !data ? (
              <SkeletonPlayerList />
            ) : !data?.online ? (
              <SpotlightCard className="p-10 text-center max-w-md mx-auto animate-fade-in">
                <WifiOff className="w-10 h-10 mx-auto mb-3 text-red-500/50" />
                <h3 className="font-semibold mb-1">Servidor Offline</h3>
                <p className="text-muted-foreground text-sm">No se pudo conectar</p>
              </SpotlightCard>
            ) : filtered.length === 0 ? (
              <SpotlightCard className="p-10 text-center max-w-md mx-auto animate-fade-in">
                <Users className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50" />
                <h3 className="font-semibold mb-1">
                  {search ? 'Sin resultados' : 'Sin jugadores'}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {search ? 'Intenta otro término' : 'Nadie conectado'}
                </p>
              </SpotlightCard>
            ) : (
              <SpotlightCard className="overflow-hidden">
                <div className="grid grid-cols-12 gap-3 px-4 py-2.5 bg-muted/30 border-b border-border text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  <div className="col-span-2">ID</div>
                  <div className="col-span-7">Nombre</div>
                  <div className="col-span-3 text-right">Ping</div>
                </div>
                
                <StaggerContainer className="divide-y divide-border">
                  {filtered.map((player, index) => (
                    <StaggerItem key={player.id}>
                      <div 
                        className={cn(
                          'grid grid-cols-12 gap-3 px-4 py-3 hover:bg-muted/20 transition-all duration-200',
                          'animate-slide-in'
                        )}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="col-span-2 flex items-center">
                          <span className="text-muted-foreground font-mono text-xs">#{player.id}</span>
                        </div>
                        <div className="col-span-7 flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 transition-transform duration-200 hover:scale-110">
                            <User className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <span className="font-medium text-sm truncate">
                            {search ? highlightText(player.name, search) : player.name}
                          </span>
                        </div>
                        <div className="col-span-3 flex items-center justify-end">
                          <span className={cn(
                            'px-2 py-0.5 rounded text-xs font-mono transition-colors',
                            player.ping < 50 && 'bg-green-500/20 text-green-400 border border-green-500/30',
                            player.ping >= 50 && player.ping < 100 && 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
                            player.ping >= 100 && 'bg-red-500/20 text-red-400 border border-red-500/30'
                          )}>
                            {player.ping}ms
                          </span>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </SpotlightCard>
            )}
          </FadeIn>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
