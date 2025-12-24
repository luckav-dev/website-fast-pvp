import { Metadata } from 'next'
import { generateMetadata as genMeta } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'Rankings y Clasificación',
  description: 'Consulta los rankings de FastPVP. Top jugadores, mejores K/D, rachas más largas y estadísticas en tiempo real.',
  keywords: ['rankings FastPVP', 'clasificación jugadores', 'top players', 'estadísticas PVP'],
  canonical: '/leaderboard',
})

