import { type MDXContent } from 'mdx/types'

import { type Locale } from '@lib/i18n/config'

import 'server-only'

/**
 * Imports the compiled MDX component of a blog post.
 * @param slug Post folder name.
 * @param locale Locale of the file to load, usually `Post.sourceLocale`.
 * @returns The MDX component.
 */
export const loadPostBody = async (slug: string, locale: Locale): Promise<MDXContent> =>
  (await import(`@content/blog/${slug}/${locale}.mdx`)).default

/**
 * Imports the compiled MDX component of a case study.
 * @param slug Project folder name.
 * @param locale Locale of the file to load, usually `Project.sourceLocale`.
 * @returns The MDX component.
 */
export const loadProjectBody = async (slug: string, locale: Locale): Promise<MDXContent> =>
  (await import(`@content/work/${slug}/${locale}.mdx`)).default
