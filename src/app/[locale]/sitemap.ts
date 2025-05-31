import type { MetadataRoute } from 'next'

import { LOCALES } from '@lib/i18n'

const pages = ['', 'about', 'contact']

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString()
  const urls: MetadataRoute.Sitemap = []

  for (const locale of LOCALES) {
    for (const page of pages) {
      urls.push({
        url: `https://flakeforge.com/${locale}${page ? `/${page}` : ''}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: page === '' ? 1.0 : 0.8,
      })
    }
  }

  return urls
}
