import { type FC, ViewTransition } from 'react'

import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr'
import { useLocale, useTranslations } from 'next-intl'

import { ProjectCover } from '@entities/project'
import { getProjects } from '@lib/content'
import { Link } from '@lib/i18n'
import { Container } from '@shared/ui'
import { FadeUp } from '@shared/ui/motion'
import { ClosingCta } from '@widgets/closing-cta'
import { PageHeader } from '@widgets/page-header'

import { ProjectIndexScene } from './ProjectIndexScene'

export const Work: FC = () => {
  const locale = useLocale()
  const t = useTranslations()
  const projects = getProjects(locale)

  return (
    <>
      <PageHeader intro={t('WorkPage.intro')} title={t('WorkPage.title')} />

      <Container aria-label={t('WorkPage.title')} as="section">
        <ProjectIndexScene>
          <div
            aria-hidden
            data-index-preview
            className="pointer-events-none invisible absolute top-0 left-0 z-10 hidden aspect-[4/3] w-[26rem] overflow-hidden lg:block"
          >
            {projects.map((project, index) => (
              <div key={project.slug} data-index-slide className="size-full">
                <ProjectCover
                  className="size-full"
                  seed={index}
                  title={project.frontmatter.title}
                />
              </div>
            ))}
          </div>

          <FadeUp stagger as="ol" className="border-b border-line">
            {projects.map((project, index) => (
              <li key={project.slug} data-index-row className="group border-t border-line">
                <Link
                  className="grid gap-6 py-8 md:grid-cols-12 md:items-center md:py-12"
                  href={`/work/${project.slug}`}
                  lang={project.sourceLocale}
                >
                  <ViewTransition
                    default="none"
                    name={`project-cover-${project.slug}`}
                    share="morph"
                  >
                    <ProjectCover
                      className="aspect-[4/3] w-full lg:hidden"
                      seed={index}
                      title={project.frontmatter.title}
                    />
                  </ViewTransition>
                  <h2 className="text-display transition-[color,transform] duration-500 ease-out-expo group-hover:translate-x-3 group-hover:text-accent md:col-span-7">
                    {project.frontmatter.title}
                  </h2>
                  <div className="flex flex-col gap-2 text-fg-muted md:col-span-4">
                    <p>{project.frontmatter.summary}</p>
                    <p className="flex gap-4 text-sm text-fg-subtle">
                      <span>{project.frontmatter.year}</span>
                      <span>{t(`Project.kind.${project.frontmatter.kind}`)}</span>
                    </p>
                  </div>
                  <ArrowUpRightIcon
                    aria-hidden
                    className="hidden size-8 justify-self-end text-fg-subtle transition-[transform,color] duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent md:col-span-1 md:block"
                  />
                </Link>
              </li>
            ))}
          </FadeUp>
        </ProjectIndexScene>
      </Container>

      <ClosingCta />
    </>
  )
}

Work.displayName = 'Work'
