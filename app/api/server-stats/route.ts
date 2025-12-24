import { NextResponse } from 'next/server'
import { serverConfig } from '@/lib/config'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Helper function to fetch with fast timeout and single retry
async function fetchFast(url: string, options: RequestInit, retries = 1): Promise<Response> {
  for (let i = 0; i <= retries; i++) {
    try {
      const controller = new AbortController()
      // Reduced timeout to 2 seconds for faster response
      const timeoutId = setTimeout(() => controller.abort(), 2000)
      
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
      
      // If not the last retry, wait briefly before retrying
      if (i < retries) {
        await new Promise(resolve => setTimeout(resolve, 300)) // Reduced wait time
      }
    } catch (error) {
      // If not the last retry, wait briefly before retrying
      if (i < retries) {
        await new Promise(resolve => setTimeout(resolve, 300))
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
    // Fetch info.json first to check if server is online (fast timeout)
    let infoRes: Response
    try {
      infoRes = await fetchFast(`${baseUrl}/info.json`, {})
    } catch (error) {
      // Server is offline - return immediately
      return NextResponse.json({
        online: false,
        players: { online: 0, max: 64, list: [] },
        serverName: 'FastPVP',
      }, { 
        status: 200,
        headers: { 
          'Cache-Control': 'no-store, max-age=0',
          'X-Response-Time': Date.now().toString()
        }
      })
    }

    if (!infoRes.ok) {
      return NextResponse.json({
        online: false,
        players: { online: 0, max: 64, list: [] },
        serverName: 'FastPVP',
      }, { 
        status: 200,
        headers: { 'Cache-Control': 'no-store, max-age=0' }
      })
    }

    const info = await infoRes.json()
    const maxPlayers = parseInt(info.vars?.sv_maxClients || '64')

    // Fetch players.json with timeout (don't wait too long)
    let players: any[] = []
    let playersOnline = 0
    
    // Use Promise.race to get players quickly, but don't block on it
    try {
      const playersRes = await Promise.race([
        fetchFast(`${baseUrl}/players.json`, {}),
        new Promise<Response>((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 1500)
        )
      ]) as Response
      
      if (playersRes.ok) {
        const playersData = await playersRes.json()
        if (Array.isArray(playersData)) {
          players = playersData
          playersOnline = players.length
        }
      }
    } catch (error) {
      // If players.json fails or times out, server is still online but with 0 players
      // Don't log to avoid spam
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
    }, {
      headers: { 'Cache-Control': 'no-store, max-age=0' }
    })
  } catch (error) {
    console.error('Server status error:', error)
    return NextResponse.json({
      online: false,
      players: { online: 0, max: 64, list: [] },
      serverName: 'FastPVP',
    }, { 
      status: 200,
      headers: { 'Cache-Control': 'no-store, max-age=0' }
    })
  }
}
