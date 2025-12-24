import { NextResponse } from 'next/server'
import { serverConfig } from '@/lib/config'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const { ip, port } = serverConfig.fivem
  const baseUrl = `http://${ip}:${port}`
  
  try {
    const infoRes = await fetch(`${baseUrl}/info.json`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    })

    if (!infoRes.ok) {
      throw new Error('Server not responding - info.json failed')
    }

    const info = await infoRes.json()
    const maxPlayers = parseInt(info.vars?.sv_maxClients || '64')

    try {
      const playersRes = await fetch(`${baseUrl}/players.json`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(5000),
      })

      if (playersRes.ok) {
        const players = await playersRes.json()
        
        return NextResponse.json({
          online: true,
          players: {
            online: Array.isArray(players) ? players.length : 0,
            max: maxPlayers,
            list: Array.isArray(players) ? players.map((p: { id: number; name: string; ping: number; identifiers?: string[] }) => ({
              id: p.id,
              name: p.name,
              ping: p.ping,
              identifiers: p.identifiers || [],
            })) : [],
          },
          serverName: info.vars?.sv_projectName || 'FastPVP',
        })
      } else {
        return NextResponse.json({
          online: true,
          players: {
            online: 0,
            max: maxPlayers,
            list: [],
          },
          serverName: info.vars?.sv_projectName || 'FastPVP',
        })
      }
    } catch {
      return NextResponse.json({
        online: true,
        players: {
          online: 0,
          max: maxPlayers,
          list: [],
        },
        serverName: info.vars?.sv_projectName || 'FastPVP',
      })
    }
  } catch {
    return NextResponse.json({
      online: false,
      players: { online: 0, max: 64, list: [] },
      serverName: 'FastPVP',
    })
  }
}
