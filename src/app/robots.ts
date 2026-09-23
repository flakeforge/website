import { type MetadataRoute } from 'next'

import { absoluteUrl } from '@lib/seo'

const robots = (): MetadataRoute.Robots => ({
  rules: { userAgent: '*', allow: '/' },
  sitemap: absoluteUrl('/sitemap.xml'),
})

export default robots
