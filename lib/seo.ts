import { Metadata } from 'next'
import { serverConfig } from './config'

export interface SEOConfig {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  canonical?: string
}

const defaultImage = `${serverConfig.logo}`
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fastpvp.com'

export function generateMetadata(config: SEOConfig = {}): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = defaultImage,
    type = 'website',
    noindex = false,
    canonical,
  } = config

  const fullTitle = title 
    ? `${title} | ${serverConfig.fullName}`
    : `${serverConfig.fullName} - ${serverConfig.tagline}`
  
  const fullDescription = description || 
    `Únete a ${serverConfig.fullName}, el servidor PVP más competitivo de FiveM. Combate intenso, rankings en tiempo real y la mejor comunidad.`

  const defaultKeywords = [
    'FastPVP',
    'FiveM',
    'PVP',
    'servidor FiveM',
    'GTA V',
    'GTA 5',
    'roleplay',
    'combate',
    'rankings',
    'competitivo',
    serverConfig.name,
  ]

  const allKeywords = [...new Set([...defaultKeywords, ...keywords])].join(', ')

  const metadata: Metadata = {
    title: fullTitle,
    description: fullDescription,
    keywords: allKeywords,
    authors: [{ name: serverConfig.fullName }],
    creator: serverConfig.fullName,
    publisher: serverConfig.fullName,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonical || siteUrl,
    },
    openGraph: {
      type,
      title: fullTitle,
      description: fullDescription,
      siteName: serverConfig.fullName,
      images: [
        {
          url: image.startsWith('http') ? image : `${siteUrl}${image}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'es_ES',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [image.startsWith('http') ? image : `${siteUrl}${image}`],
      creator: '@fastpvp',
      site: '@fastpvp',
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },
  }

  return metadata
}

export function generateStructuredData(type: 'Organization' | 'WebSite' | 'GameServer' | 'BreadcrumbList', data?: any) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fastpvp.com'
  
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': type,
  }

  switch (type) {
    case 'Organization':
      return {
        ...baseStructuredData,
        name: serverConfig.fullName,
        url: baseUrl,
        logo: `${baseUrl}${serverConfig.logo}`,
        sameAs: [
          serverConfig.social.discord,
          serverConfig.social.youtube,
          serverConfig.social.twitter,
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          availableLanguage: 'Spanish',
        },
      }
    
    case 'WebSite':
      return {
        ...baseStructuredData,
        name: serverConfig.fullName,
        url: baseUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/players?search={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      }
    
    case 'GameServer':
      return {
        ...baseStructuredData,
        name: serverConfig.fullName,
        game: 'Grand Theft Auto V',
        applicationCategory: 'Game',
        operatingSystem: 'FiveM',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '1000',
        },
      }
    
    case 'BreadcrumbList':
      if (!data?.items) return null
      return {
        ...baseStructuredData,
        itemListElement: data.items.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${baseUrl}${item.url}`,
        })),
      }
    
    default:
      return baseStructuredData
  }
}

