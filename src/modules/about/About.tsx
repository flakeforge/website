import { type FC } from 'react'

import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr'
import { useTranslations } from 'next-intl'

import { TEAM } from '@config/site'
import { cn } from '@lib/cn'
import { Container, FlakeMark } from '@shared/ui'
import { FadeUp, SplitReveal } from '@shared/ui/motion'
import { ClosingCta } from '@widgets/closing-cta'
import { PageHeader } from '@widgets/page-header'

const PRINCIPLES = ['open', 'early', 'written'] as const

const initials = (name: string): string =>
  name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)

export const About: FC = () => {
  const t = useTranslations()

  return (
    <>
      <PageHeader intro={t('AboutPage.intro')} title={t('AboutPage.title')} />

      <section aria-labelledby="principles-title" className="py-32 lg:py-48">
        <Container>
          <SplitReveal className="text-display" id="principles-title">
            {t('AboutPage.principlesTitle')}
          </SplitReveal>
          <FadeUp stagger className="mt-16 grid gap-px bg-line lg:mt-24 lg:grid-cols-12">
            {PRINCIPLES.map((id, index) => (
              <article
                key={id}
                className={cn(
                  'relative flex min-h-80 flex-col justify-end gap-6 overflow-clip bg-surface p-8 lg:p-12',
                  index === 0 ? 'lg:col-span-12 lg:min-h-[28rem]' : 'lg:col-span-6'
                )}
              >
                {index === 0 ? (
                  <FlakeMark className="pointer-events-none absolute -top-24 -right-24 w-[28rem] text-surface-raised" />
                ) : null}
                <h3 className="relative text-title">{t(`AboutPage.principles.${id}.title`)}</h3>
                <p className="relative max-w-xl text-lede text-fg-muted">
                  {t(`AboutPage.principles.${id}.body`)}
                </p>
              </article>
            ))}
          </FadeUp>
        </Container>
      </section>

      <section aria-labelledby="team-title" className="pb-16">
        <Container>
          <SplitReveal className="text-display" id="team-title">
            {t('AboutPage.teamTitle')}
          </SplitReveal>
          <FadeUp
            stagger
            as="ul"
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4"
          >
            {TEAM.map(person => (
              <li key={person.id}>
                <a
                  className="group flex flex-col gap-5"
                  href={person.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span
                    aria-hidden
                    className="flex aspect-square items-center justify-center border border-line bg-surface-raised text-display text-fg-subtle transition-colors duration-500 group-hover:text-accent"
                  >
                    {initials(person.name)}
                  </span>
                  <span className="flex items-start justify-between gap-4">
                    <span className="flex flex-col gap-1">
                      <span className="text-xl font-semibold text-fg">{person.name}</span>
                      <span className="text-fg-muted">{t(`AboutPage.roles.${person.id}`)}</span>
                    </span>
                    <ArrowUpRightIcon
                      aria-hidden
                      className="mt-1 size-5 shrink-0 text-fg-subtle transition-[transform,color] duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    />
                  </span>
                  <span className="sr-only">
                    {t('AboutPage.profile')} {t('Common.newTab')}
                  </span>
                </a>
              </li>
            ))}
          </FadeUp>
        </Container>
      </section>

      <ClosingCta />
    </>
  )
}

About.displayName = 'About'
