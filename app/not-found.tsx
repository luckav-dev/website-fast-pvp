'use client'

import Link from 'next/link'
import { Home, ArrowLeft, Search } from 'lucide-react'
import { Navbar } from '@/components/header/navbar'
import { Footer } from '@/components/footer/footer'
import { SpotlightCard } from '@/components/ui/animated-card'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="container-narrow text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
            <div className="relative text-9xl font-bold text-primary/20 select-none">
              404
            </div>
          </div>
          
          <SpotlightCard className="max-w-2xl mx-auto p-8 md:p-12">
            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-red-500/10 flex items-center justify-center border-2 border-red-500/20">
                <Search className="w-10 h-10 text-red-500" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Página no encontrada
              </h1>
              
              <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                Lo sentimos, la página que estás buscando no existe o ha sido movida.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
                >
                  <Home className="w-4 h-4" />
                  Volver al inicio
                </Link>
                
                <button
                  onClick={() => window.history.back()}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-xl font-semibold hover:bg-muted transition-all hover:scale-105 active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Página anterior
                </button>
              </div>
              
              <div className="mt-12 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  Páginas disponibles:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/players"
                    className="px-4 py-2 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-muted transition-colors text-sm"
                  >
                    Jugadores
                  </Link>
                  <Link
                    href="/leaderboard"
                    className="px-4 py-2 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-muted transition-colors text-sm"
                  >
                    Rankings
                  </Link>
                  <Link
                    href="/rules"
                    className="px-4 py-2 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-muted transition-colors text-sm"
                  >
                    Reglas
                  </Link>
                  <Link
                    href="/staff"
                    className="px-4 py-2 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-muted transition-colors text-sm"
                  >
                    Staff
                  </Link>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}

