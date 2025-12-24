'use client'

import { useEffect, useState, useTransition } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface PageTransitionProviderProps {
  children: React.ReactNode
}

export function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [displayLocation, setDisplayLocation] = useState(pathname)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (pathname !== displayLocation) {
      setIsAnimating(true)
      
      // Use requestAnimationFrame for smoother transitions
      requestAnimationFrame(() => {
        startTransition(() => {
          setDisplayLocation(pathname)
          
          // Wait for animation to complete
          setTimeout(() => {
            setIsAnimating(false)
          }, 200)
        })
      })
    }
  }, [pathname, displayLocation])

  // Prefetch routes on hover
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="/"]')
    
    const handleMouseEnter = (e: Event) => {
      const link = e.currentTarget as HTMLAnchorElement
      const href = link.getAttribute('href')
      if (href && href.startsWith('/')) {
        router.prefetch(href)
      }
    }

    links.forEach(link => {
      link.addEventListener('mouseenter', handleMouseEnter, { passive: true })
    })

    return () => {
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleMouseEnter)
      })
    }
  }, [router, pathname])

  return (
    <div
      className={cn(
        'min-h-screen transition-opacity duration-200 ease-in-out',
        (isPending || isAnimating) && 'opacity-0',
        !isPending && !isAnimating && 'opacity-100'
      )}
    >
      {children}
    </div>
  )
}

