'use client'

import { useState } from 'react'
import { Search, Trophy, Crown, Medal, Flame, TrendingUp } from 'lucide-react'
import { Navbar } from '@/components/header/navbar'
import { Footer } from '@/components/footer/footer'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion-wrapper'
import { SpotlightCard } from '@/components/ui/animated-card'
import { CountUp } from '@/components/ui/animated-counter'
import { cn } from '@/lib/utils'

const PLAYERS = [
  { rank: 1, name: 'DarkShadow', kills: 15234, deaths: 3421, kd: 4.45, streak: 28 },
  { rank: 2, name: 'ProSniper2024', kills: 14521, deaths: 3890, kd: 3.73, streak: 22 },
  { rank: 3, name: 'NightWolf', kills: 13890, deaths: 4120, kd: 3.37, streak: 19 },
  { rank: 4, name: 'ThunderStrike', kills: 12456, deaths: 4230, kd: 2.94, streak: 17 },
  { rank: 5, name: 'PhoenixRise', kills: 11234, deaths: 4567, kd: 2.46, streak: 15 },
  { rank: 6, name: 'ViperKing', kills: 10987, deaths: 4890, kd: 2.25, streak: 14 },
  { rank: 7, name: 'GhostRider', kills: 10234, deaths: 5123, kd: 2.00, streak: 12 },
  { rank: 8, name: 'BlazeFury', kills: 9876, deaths: 5234, kd: 1.89, streak: 11 },
  { rank: 9, name: 'ShadowHunter', kills: 9234, deaths: 5456, kd: 1.69, streak: 10 },
  { rank: 10, name: 'IronWill', kills: 8765, deaths: 5678, kd: 1.54, streak: 9 },
]

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return (
    <div className="w-7 h-7 rounded-lg bg-yellow-500/20 flex items-center justify-center">
      <Crown className="w-3.5 h-3.5 text-yellow-400" />
    </div>
  )
  if (rank === 2) return (
    <div className="w-7 h-7 rounded-lg bg-gray-400/20 flex items-center justify-center">
      <Medal className="w-3.5 h-3.5 text-gray-300" />
    </div>
  )
  if (rank === 3) return (
    <div className="w-7 h-7 rounded-lg bg-amber-600/20 flex items-center justify-center">
      <Medal className="w-3.5 h-3.5 text-amber-500" />
    </div>
  )
  return (
    <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center">
      <span className="text-muted-foreground text-xs font-medium">{rank}</span>
    </div>
  )
}

export default function LeaderboardPage() {
  const [search, setSearch] = useState('')
  const filtered = search 
    ? PLAYERS.filter(p => p.name.toLowerCase().includes(search.toLowerCase())) 
    : PLAYERS

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative z-10 pt-24 pb-16">
        <div className="container-narrow">
          <FadeIn className="section-header">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-yellow-500/10 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
            <h1 className="section-title">Rankings</h1>
            <p className="section-description">Los mejores jugadores</p>
          </FadeIn>

          <FadeIn delay={0.1} className="max-w-sm mx-auto mb-8">
            <div className="relative">
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
          </FadeIn>

          <StaggerContainer className="space-y-2">
            <div className="grid grid-cols-12 gap-2 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wider">
              <div className="col-span-1">#</div>
              <div className="col-span-4">Jugador</div>
              <div className="col-span-2 text-right">Kills</div>
              <div className="col-span-2 text-right hidden sm:block">Muertes</div>
              <div className="col-span-2 text-right">K/D</div>
              <div className="col-span-1 text-right hidden md:flex justify-end">
                <Flame className="w-3 h-3 text-orange-400" />
              </div>
            </div>

            {filtered.map((player, i) => (
              <StaggerItem key={player.name}>
                <SpotlightCard
                  className={cn(player.rank <= 3 && 'border-primary/20')}
                  spotlightColor={
                    player.rank === 1 ? 'rgba(234, 179, 8, 0.08)' :
                    player.rank === 2 ? 'rgba(156, 163, 175, 0.08)' :
                    player.rank === 3 ? 'rgba(217, 119, 6, 0.08)' :
                    'rgba(252, 4, 60, 0.04)'
                  }
                >
                  <div className={cn(
                    'grid grid-cols-12 gap-2 px-4 py-3',
                    player.rank <= 3 && 'bg-gradient-to-r from-primary/5 to-transparent'
                  )}>
                    <div className="col-span-1 flex items-center">
                      <RankBadge rank={player.rank} />
                    </div>
                    <div className="col-span-4 flex items-center gap-2">
                      <div className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0',
                        player.rank === 1 && 'bg-yellow-500/20 text-yellow-400',
                        player.rank === 2 && 'bg-gray-500/20 text-gray-300',
                        player.rank === 3 && 'bg-amber-600/20 text-amber-500',
                        player.rank > 3 && 'bg-muted text-muted-foreground'
                      )}>
                        {player.name[0]}
                      </div>
                      <span className="font-medium text-sm truncate">{player.name}</span>
                    </div>
                    <div className="col-span-2 flex items-center justify-end text-sm">
                      <CountUp end={player.kills} duration={1 + i * 0.05} />
                    </div>
                    <div className="col-span-2 items-center justify-end text-muted-foreground text-sm hidden sm:flex">
                      {player.deaths.toLocaleString()}
                    </div>
                    <div className="col-span-2 flex items-center justify-end">
                      <span className={cn(
                        'px-2 py-0.5 rounded text-xs font-mono font-semibold',
                        player.kd >= 3 && 'bg-green-500/10 text-green-400',
                        player.kd >= 2 && player.kd < 3 && 'bg-yellow-500/10 text-yellow-400',
                        player.kd < 2 && 'bg-muted text-muted-foreground'
                      )}>
                        {player.kd.toFixed(2)}
                      </span>
                    </div>
                    <div className="col-span-1 items-center justify-end hidden md:flex">
                      <span className="text-orange-400 text-xs font-medium flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" />
                        {player.streak}
                      </span>
                    </div>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}

            {filtered.length === 0 && (
              <FadeIn className="text-center py-10 text-muted-foreground">
                No se encontraron jugadores
              </FadeIn>
            )}
          </StaggerContainer>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
