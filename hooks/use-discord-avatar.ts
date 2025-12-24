'use client'

import { useState, useEffect } from 'react'

export type DiscordStatus = 'online' | 'idle' | 'dnd' | 'offline'

export interface DiscordUser {
  avatar: string
  username: string
  discriminator: string | null
  status: DiscordStatus
}

export function useDiscordAvatar(userId: string) {
  const [user, setUser] = useState<DiscordUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchAvatar = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/discord/avatar?userId=${userId}`)
        if (response.ok) {
          const data = await response.json()
          setUser(data)
        } else {
          setError('Failed to fetch avatar')
        }
      } catch (err) {
        setError('Error fetching avatar')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAvatar()
    
    const interval = setInterval(fetchAvatar, 30000)
    return () => clearInterval(interval)
  }, [userId])

  return { user, loading, error }
}

