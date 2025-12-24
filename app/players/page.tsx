import { Metadata } from 'next'
import { generateMetadata as genMeta } from '@/lib/seo'
import { PlayersPageClient } from './players-client'

export const metadata: Metadata = genMeta({
  title: 'Jugadores Online',
  description: 'Consulta la lista de jugadores conectados en FastPVP. Ver jugadores online, ping, y estadísticas en tiempo real.',
  keywords: ['jugadores online', 'lista jugadores', 'jugadores conectados', 'estadísticas jugadores'],
  canonical: '/players',
})

export default function PlayersPage() {
  return <PlayersPageClient />
}
