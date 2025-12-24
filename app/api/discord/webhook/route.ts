import { NextRequest, NextResponse } from 'next/server'
import { serverConfig } from '@/lib/config'

interface WebhookPayload {
  type: 'player_join' | 'player_leave' | 'kill' | 'announcement'
  data: {
    playerName?: string
    playerId?: string
    killerName?: string
    victimName?: string
    weapon?: string
    message?: string
    timestamp?: string
  }
}

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL

export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key')
    if (apiKey !== serverConfig.fivem.apiKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const payload: WebhookPayload = await request.json()
    
    if (!DISCORD_WEBHOOK_URL) {
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
    }
    
    let embed = {
      color: 0xfc043c,
      timestamp: new Date().toISOString(),
      footer: {
        text: serverConfig.fullName,
      },
      title: '',
      description: '',
      fields: [] as { name: string; value: string; inline?: boolean }[],
    }
    
    switch (payload.type) {
      case 'player_join':
        embed.color = 0x00ff88
        embed.title = '🟢 Jugador Conectado'
        embed.description = `**${payload.data.playerName}** se ha unido al servidor`
        embed.fields = [
          { name: 'ID', value: payload.data.playerId || 'N/A', inline: true },
        ]
        break
        
      case 'player_leave':
        embed.color = 0xff6600
        embed.title = '🔴 Jugador Desconectado'
        embed.description = `**${payload.data.playerName}** ha abandonado el servidor`
        embed.fields = [
          { name: 'ID', value: payload.data.playerId || 'N/A', inline: true },
        ]
        break
        
      case 'kill':
        embed.color = 0xfc043c
        embed.title = '💀 Kill'
        embed.description = `**${payload.data.killerName}** ha matado a **${payload.data.victimName}**`
        if (payload.data.weapon) {
          embed.fields = [
            { name: 'Arma', value: payload.data.weapon, inline: true },
          ]
        }
        break
        
      case 'announcement':
        embed.color = 0xfec026
        embed.title = '📢 Anuncio del Servidor'
        embed.description = payload.data.message || ''
        break
        
      default:
        return NextResponse.json({ error: 'Invalid event type' }, { status: 400 })
    }
    
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    })
    
    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.status}`)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    message: 'Discord webhook endpoint is running',
    server: serverConfig.fullName,
  })
}
