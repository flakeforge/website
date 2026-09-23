import { type MetadataRoute } from 'next'

import { NAV_ITEMS } from '@config/navigation'
import { getPosts, getProjects } from '@lib/content'
import { DEFAULT_LOCALE, LOCALES } from '@lib/i18n'
import { absoluteUrl, localizedPath } from '@lib/seo'

const STATIC_PATHS = ['/', ...NAV_ITEMS.map(item => item.href), '/contact']

const entry = (path: string, lastModified?: Date): MetadataRoute.Sitemap[number] => ({
  url: absoluteUrl(localizedPath(DEFAULT_LOCALE, path)),
  lastModified,
  alternates: {
    languages: Object.fromEntries(
      LOCALES.map(locale => [locale, absoluteUrl(localizedPath(locale, path))])
    ),
  },
})

const sitemap = (): MetadataRoute.Sitemap => [
  ...STATIC_PATHS.map(path => entry(path)),
  ...getProjects(DEFAULT_LOCALE).map(project => entry(`/work/${project.slug}`)),
  ...getPosts(DEFAULT_LOCALE).map(post => entry(`/blog/${post.slug}`, post.frontmatter.date)),
]

export default sitemap
