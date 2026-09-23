import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { type ReactElement } from 'react'

import { getLocale } from 'next-intl/server'

import {
  getNextProject,
  getProject,
  getProjects,
  getProjectSlugs,
  loadProjectBody,
} from '@lib/content'
import { createPageMetadata } from '@lib/seo'
import { CaseStudy } from '@modules/case-study'

export const generateStaticParams = (): { slug: string }[] =>
  getProjectSlugs().map(slug => ({ slug }))

export const dynamicParams = false

export const generateMetadata = async ({
  params,
}: PageProps<'/[locale]/work/[slug]'>): Promise<Metadata> => {
  const { slug } = await params
  const locale = await getLocale()
  const project = getProject(slug, locale)
  if (!project) return {}
  return createPageMetadata({
    locale,
    path: `/work/${slug}`,
    title: project.frontmatter.title,
    description: project.frontmatter.summary,
    type: 'article',
  })
}

const CaseStudyPage = async ({
  params,
}: PageProps<'/[locale]/work/[slug]'>): Promise<ReactElement> => {
  const { slug } = await params
  const locale = await getLocale()
  const project = getProject(slug, locale)
  if (!project) notFound()

  const Body = await loadProjectBody(slug, project.sourceLocale)
  const seed = getProjects(locale).findIndex(item => item.slug === slug)

  return <CaseStudy Body={Body} next={getNextProject(slug, locale)} project={project} seed={seed} />
}

export default CaseStudyPage
