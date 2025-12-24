import { Metadata } from 'next'
import { generateMetadata as genMeta } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'Equipo Staff',
  description: 'Conoce al equipo de FastPVP. Administradores, desarrolladores y moderadores que hacen posible el mejor servidor PVP de FiveM.',
  keywords: ['staff FastPVP', 'equipo administradores', 'moderadores', 'desarrolladores'],
  canonical: '/staff',
})

