export interface Script {
  id: string
  name: string
  description: string
  icon: string
  color: string
  features: string[]
}

export interface Package {
  id: string
  name: string
  price: number
  currency: string
  color: string
  features: string[]
  popular: boolean
}

export interface ServerStats {
  playersOnline: number
  totalPlayers: number
  totalKills: number
  uptime: string
  discordMembers: number
  hoursPlayed: number
}

export interface NavItem {
  name: string
  href: string
}

export interface SocialLinks {
  discord: string
  youtube: string
  twitter: string
  instagram: string
  tiktok: string
}
