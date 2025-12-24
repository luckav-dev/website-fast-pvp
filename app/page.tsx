import { Navbar } from '@/components/header/navbar'
import { Hero } from '@/components/sections/hero'
import { Stats } from '@/components/sections/stats'
import { Features } from '@/components/sections/features'
import { CTA } from '@/components/sections/cta'
import { Footer } from '@/components/footer/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <CTA />
      <Footer />
    </main>
  )
}
