import { type Metadata } from 'next'

import { BASE_URL, SITE } from '@config/site'

import { DEFAULT_LOCALE, type Locale, LOCALE_OG, LOCALES } from './i18n/config'

/**
 * Builds an absolute URL on the site origin.
 * @param path Path starting with `/`.
 * @returns Absolute URL string.
 */
export const absoluteUrl = (path: string): string => new URL(path, BASE_URL).toString()

/**
 * Builds the locale-prefixed path for a route.
 * @param locale Target locale.
 * @param path Route path without the locale, starting with `/` or empty for the home page.
 * @returns Path such as `/ru/blog`.
 */
export const localizedPath = (locale: Locale, path: string): string =>
  `/${locale}${path === '/' ? '' : path}`

type PageMetadataInput = {
  locale: Locale
  path: string
  title: string
  description: string
  type?: 'article' | 'website'
  publishedTime?: Date
  generatedImage?: boolean
}

const DEFAULT_OG_IMAGE = { url: '/images/og-image.jpg', width: 1200, height: 630 }

const DEFAULT_TWITTER_IMAGE = '/images/twitter-image.jpg'

/**
 * Creates page metadata with canonical, hreflang alternates, and Open Graph fields.
 * @param input Locale, route path without the locale, localized title and description, and
 * `generatedImage` when the route has its own `opengraph-image` file.
 * @returns Metadata for `generateMetadata`.
 */
export const createPageMetadata = ({
  locale,
  path,
  title,
  description,
  type = 'website',
  publishedTime,
  generatedImage = false,
}: PageMetadataInput): Metadata => {
  const languages = Object.fromEntries([
    ...LOCALES.map(item => [item, localizedPath(item, path)]),
    ['x-default', localizedPath(DEFAULT_LOCALE, path)],
  ])

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath(locale, path),
      languages,
      types: {
        'application/rss+xml': localizedPath(locale, '/blog/rss.xml'),
      },
    },
    openGraph: {
      type,
      title,
      description,
      url: localizedPath(locale, path),
      siteName: SITE.name,
      locale: LOCALE_OG[locale],
      alternateLocale: LOCALES.filter(item => item !== locale).map(item => LOCALE_OG[item]),
      ...(publishedTime ? { publishedTime: publishedTime.toISOString() } : {}),
      ...(generatedImage ? {} : { images: [{ ...DEFAULT_OG_IMAGE, alt: SITE.name }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(generatedImage ? {} : { images: [DEFAULT_TWITTER_IMAGE] }),
    },
  }
}
