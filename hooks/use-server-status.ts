'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { serverConfig } from '@/lib/config'

export interface ServerStatus {
  online: boolean
  players: {
    online: number
    max: number
  }
}

const INITIAL: ServerStatus = {
  online: false,
  players: { online: 0, max: serverConfig.fivem.maxPlayers },
}

export function useServerStatus(interval = 15000) {
  const [status, setStatus] = useState<ServerStatus>(INITIAL)
  const [loading, setLoading] = useState(true)
  const isMountedRef = useRef(true)
  const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const fetch_status = useCallback(async () => {
    if (!isMountedRef.current) return
    
    try {
      // Add cache busting to prevent stale data
      const timestamp = Date.now()
      const res = await fetch(`/api/server-stats?t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
      })
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      
      const data = await res.json()
      
      if (!isMountedRef.current) return
      
      // Only update if we got valid data
      if (data && typeof data.online === 'boolean') {
        setStatus({
          online: data.online,
          players: {
            online: data.players?.online || 0,
            max: data.players?.max || serverConfig.fivem.maxPlayers,
          },
        })
        setLoading(false)
      }
    } catch (error) {
      console.warn('Failed to fetch server status:', error)
      // Don't update status on error - keep previous state
      // Only set loading to false after first attempt
      if (loading) {
        setLoading(false)
      }
    }
  }, [loading])

  useEffect(() => {
    isMountedRef.current = true
    
    // Initial fetch
    fetch_status()
    
    // Set up interval
    const id = setInterval(() => {
      if (isMountedRef.current) {
        fetch_status()
      }
    }, interval)
    
    return () => {
      isMountedRef.current = false
      clearInterval(id)
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current)
      }
    }
  }, [fetch_status, interval])

  return { status, loading }
}
