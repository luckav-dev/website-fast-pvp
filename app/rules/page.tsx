'use client'

import { 
  Shield, MessageCircle, Gamepad2, AlertTriangle, ExternalLink,
  User, Mic, Volume2, Globe, Ban, Link2, UserX, Tag, FileText,
  Users, Swords, Target, Eye
} from 'lucide-react'
import { Navbar } from '@/components/header/navbar'
import { Footer } from '@/components/footer/footer'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion-wrapper'
import { SpotlightCard } from '@/components/ui/animated-card'
import { DiscordIcon } from '@/components/ui/icons'
import { serverConfig } from '@/lib/config'
import { cn } from '@/lib/utils'

const QUICK_RULES = [
  {
    icon: MessageCircle,
    title: 'Respeto',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Gamepad2,
    title: 'Juego Limpio',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Shield,
    title: 'Sin Cheats',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: AlertTriangle,
    title: 'Sin Toxicidad',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
  },
]

const FULL_RULES = [
  {
    id: 1,
    icon: User,
    title: 'Nombre de Usuario',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    content: 'Tu nombre de usuario no puede contener palabras ofensivas, insultos, discriminación, publicidad o contenido inapropiado. Los nombres que incumplan esta norma serán modificados y el usuario podrá recibir sanciones.'
  },
  {
    id: 2,
    icon: Mic,
    title: 'Grabación de Conversaciones',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    content: 'Está prohibido grabar conversaciones de otros jugadores sin su consentimiento expreso. Solo se permite grabar para reportar infracciones al staff, informando previamente a los involucrados.'
  },
  {
    id: 3,
    icon: Volume2,
    title: 'Modificación de Voz',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    content: 'No está permitido usar programas o herramientas que distorsionen o modifiquen tu voz de manera que perjudique la comunicación o moleste a otros jugadores.'
  },
  {
    id: 4,
    icon: Globe,
    title: 'Publicidad de Servidores',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    content: 'Queda totalmente prohibida la publicidad de otros servidores de FiveM, Discord u otras plataformas. Cualquier tipo de promoción externa resultará en sanción inmediata.'
  },
  {
    id: 5,
    icon: Ban,
    title: 'Contenido Inapropiado',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    content: 'Está prohibido compartir contenido pornográfico, racista, discriminatorio, de odio o cualquier material que viole la ley. Esto incluye imágenes, vídeos, enlaces o mensajes en cualquier canal.'
  },
  {
    id: 6,
    icon: Users,
    title: 'Cuentas Múltiples',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    content: 'Crear cuentas alternativas para evadir bans, sanciones o restricciones está terminantemente prohibido. Si se detecta, todas las cuentas serán baneadas permanentemente.'
  },
  {
    id: 7,
    icon: Link2,
    title: 'Links y Promociones',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    content: 'No está permitido enviar enlaces de referidos, promociones personales o cualquier link que te genere beneficio. Solo se permiten links relevantes y autorizados por el staff.'
  },
  {
    id: 8,
    icon: UserX,
    title: 'Acoso y Bullying',
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
    content: 'El acoso, bullying, insultos personales, amenazas o cualquier comportamiento que busque perjudicar emocional o psicológicamente a otros jugadores está estrictamente prohibido.'
  },
  {
    id: 9,
    icon: FileText,
    title: 'Cumplimiento Legal',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    content: 'Todo el contenido compartido debe cumplir con la legislación vigente. Cualquier contenido ilegal o que incite a actividades ilícitas será eliminado y el responsable sancionado.'
  },
  {
    id: 10,
    icon: Shield,
    title: 'Respeto al Staff',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    content: 'Los miembros del staff están para ayudarte y mantener el servidor. Atacar, insultar o faltar el respeto a cualquier miembro del equipo resultará en sanciones severas.'
  },
  {
    id: 11,
    icon: Tag,
    title: 'Tags y Rangos',
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/10',
    content: 'Los jugadores con tags especiales o rangos destacados que promuevan contenido externo en su perfil perderán sus privilegios. Mantén tu perfil limpio de publicidad.'
  },
]

