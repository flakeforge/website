import { getTranslations } from 'next-intl/server'

import { SITE } from '@config/site'
import { getPosts } from '@lib/content'
import { isLocale, LOCALES } from '@lib/i18n'
import { absoluteUrl, localizedPath } from '@lib/seo'

export const dynamic = 'force-static'

export const generateStaticParams = (): { locale: string }[] => LOCALES.map(locale => ({ locale }))

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

export const GET = async (
  _request: Request,
  { params }: RouteContext<'/[locale]/blog/rss.xml'>
): Promise<Response> => {
  const { locale } = await params
  if (!isLocale(locale)) return new Response(null, { status: 404 })

  const t = await getTranslations({ locale, namespace: 'Blog' })
  const tMeta = await getTranslations({ locale, namespace: 'Metadata.blog' })
  const blogUrl = absoluteUrl(localizedPath(locale, '/blog'))

  const items = getPosts(locale)
    .map(post => {
      const url = absoluteUrl(localizedPath(locale, `/blog/${post.slug}`))
      return [
        '<item>',
        `<title>${escapeXml(post.frontmatter.title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="true">${url}</guid>`,
        `<description>${escapeXml(post.frontmatter.description)}</description>`,
        `<pubDate>${post.frontmatter.date.toUTCString()}</pubDate>`,
        ...post.frontmatter.tags.map(tag => `<category>${escapeXml(tag)}</category>`),
        '</item>',
      ].join('')
    })
    .join('')

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '<channel>',
    `<title>${escapeXml(t('rssTitle'))}</title>`,
    `<link>${blogUrl}</link>`,
    `<description>${escapeXml(tMeta('description'))}</description>`,
    `<language>${locale}</language>`,
    `<atom:link href="${absoluteUrl(localizedPath(locale, '/blog/rss.xml'))}" rel="self" type="application/rss+xml"/>`,
    `<copyright>${escapeXml(SITE.name)}</copyright>`,
    items,
    '</channel>',
    '</rss>',
  ].join('')

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
