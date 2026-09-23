import { type FC, ViewTransition } from 'react'

import { ArrowRightIcon, ArrowUpRightIcon } from '@phosphor-icons/react/ssr'
import { type MDXContent } from 'mdx/types'
import { useTranslations } from 'next-intl'

import { ProjectCover } from '@entities/project'
import { type Project } from '@lib/content'
import { Link } from '@lib/i18n'
import { Container, ExternalLink } from '@shared/ui'
import { FadeUp, SplitReveal } from '@shared/ui/motion'
import { FallbackNotice } from '@widgets/fallback-notice'

import { Fact } from './Fact'

type CaseStudyProps = {
  project: Project
  seed: number
  next: Project | null
  Body: MDXContent
}

export const CaseStudy: FC<CaseStudyProps> = ({ project, seed, next, Body }) => {
  const t = useTranslations()
  const { frontmatter } = project

  return (
    <article>
      <header className="pt-36 lg:pt-48">
        <Container>
          <SplitReveal as="h1" className="text-display-xl" trigger="mount">
            <span lang={project.sourceLocale}>{frontmatter.title}</span>
          </SplitReveal>
          <FadeUp className="mt-10 max-w-3xl lg:mt-14" delay={0.3} trigger="mount">
            <p className="text-lede text-fg-muted" lang={project.sourceLocale}>
              {frontmatter.summary}
            </p>
          </FadeUp>

          <FadeUp
            as="dl"
            className="mt-16 grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4 lg:mt-20"
            delay={0.45}
            trigger="mount"
          >
            <Fact label={t('Project.year')}>{frontmatter.year}</Fact>
            <Fact label={t('Project.status')}>
              {t(`Project.statusValue.${frontmatter.status}`)}
            </Fact>
            <Fact label={t('Project.services')}>
              {frontmatter.services.map(id => t(`Services.${id}.title`)).join(', ')}
            </Fact>
            {frontmatter.license ? (
              <Fact label={t('Project.license')}>{frontmatter.license}</Fact>
            ) : null}
            {frontmatter.stack.length > 0 ? (
              <Fact label={t('Project.stack')}>{frontmatter.stack.join(', ')}</Fact>
            ) : null}
            {frontmatter.repository || frontmatter.website ? (
              <Fact label={t('Project.links')}>
                <span className="flex flex-col gap-1">
                  {frontmatter.website ? (
                    <ExternalLink
                      className="inline-flex items-center gap-1.5 self-start"
                      href={frontmatter.website}
                    >
                      {t('Project.website')}
                      <ArrowUpRightIcon aria-hidden size={14} />
                      <span className="sr-only">{t('Common.newTab')}</span>
                    </ExternalLink>
                  ) : null}
                  {frontmatter.repository ? (
                    <ExternalLink
                      className="inline-flex items-center gap-1.5 self-start"
                      href={frontmatter.repository}
                    >
                      {t('Project.repository')}
                      <ArrowUpRightIcon aria-hidden size={14} />
                      <span className="sr-only">{t('Common.newTab')}</span>
                    </ExternalLink>
                  ) : null}
                </span>
              </Fact>
            ) : null}
          </FadeUp>
        </Container>
      </header>

      <Container className="mt-16 lg:mt-24">
        <ViewTransition default="none" name={`project-cover-${project.slug}`} share="morph">
          <ProjectCover
            className="aspect-[16/10] w-full lg:aspect-[21/9]"
            seed={seed}
            title={frontmatter.title}
          />
        </ViewTransition>
      </Container>

      <Container className="mt-20 grid lg:mt-32 lg:grid-cols-12">
        <div className="lg:col-span-7 lg:col-start-4">
          {project.isFallback ? <FallbackNotice message={t('Project.fallbackNotice')} /> : null}
          <div lang={project.sourceLocale}>
            <Body />
          </div>
        </div>
      </Container>

      {next ? (
        <Container className="mt-32 lg:mt-48">
          <Link
            className="group flex flex-col gap-6 border-t border-line pt-10 lg:flex-row lg:items-end lg:justify-between"
            href={`/work/${next.slug}`}
            lang={next.sourceLocale}
          >
            <span className="flex flex-col gap-4">
              <span className="text-fg-subtle">{t('Project.next')}</span>
              <span className="text-display-xl transition-colors duration-500 group-hover:text-accent">
                {next.frontmatter.title}
              </span>
            </span>
            <ArrowRightIcon
              aria-hidden
              className="size-12 text-fg-subtle transition-[transform,color] duration-500 ease-out-expo group-hover:translate-x-3 group-hover:text-accent lg:size-20"
            />
          </Link>
        </Container>
      ) : null}
    </article>
  )
}

CaseStudy.displayName = 'CaseStudy'