const GAME_RULES = [
  {
    id: 1,
    icon: Swords,
    title: 'Prohibido Cheats y Hacks',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    content: 'El uso de cualquier tipo de software de trampa (aimbot, wallhack, speedhack, etc.) está terminantemente prohibido. Detección = Ban permanente sin posibilidad de apelación.'
  },
  {
    id: 2,
    icon: Target,
    title: 'No Explotar Bugs',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    content: 'Si encuentras un bug o glitch, repórtalo al staff. Explotar fallos del servidor para obtener ventaja resultará en sanción. Ayúdanos a mejorar reportando errores.'
  },
  {
    id: 3,
    icon: Users,
    title: 'No Teaming en FFA',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    content: 'En modos de todos contra todos (FFA) está prohibido aliarse con otros jugadores. Cada uno debe jugar por su cuenta. El teaming será sancionado.'
  },
  {
    id: 4,
    icon: Eye,
    title: 'No Stream Sniping',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    content: 'Está prohibido usar streams de otros jugadores para obtener información de su posición o acciones. El stream sniping arruina la experiencia y será penalizado.'
  },
  {
    id: 5,
    icon: UserX,
    title: 'Sin Asociación con Cheaters',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    content: 'No te asocies ni juegues en grupo con jugadores que usen cheats. Si juegas regularmente con un cheater conocido, podrías recibir sanciones por asociación.'
  },
]

const SANCTIONS = [
  { offense: '1ª Infracción', action: 'Advertencia oficial', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { offense: '2ª Infracción', action: 'Ban temporal (24-72h)', color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { offense: '3ª Infracción', action: 'Ban temporal (1-7 días)', color: 'text-red-400', bg: 'bg-red-500/10' },
  { offense: 'Infracción grave', action: 'Ban permanente', color: 'text-red-500', bg: 'bg-red-500/20' },
]

export default function RulesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative z-10 pt-24 pb-16">
        <div className="container-wide">
          <FadeIn className="section-header">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="section-title">Normativa del Servidor</h1>
            <p className="section-description">
              Lee atentamente todas las reglas. El desconocimiento no exime de su cumplimiento.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
            {QUICK_RULES.map((rule) => (
              <StaggerItem key={rule.title}>
                <SpotlightCard className="p-4 text-center">
                  <div className={cn('w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center', rule.bgColor)}>
                    <rule.icon className={cn('w-5 h-5', rule.color)} />
                  </div>
                  <p className="text-sm font-medium">{rule.title}</p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.1} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Normas de Conducta</h2>
                <p className="text-sm text-muted-foreground">Comportamiento en el servidor y Discord</p>
              </div>
            </div>
            
            <div className="grid gap-3">
              {FULL_RULES.map((rule, i) => (
                <SpotlightCard key={rule.id} className="p-4">
                  <div className="flex gap-4">
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', rule.bgColor)}>
                      <rule.icon className={cn('w-5 h-5', rule.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1 flex items-center gap-2">
                        <span className="text-muted-foreground text-sm">#{rule.id}</span>
                        {rule.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{rule.content}</p>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Normas de Juego</h2>
                <p className="text-sm text-muted-foreground">Reglas durante las partidas PVP</p>
              </div>
            </div>
            
            <div className="grid gap-3">
              {GAME_RULES.map((rule) => (
                <SpotlightCard key={rule.id} className="p-4">
                  <div className="flex gap-4">
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', rule.bgColor)}>
                      <rule.icon className={cn('w-5 h-5', rule.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1">{rule.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{rule.content}</p>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.3} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Sistema de Sanciones</h2>
                <p className="text-sm text-muted-foreground">Penalizaciones por incumplimiento</p>
              </div>
            </div>
            
            <SpotlightCard className="overflow-hidden">
              <div className="grid grid-cols-2 gap-px bg-border">
                {SANCTIONS.map((sanction, i) => (
                  <div key={i} className="bg-card p-4">
                    <p className={cn('font-semibold mb-1', sanction.color)}>{sanction.offense}</p>
                    <p className="text-sm text-muted-foreground">{sanction.action}</p>
                  </div>
                ))}
              </div>
            </SpotlightCard>
            
            <p className="text-xs text-muted-foreground mt-4 text-center">
              * Las infracciones graves (cheats, acoso severo, contenido ilegal) pueden resultar en ban permanente inmediato
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <SpotlightCard className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                En situaciones no contempladas, la decisión final corresponde a la Administración.
                <br />
                Estas normas se basan en el respeto mutuo y el sentido común.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={serverConfig.discord.inviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#5865F2] text-white rounded-xl font-semibold hover:bg-[#4752C4] transition-colors"
                >
                  <DiscordIcon className="w-4 h-4" />
                  Contactar Staff
                </a>
                <p className="text-xs text-muted-foreground">
                  ¿Dudas o apelaciones? Abre un ticket en Discord
                </p>
              </div>
            </SpotlightCard>
          </FadeIn>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
