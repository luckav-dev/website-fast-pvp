import type { Metadata } from 'next'
import { Sora } from 'next/font/google'
import './globals.css'
import { ToastProvider } from '@/components/providers/toast-provider'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider'
import { PageTransitionProvider } from '@/components/providers/page-transition-provider'
import { generateMetadata as genMeta, generateStructuredData } from '@/lib/seo'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

export const metadata: Metadata = genMeta({
  title: 'FastPVP | Servidor FiveM PVP',
  description: 'Únete a FastPVP, el servidor PVP más competitivo de FiveM. Combate intenso, rankings en tiempo real y la mejor comunidad de jugadores.',
  keywords: ['FiveM PVP', 'servidor competitivo', 'GTA V online', 'combate PVP'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationData = generateStructuredData('Organization')
  const websiteData = generateStructuredData('WebSite')
  const gameServerData = generateStructuredData('GameServer')

  return (
    <html lang="es" className={sora.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#fc043c" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(gameServerData) }}
        />
      </head>
      <body suppressHydrationWarning>
        <SmoothScrollProvider>
          <PageTransitionProvider>
            {children}
          </PageTransitionProvider>
          <ToastProvider />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
