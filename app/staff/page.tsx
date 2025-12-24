'use client'

import { Crown, Code, Shield, Headphones, Users, ExternalLink, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { Navbar } from '@/components/header/navbar'
import { Footer } from '@/components/footer/footer'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion-wrapper'
import { SpotlightCard, GlowingCard, TiltCard } from '@/components/ui/animated-card'
import { DiscordIcon } from '@/components/ui/icons'
import { CountUp } from '@/components/ui/animated-counter'
import { Badge } from '@/components/ui/badge'
import { Tooltip } from '@/components/ui/tooltip'
import { useDiscordAvatar, type DiscordStatus } from '@/hooks/use-discord-avatar'
import { serverConfig } from '@/lib/config'
import { cn } from '@/lib/utils'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

const ROLES = [
  { name: 'Admin', icon: Crown, color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', count: 2 },
  { name: 'Dev', icon: Code, color: 'text-green-400', bgColor: 'bg-green-500/10', count: 1 },
  { name: 'Mod', icon: Shield, color: 'text-primary', bgColor: 'bg-primary/10', count: 0 },
  { name: 'Support', icon: Headphones, color: 'text-blue-400', bgColor: 'bg-blue-500/10', count: 0 },
]

interface StaffMember {
  name: string
  role: string
  roleType: 'admin' | 'dev' | 'mod' | 'support'
  discordId: string
  color: string
  description?: string
}

const STAFF: StaffMember[] = [
  { 
    name: 'XoXoPistolas', 
    role: 'Fundador & Admin', 
    roleType: 'admin',
    discordId: '1146819293833613373',
    color: '#ffd700',
    description: 'Fundador del servidor'
  },
  { 
    name: 'Benny999', 
    role: 'Co-Admin', 
    roleType: 'admin',
    discordId: '1329909891992911982',
    color: '#ffd700',
    description: 'Co-Administrador'
  },
]

function StatusIndicator({ status }: { status: DiscordStatus }) {
  const statusConfig = {
    online: { 
      color: 'bg-green-500', 
      border: 'border-green-500',
      glow: 'shadow-[0_0_8px_rgba(34,197,94,0.8)]',
      label: 'En línea' 
    },
    idle: { 
      color: 'bg-yellow-500', 
      border: 'border-yellow-500',
      glow: 'shadow-[0_0_8px_rgba(234,179,8,0.8)]',
      label: 'Ausente' 
    },
    dnd: { 
      color: 'bg-red-500', 
      border: 'border-red-500',
      glow: 'shadow-[0_0_8px_rgba(239,68,68,0.8)]',
      label: 'No molestar' 
    },
    offline: { 
      color: 'bg-gray-500', 
      border: 'border-gray-500',
      glow: '',
      label: 'Desconectado' 
    },
  }

  const config = statusConfig[status]

  return (
    <div className={cn(
      'absolute bottom-0 right-0 w-6 h-6 rounded-full border-3 border-background z-30',
      'flex items-center justify-center',
      config.color,
      config.glow
    )}>
      <div className={cn(
        'w-3 h-3 rounded-full',
        config.color,
        status === 'online' && 'animate-pulse',
        status === 'dnd' && 'bg-red-600'
      )} />
    </div>
  )
}

function StaffCard({ member }: { member: StaffMember }) {
  const { user, loading } = useDiscordAvatar(member.discordId)
  const roleConfig = ROLES.find(r => r.name.toLowerCase() === member.roleType)
  const status: DiscordStatus = user?.status || 'offline'

  return (
    <TiltCard rotationFactor={5}>
      <SpotlightCard 
        className={cn(
          'h-full text-center group relative overflow-hidden',
          'bg-card/60 backdrop-blur-sm border-2',
          'hover:border-primary/50 transition-all duration-300'
        )}
        spotlightColor={`${member.color}15`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="p-6 relative z-10">
          <div className="relative mb-6">
            <div className="relative w-36 h-36 mx-auto">
              {loading ? (
                <div className="w-36 h-36 mx-auto rounded-full bg-muted flex items-center justify-center border-4 border-border/50">
                  <LoadingSpinner size="lg" className="text-primary" />
                </div>
              ) : (
                <>
                  {/* Glow effect */}
                  <div 
                    className="absolute inset-0 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                    style={{ backgroundColor: member.color }}
                  />
                  
                  {/* Avatar container with animated border */}
                  <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-border/30 group-hover:border-primary/60 transition-all duration-500 shadow-2xl group-hover:shadow-[0_0_40px_rgba(252,4,60,0.4)]">
                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />
                    
                    {/* Avatar image */}
                    <Image
                      src={user?.avatar || `https://cdn.discordapp.com/embed/avatars/${parseInt(member.discordId) % 5}.png`}
                      alt={member.name}
                      width={144}
                      height={144}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `https://cdn.discordapp.com/embed/avatars/${parseInt(member.discordId) % 5}.png`
                      }}
                    />
                    
                    {/* Status indicator */}
                    <StatusIndicator status={status} />
                  </div>
                  
                  {/* Role badge */}
                  <div 
                    className="absolute -bottom-1 -right-1 w-12 h-12 rounded-full flex items-center justify-center border-4 border-background shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 z-20 overflow-hidden"
                    style={{ backgroundColor: member.color }}
                  >
                    {/* Dark overlay for better contrast */}
                    <div className="absolute inset-0 bg-black/30" />
                    {roleConfig && (
                      <roleConfig.icon className={cn(
                        'w-6 h-6 relative z-10',
                        'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]',
                        'filter brightness-110'
                      )} />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
            {user?.username || member.name}
          </h3>
          
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge 
              variant={member.roleType === 'admin' ? 'warning' : member.roleType === 'dev' ? 'success' : 'default'}
              className="text-xs font-semibold px-3 py-1"
            >
              {member.role}
            </Badge>
          </div>
          

          {member.description && (
            <p className="text-sm text-muted-foreground mb-4 min-h-[20px]">
              {member.description}
            </p>
          )}

          <Tooltip content={`Ver perfil de ${user?.username || member.name} en Discord`}>
            <a
              href={`https://discord.com/users/${member.discordId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5865F2]/10 hover:bg-[#5865F2]/20 text-[#5865F2] transition-all text-sm font-semibold group/btn hover:scale-105 active:scale-95 border border-[#5865F2]/20 hover:border-[#5865F2]/40"
            >
              <DiscordIcon className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              <span>Ver en Discord</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
            </a>
          </Tooltip>
        </div>
      </SpotlightCard>
    </TiltCard>
  )
}

export default function StaffPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative z-10 pt-24 pb-16">
        <div className="container-wide">
          <FadeIn className="section-header mb-12">
            <div className="relative inline-block mx-auto mb-6">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150" />
              <div className="relative w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                <Users className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="section-title">Equipo Staff</h1>
            <p className="section-description">
              Conoce al equipo que hace posible FastPVP
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {ROLES.map((role) => {
                const count = STAFF.filter(m => m.roleType === role.name.toLowerCase()).length
                return (
                  <StaggerItem key={role.name}>
                    <SpotlightCard className="p-5 text-center group hover:scale-105 transition-transform">
                      <div className={cn(
                        'w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center transition-all duration-300',
                        role.bgColor,
                        'group-hover:scale-110 group-hover:rotate-3'
                      )}>
                        <role.icon className={cn('w-7 h-7 transition-transform duration-300 group-hover:scale-110', role.color)} />
                      </div>
                      <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wider">{role.name}</p>
                      <p className={cn('text-2xl font-bold', role.color)}>
                        <CountUp end={count} duration={1.5} />
                      </p>
                    </SpotlightCard>
                  </StaggerItem>
                )
              })}
            </StaggerContainer>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mb-8">
              <div className="flex items-center justify-center gap-2 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                <div className="flex items-center gap-2 px-4">
                  <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                  <h2 className="text-2xl font-bold">Miembros del Staff</h2>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>
              
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {STAFF.map((member, index) => (
                  <StaggerItem key={member.discordId}>
                    <StaffCard member={member} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="relative max-w-3xl mx-auto">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl" />
              
              {/* Main card */}
              <SpotlightCard className="relative p-10 md:p-12 text-center border-2 border-primary/20 bg-card/80 backdrop-blur-xl overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full scale-150 animate-pulse-glow" />
                    <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center border-2 border-primary/30 backdrop-blur-sm">
                      <Crown className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                    ¿Quieres formar parte del equipo?
                  </h2>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                    Estamos buscando personas activas, responsables y comprometidas para ayudar a hacer crecer nuestra comunidad
                  </p>
                  
                  {/* CTA Button */}
                  <a
                    href={serverConfig.discord.inviteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#5865F2] to-[#4752C4] text-white rounded-2xl font-bold text-base hover:from-[#4752C4] hover:to-[#3c45a5] transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-[#5865F2]/30 hover:shadow-[#5865F2]/50 group"
                  >
                    <DiscordIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Únete a nuestro Discord</span>
                    <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                </div>
              </SpotlightCard>
            </div>
          </FadeIn>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
