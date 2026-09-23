import { type FC, type ReactNode } from 'react'

import { ArrowRightIcon } from '@phosphor-icons/react/ssr'
import { useTranslations } from 'next-intl'

import { CONTACT_HREF } from '@config/navigation'
import { ButtonLink, Container, FlakeMark } from '@shared/ui'
import { Magnetic } from '@shared/ui/motion'

import { HeroScene } from './HeroScene'

const renderAccent = (chunks: ReactNode): ReactNode => <span className="text-accent">{chunks}</span>

export const Hero: FC = () => {
  const t = useTranslations()

  return (
    <HeroScene>
      <section
        aria-labelledby="hero-title"
        className="relative isolate flex min-h-dvh flex-col overflow-clip pt-28 pb-12 lg:pb-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute top-[12%] -right-[30vw] -z-10 w-[92vw] max-w-[68rem] sm:-right-[18vw] sm:w-[72vw] lg:top-1/2 lg:-right-[8vw] lg:w-[54vw] lg:-translate-y-1/2"
        >
          <FlakeMark armClassName="first:text-brand not-first:text-line" className="w-full" />
        </div>

        <Container data-hero-content className="mt-auto">
          <h1
            data-hero-title
            data-reveal
            className="max-w-[14ch] text-display-xl text-fg"
            id="hero-title"
          >
            {t.rich('Home.hero.title', { accent: renderAccent })}
          </h1>

          <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end">
            <p
              data-intro
              className="max-w-md text-lede text-fg-muted lg:col-span-5"
              style={{ '--intro-delay': '0.55s' }}
            >
              {t('Home.hero.lede')}
            </p>
            <div
              data-intro
              className="flex flex-wrap items-center gap-4 lg:col-span-6 lg:col-start-7 lg:justify-end"
              style={{ '--intro-delay': '0.65s' }}
            >
              <Magnetic>
                <ButtonLink href={CONTACT_HREF} icon={<ArrowRightIcon size={18} />} size="lg">
                  {t('Common.startProject')}
                </ButtonLink>
              </Magnetic>
              <ButtonLink href="/work" size="lg" variant="secondary">
                {t('Home.hero.secondary')}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </HeroScene>
  )
}

Hero.displayName = 'Hero'
