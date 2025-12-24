import type { Metadata } from 'next'
import { Sora } from 'next/font/google'
import './globals.css'
import { ToastProvider } from '@/components/providers/toast-provider'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
})

export const metadata: Metadata = {
  title: 'FastPVP | Servidor FiveM PVP',
  description: 'El servidor PVP más competitivo de FiveM',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={sora.variable}>
      <body suppressHydrationWarning>
        <SmoothScrollProvider>
          {children}
          <ToastProvider />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
