import { type FC } from 'react'

import { ArrowRightIcon } from '@phosphor-icons/react/ssr'
import { useTranslations } from 'next-intl'

import { ProjectCard } from '@entities/project'
import { type Project } from '@lib/content'
import { TextLink } from '@shared/ui'
import { SplitReveal } from '@shared/ui/motion'

import { WorkPanScene } from './WorkPanScene'

type WorkPanProps = {
  projects: Project[]
}

export const WorkPan: FC<WorkPanProps> = ({ projects }) => {
  const t = useTranslations('Home.work')

  return (
    <section aria-labelledby="work-title" className="border-y border-line py-24 md:py-0">
      <WorkPanScene>
        <div
          data-pan-track
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:px-6 md:gap-10 md:py-24 md:motion-reduce:grid md:motion-reduce:grid-cols-2 md:motion-reduce:overflow-visible lg:px-10"
        >
          <div className="flex w-[80vw] shrink-0 snap-start flex-col justify-between gap-10 md:w-[34vw] md:motion-reduce:col-span-2 md:motion-reduce:w-auto">
            <SplitReveal className="text-display" id="work-title">
              {t('title')}
            </SplitReveal>
            <TextLink className="inline-flex items-center gap-2 self-start text-fg" href="/work">
              {t('cta')}
              <ArrowRightIcon aria-hidden size={16} />
            </TextLink>
          </div>
          {projects.map((project, index) => (
            <div
              key={project.slug}
              data-pan-card
              className="w-[80vw] shrink-0 snap-start md:w-[44vw] md:motion-reduce:w-auto lg:w-[36vw] lg:motion-reduce:w-auto"
            >
              <ProjectCard index={index} project={project} />
            </div>
          ))}
          <div aria-hidden className="w-px shrink-0 md:w-[6vw] md:motion-reduce:hidden" />
        </div>
      </WorkPanScene>
    </section>
  )
}

WorkPan.displayName = 'WorkPan'
