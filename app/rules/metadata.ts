import { Metadata } from 'next'
import { generateMetadata as genMeta } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'Reglas del Servidor',
  description: 'Lee las reglas y normas de FastPVP. Aprende cómo jugar correctamente y mantener un ambiente respetuoso en el servidor.',
  keywords: ['reglas FastPVP', 'normas servidor', 'reglamento', 'guía jugador'],
  canonical: '/rules',
})

