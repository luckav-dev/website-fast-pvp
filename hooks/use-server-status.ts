'use client'

import { useState, useEffect, useCallback } from 'react'
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

export function useServerStatus(interval = 30000) {
  const [status, setStatus] = useState<ServerStatus>(INITIAL)

  const fetch_status = useCallback(async () => {
    try {
      const res = await fetch('/api/server-stats')
      if (!res.ok) throw new Error()
      const data = await res.json()
      setStatus({
        online: data.online,
        players: {
          online: data.players?.online || 0,
          max: data.players?.max || serverConfig.fivem.maxPlayers,
        },
      })
    } catch {
      setStatus(prev => ({ ...prev, online: false }))
    }
  }, [])

  useEffect(() => {
    fetch_status()
    const id = setInterval(fetch_status, interval)
    return () => clearInterval(id)
  }, [fetch_status, interval])

  return { status }
}
