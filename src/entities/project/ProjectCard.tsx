import { type FC, ViewTransition } from 'react'

import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr'
import { useTranslations } from 'next-intl'

import { cn } from '@lib/cn'
import { type Project } from '@lib/content'
import { Link } from '@lib/i18n'

import { ProjectCover } from './ProjectCover'

type ProjectCardProps = {
  project: Project
  index: number
  className?: string
}

export const ProjectCard: FC<ProjectCardProps> = ({ project, index, className }) => {
  const t = useTranslations('Project')
  const { frontmatter } = project

  return (
    <article className={cn('group relative', className)}>
      <Link
        className="flex flex-col gap-6"
        href={`/work/${project.slug}`}
        lang={project.sourceLocale}
      >
        <ViewTransition default="none" name={`project-cover-${project.slug}`} share="morph">
          <ProjectCover className="aspect-[4/3] w-full" seed={index} title={frontmatter.title} />
        </ViewTransition>
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="flex gap-4 text-sm text-fg-subtle">
              <span>{frontmatter.year}</span>
              <span>{t(`kind.${frontmatter.kind}`)}</span>
            </p>
            <h3 className="mt-3 text-title transition-colors duration-300 group-hover:text-accent">
              {frontmatter.title}
            </h3>
            <p className="mt-3 max-w-md text-fg-muted">{frontmatter.summary}</p>
          </div>
          <ArrowUpRightIcon
            aria-hidden
            className="mt-8 size-6 shrink-0 text-fg-subtle transition-[transform,color] duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
          />
        </div>
      </Link>
    </article>
  )
}

ProjectCard.displayName = 'ProjectCard'
