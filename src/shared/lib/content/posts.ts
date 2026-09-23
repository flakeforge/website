import { type Locale } from '@lib/i18n/config'

import { type ContentEntry, listSlugs, readEntry } from './files'
import { type PostFrontmatter, postFrontmatterSchema } from './schema'

import 'server-only'

export type Post = ContentEntry<PostFrontmatter>

const includeDrafts = process.env.NODE_ENV !== 'production'

/**
 * Loads every published post for a locale, newest first.
 * @param locale Active locale; missing translations fall back to the default locale.
 * @returns Posts with `isFallback` set where the default locale was used.
 */
export const getPosts = (locale: Locale): Post[] =>
  listSlugs('blog')
    .map(slug => readEntry('blog', slug, locale, postFrontmatterSchema))
    .filter((post): post is Post => post !== null)
    .filter(post => includeDrafts || !post.frontmatter.draft)
    .toSorted((a, b) => b.frontmatter.date.getTime() - a.frontmatter.date.getTime())

/**
 * Loads one post for a locale.
 * @param slug Post folder name.
 * @param locale Active locale.
 * @returns The post, or `null` when it does not exist or is a draft in production.
 */
export const getPost = (slug: string, locale: Locale): Post | null => {
  const post = readEntry('blog', slug, locale, postFrontmatterSchema)
  if (!post || (!includeDrafts && post.frontmatter.draft)) return null
  return post
}

/**
 * Lists the slugs that should be prerendered for the blog.
 * @returns Slugs of published posts.
 */
export const getPostSlugs = (): string[] =>
  listSlugs('blog').filter(slug => {
    const post = readEntry('blog', slug, 'en', postFrontmatterSchema)
    return post !== null && (includeDrafts || !post.frontmatter.draft)
  })
