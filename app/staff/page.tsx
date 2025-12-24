'use client'

import { Crown, Code, Shield, Headphones, Users, ExternalLink } from 'lucide-react'
import { Navbar } from '@/components/header/navbar'
import { Footer } from '@/components/footer/footer'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion-wrapper'
import { SpotlightCard, GlowingCard } from '@/components/ui/animated-card'
import { DiscordIcon } from '@/components/ui/icons'
import { CountUp } from '@/components/ui/animated-counter'
import { serverConfig } from '@/lib/config'
import { cn } from '@/lib/utils'

const ROLES = [
  { name: 'Admin', icon: Crown, color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', count: 2 },
  { name: 'Dev', icon: Code, color: 'text-green-400', bgColor: 'bg-green-500/10', count: 1 },
  { name: 'Mod', icon: Shield, color: 'text-primary', bgColor: 'bg-primary/10', count: 3 },
  { name: 'Support', icon: Headphones, color: 'text-blue-400', bgColor: 'bg-blue-500/10', count: 2 },
]

const STAFF = [
  { name: 'Owner', role: 'Fundador', color: '#ffd700' },
  { name: 'CoAdmin', role: 'Co-Admin', color: '#ffd700' },
  { name: 'DevMaster', role: 'Developer', color: '#22c55e' },
  { name: 'ModeratorPro', role: 'Head Mod', color: '#fc043c' },
  { name: 'Guardian01', role: 'Moderator', color: '#fc043c' },
  { name: 'WatchDog', role: 'Moderator', color: '#fc043c' },
  { name: 'HelpDesk', role: 'Support', color: '#5865F2' },
  { name: 'Helper01', role: 'Support', color: '#5865F2' },
]

export default function StaffPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative z-10 pt-24 pb-16">
        <div className="container-wide">
          <FadeIn className="section-header">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h1 className="section-title">Staff</h1>
            <p className="section-description">Nuestro equipo</p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {ROLES.map((role) => (
              <StaggerItem key={role.name}>
                <SpotlightCard className="p-4 text-center">
                  <div className={cn('w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center', role.bgColor)}>
                    <role.icon className={cn('w-5 h-5', role.color)} />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{role.name}</p>
                  <p className={cn('text-xl font-bold', role.color)}>
                    <CountUp end={role.count} duration={1.5} />
                  </p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
            {STAFF.map((member) => (
              <StaggerItem key={member.name}>
                <SpotlightCard className="h-full text-center" spotlightColor={`${member.color}10`}>
                  <div className="p-4">
                    <div
                      className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center text-lg font-bold mb-3"
                      style={{ backgroundColor: `${member.color}15`, color: member.color }}
                    >
                      {member.name[0]}
                    </div>
                    <h3 className="font-semibold text-sm mb-0.5">{member.name}</h3>
                    <p className="text-xs font-medium" style={{ color: member.color }}>
                      {member.role}
                    </p>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <GlowingCard className="p-6 text-center max-w-lg mx-auto">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                <Crown className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-lg font-bold mb-2">¿Quieres unirte?</h2>
              <p className="text-muted-foreground text-sm mb-4">
                Buscamos personas activas y responsables
              </p>
              <a
                href={serverConfig.discord.inviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#5865F2] text-white rounded-xl font-semibold hover:bg-[#4752C4] transition-colors"
              >
                <DiscordIcon className="w-4 h-4" />
                Postúlate
              </a>
            </GlowingCard>
          </FadeIn>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
