import { NextResponse } from 'next/server'

const FIVEM_IP = '127.0.0.1'
const FIVEM_PORT = '30120'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const [playersRes, infoRes] = await Promise.all([
      fetch(`http://${FIVEM_IP}:${FIVEM_PORT}/players.json`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(5000),
      }),
      fetch(`http://${FIVEM_IP}:${FIVEM_PORT}/info.json`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(5000),
      }),
    ])

    if (!playersRes.ok || !infoRes.ok) {
      throw new Error('Server not responding')
    }

    const players = await playersRes.json()
    const info = await infoRes.json()

    const maxPlayers = parseInt(info.vars?.sv_maxClients || '64')

    return NextResponse.json({
      online: true,
      players: {
        online: players.length,
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
  } catch {
    return NextResponse.json({
      online: false,
      players: { online: 0, max: 64, list: [] },
      serverName: 'FastPVP',
    })
  }
}
