import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

import { parse } from 'yaml'
import { type z } from 'zod'

import { DEFAULT_LOCALE, type Locale } from '@lib/i18n/config'

import 'server-only'

export type ContentType = 'blog' | 'work'

export type ContentEntry<Frontmatter> = {
  slug: string
  locale: Locale
  sourceLocale: Locale
  isFallback: boolean
  readingMinutes: number
  frontmatter: Frontmatter
}

const CONTENT_ROOT = join(process.cwd(), 'content')

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/

const WORDS_PER_MINUTE = 200

/**
 * Lists the slugs of a content type. A slug is a folder that holds a default-locale MDX file.
 * @param type Content folder under `content/`.
 * @returns Slugs sorted alphabetically.
 */
export const listSlugs = (type: ContentType): string[] => {
  const dir = join(CONTENT_ROOT, type)
  if (!existsSync(dir)) return []

  return readdirSync(dir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .filter(slug => existsSync(join(dir, slug, `${DEFAULT_LOCALE}.mdx`)))
    .toSorted()
}

/**
 * Resolves which locale file to render for a slug, falling back to the default locale.
 * @param type Content folder under `content/`.
 * @param slug Entry folder name.
 * @param locale Requested locale.
 * @returns The locale whose file exists, or `null` when the slug has no files.
 */
const resolveSourceLocale = (type: ContentType, slug: string, locale: Locale): Locale | null => {
  if (existsSync(join(CONTENT_ROOT, type, slug, `${locale}.mdx`))) return locale
  if (existsSync(join(CONTENT_ROOT, type, slug, `${DEFAULT_LOCALE}.mdx`))) return DEFAULT_LOCALE
  return null
}

/**
 * Estimates reading time from the MDX body.
 * @param body MDX source without frontmatter.
 * @returns Whole minutes, at least 1.
 */
const estimateReadingMinutes = (body: string): number => {
  const words = body
    .replace(/```[\s\S]*?```/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

/**
 * Reads and validates one content entry for a locale.
 * @param type Content folder under `content/`.
 * @param slug Entry folder name.
 * @param locale Requested locale; the default locale is used when the translation is missing.
 * @param schema Zod schema for the frontmatter.
 * @returns The parsed entry, or `null` when the slug does not exist.
 * @throws When the frontmatter is missing or fails validation.
 */
export const readEntry = <Schema extends z.ZodType>(
  type: ContentType,
  slug: string,
  locale: Locale,
  schema: Schema
): ContentEntry<z.infer<Schema>> | null => {
  const sourceLocale = resolveSourceLocale(type, slug, locale)
  if (!sourceLocale) return null

  const file = join(CONTENT_ROOT, type, slug, `${sourceLocale}.mdx`)
  const match = FRONTMATTER_PATTERN.exec(readFileSync(file, 'utf8'))
  if (!match) throw new Error(`Missing frontmatter in ${file}`)

  const [, rawFrontmatter, body] = match
  const parsed = schema.safeParse(parse(rawFrontmatter))
  if (!parsed.success) {
    throw new Error(`Invalid frontmatter in ${file}: ${parsed.error.message}`)
  }

  return {
    slug,
    locale,
    sourceLocale,
    isFallback: sourceLocale !== locale,
    readingMinutes: estimateReadingMinutes(body),
    frontmatter: parsed.data,
  }
}
