import { NextResponse } from 'next/server'
import { serverConfig } from '@/lib/config'

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || ''

type DiscordStatus = 'online' | 'idle' | 'dnd' | 'offline'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'User ID required' }, { status: 400 })
  }

  try {
    if (DISCORD_BOT_TOKEN) {
      try {
        const userResponse = await fetch(`https://discord.com/api/v10/users/${userId}`, {
          headers: {
            'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
          },
          next: { revalidate: 300 },
        })

        let status: DiscordStatus = 'offline'
        
        // Intentar obtener el presence del usuario
        if (serverConfig.discord.guildId) {
          try {
            // Primero intentar obtener el member
            const memberResponse = await fetch(`https://discord.com/api/v10/guilds/${serverConfig.discord.guildId}/members/${userId}`, {
              headers: {
                'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
              },
              next: { revalidate: 30 },
            })
            
            if (memberResponse.ok) {
              const member = await memberResponse.json()
              // El presence no viene en la respuesta de members, necesitamos usar la Gateway API
              // Por ahora, intentamos obtenerlo de otra forma
            }
            
            // Intentar obtener el presence usando la API de presence (requiere intents)
            // Nota: Esta API puede no estar disponible sin los intents correctos
            try {
              const presenceResponse = await fetch(`https://discord.com/api/v10/guilds/${serverConfig.discord.guildId}/members/${userId}/presence`, {
                headers: {
                  'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
                },
                next: { revalidate: 30 },
              })
              
              if (presenceResponse.ok) {
                const presence = await presenceResponse.json()
                if (presence.status) {
                  status = presence.status as DiscordStatus
                }
              }
            } catch (presenceError) {
              // Si falla, intentar obtener de la lista de presences del guild
              try {
                const presencesResponse = await fetch(`https://discord.com/api/v10/guilds/${serverConfig.discord.guildId}/presences`, {
                  headers: {
                    'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
                  },
                  next: { revalidate: 30 },
                })
                
                if (presencesResponse.ok) {
                  const presences = await presencesResponse.json()
                  const userPresence = presences.find((p: any) => p.user?.id === userId)
                  if (userPresence?.status) {
                    status = userPresence.status as DiscordStatus
                  }
                }
              } catch (presencesError) {
                console.warn('Could not fetch presences:', presencesError)
              }
            }
          } catch (memberError) {
            console.warn('Could not fetch member presence:', memberError)
          }
        }

        if (userResponse.ok) {
          const user = await userResponse.json()
          const avatarUrl = user.avatar
            ? `https://cdn.discordapp.com/avatars/${userId}/${user.avatar}.${user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=512`
            : `https://cdn.discordapp.com/embed/avatars/${parseInt(user.discriminator || '0') % 5}.png`

          return NextResponse.json({
            avatar: avatarUrl,
            username: user.username || user.global_name || 'Usuario',
            discriminator: user.discriminator,
            status: status,
          })
        }
      } catch (apiError) {
        console.error('Discord API error:', apiError)
      }
    }

    const defaultAvatar = `https://cdn.discordapp.com/embed/avatars/${parseInt(userId) % 5}.png`
    return NextResponse.json({
      avatar: defaultAvatar,
      username: 'Usuario',
      discriminator: null,
      status: 'offline' as DiscordStatus,
    })
  } catch (error) {
    console.error('Error fetching Discord avatar:', error)
    const defaultAvatar = `https://cdn.discordapp.com/embed/avatars/${parseInt(userId) % 5}.png`
    return NextResponse.json({
      avatar: defaultAvatar,
      username: 'Usuario',
      discriminator: null,
      status: 'offline' as DiscordStatus,
    })
  }
}

