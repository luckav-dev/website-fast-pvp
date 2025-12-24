'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Navbar } from '@/components/header/navbar'
import { Footer } from '@/components/footer/footer'
import { SpotlightCard } from '@/components/ui/animated-card'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="container-narrow text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
            <div className="relative w-20 h-20 mx-auto rounded-2xl bg-red-500/10 flex items-center justify-center border-2 border-red-500/20">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
          </div>
          
          <SpotlightCard className="max-w-2xl mx-auto p-8 md:p-12">
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-red-500">
                Algo salió mal
              </h1>
              
              <p className="text-muted-foreground text-lg mb-6">
                Ha ocurrido un error inesperado. Por favor, intenta nuevamente.
              </p>
              
              {error.digest && (
                <p className="text-xs text-muted-foreground/50 mb-8 font-mono">
                  Error ID: {error.digest}
                </p>
              )}
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
                >
                  <RefreshCw className="w-4 h-4" />
                  Intentar de nuevo
                </button>
                
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-xl font-semibold hover:bg-muted transition-all hover:scale-105 active:scale-95"
                >
                  <Home className="w-4 h-4" />
                  Volver al inicio
                </Link>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}

