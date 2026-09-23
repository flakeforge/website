import { type Metadata, type Viewport } from 'next'
import * as rootParams from 'next/root-params'

import { getTranslations } from 'next-intl/server'

import { BASE_URL, SITE } from '@config/site'
import { isLocale } from '@lib/i18n'
import { createPageMetadata } from '@lib/seo'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await rootParams.locale()
  const t = await getTranslations('Metadata')
  const page = isLocale(locale)
    ? createPageMetadata({
        locale,
        path: '/',
        title: t('home.title'),
        description: t('siteDescription'),
      })
    : {}

  return {
    ...page,
    metadataBase: new URL(BASE_URL),
    title: {
      default: t('home.title'),
      template: `%s | ${SITE.name}`,
    },
    applicationName: SITE.name,
    authors: [{ name: SITE.name, url: BASE_URL }],
    creator: SITE.name,
    publisher: SITE.name,
    robots: { index: true, follow: true },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      ],
      apple: '/apple-touch-icon.png',
    },
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f4f2' },
    { media: '(prefers-color-scheme: dark)', color: '#111318' },
  ],
  colorScheme: 'light dark',
}
