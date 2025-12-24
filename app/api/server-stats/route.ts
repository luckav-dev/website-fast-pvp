import { NextResponse } from 'next/server'
import { serverConfig } from '@/lib/config'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Helper function to fetch with retry
async function fetchWithRetry(url: string, options: RequestInit, retries = 2): Promise<Response> {
  for (let i = 0; i <= retries; i++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 seconds timeout
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      })
      
      clearTimeout(timeoutId)
      
      if (response.ok) {
        return response
      }
      
      // If not the last retry, wait a bit before retrying
      if (i < retries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
      }
    } catch (error) {
      // If not the last retry, wait before retrying
      if (i < retries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
        continue
      }
      throw error
    }
  }
  
  throw new Error('Failed after retries')
}

export async function GET() {
  const { ip, port } = serverConfig.fivem
  const baseUrl = `http://${ip}:${port}`
  
  try {
    // Try to fetch info.json with retry
    let infoRes: Response
    try {
      infoRes = await fetchWithRetry(`${baseUrl}/info.json`, {})
    } catch (error) {
      console.error('Failed to fetch info.json after retries:', error)
      return NextResponse.json({
        online: false,
        players: { online: 0, max: 64, list: [] },
        serverName: 'FastPVP',
      }, { status: 200 })
    }

    if (!infoRes.ok) {
      return NextResponse.json({
        online: false,
        players: { online: 0, max: 64, list: [] },
        serverName: 'FastPVP',
      }, { status: 200 })
    }

    const info = await infoRes.json()
    const maxPlayers = parseInt(info.vars?.sv_maxClients || '64')

    // Try to fetch players.json with retry, but don't fail if it doesn't work
    let players: any[] = []
    let playersOnline = 0
    
    try {
      const playersRes = await fetchWithRetry(`${baseUrl}/players.json`, {})
      
      if (playersRes.ok) {
        const playersData = await playersRes.json()
        if (Array.isArray(playersData)) {
          players = playersData
          playersOnline = players.length
        }
      }
    } catch (error) {
      // If players.json fails, server is still online but with 0 players
      console.warn('Could not fetch players.json, assuming 0 players:', error)
    }

    return NextResponse.json({
      online: true,
      players: {
        online: playersOnline,
        max: maxPlayers,
        list: players.map((p: { id: number; name: string; ping: number; identifiers?: string[] }) => ({
          id: p.id,
          name: p.name,
          ping: p.ping,
          identifiers: p.identifiers || [],
        })),
      },
      serverName: info.vars?.sv_projectName || 'FastPVP',
    })
  } catch (error) {
    console.error('Server status error:', error)
    return NextResponse.json({
      online: false,
      players: { online: 0, max: 64, list: [] },
      serverName: 'FastPVP',
    }, { status: 200 })
  }
}
