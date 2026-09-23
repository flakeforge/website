import { type Locale } from '@lib/i18n/config'

import { type ContentEntry, listSlugs, readEntry } from './files'
import { type ProjectFrontmatter, projectFrontmatterSchema } from './schema'

import 'server-only'

export type Project = ContentEntry<ProjectFrontmatter>

/**
 * Loads every project for a locale in display order.
 * @param locale Active locale; missing translations fall back to the default locale.
 * @returns Projects sorted by their `order` field.
 */
export const getProjects = (locale: Locale): Project[] =>
  listSlugs('work')
    .map(slug => readEntry('work', slug, locale, projectFrontmatterSchema))
    .filter((project): project is Project => project !== null)
    .toSorted((a, b) => a.frontmatter.order - b.frontmatter.order)

/**
 * Loads one project for a locale.
 * @param slug Project folder name.
 * @param locale Active locale.
 * @returns The project, or `null` when it does not exist.
 */
export const getProject = (slug: string, locale: Locale): Project | null =>
  readEntry('work', slug, locale, projectFrontmatterSchema)

/**
 * Finds the project that follows `slug` in display order, wrapping to the first.
 * @param slug Current project folder name.
 * @param locale Active locale.
 * @returns The next project, or `null` when there is only one.
 */
export const getNextProject = (slug: string, locale: Locale): Project | null => {
  const projects = getProjects(locale)
  if (projects.length < 2) return null
  const index = projects.findIndex(project => project.slug === slug)
  return projects[(index + 1) % projects.length] ?? null
}

/**
 * Lists the slugs that should be prerendered for case studies.
 * @returns Project folder names.
 */
export const getProjectSlugs = (): string[] => listSlugs('work')
