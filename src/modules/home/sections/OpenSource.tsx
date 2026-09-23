import { type FC } from 'react'

import { ArrowUpRightIcon, GithubLogoIcon } from '@phosphor-icons/react/ssr'
import { useTranslations } from 'next-intl'

import { SITE } from '@config/site'
import { Container, ExternalLink } from '@shared/ui'
import { FadeUp, SplitReveal } from '@shared/ui/motion'

import { MarqueeRow } from './MarqueeRow'

export const OpenSource: FC = () => {
  const t = useTranslations()

  return (
    <section aria-labelledby="open-source-title" className="py-32 lg:py-48">
      <Container className="grid gap-10 lg:grid-cols-12">
        <SplitReveal className="text-display lg:col-span-6" id="open-source-title">
          {t('Home.openSource.title')}
        </SplitReveal>
        <FadeUp className="flex flex-col items-start gap-8 lg:col-span-5 lg:col-start-8 lg:pt-4">
          <p className="text-lede text-fg-muted">{t('Home.openSource.body')}</p>
          <ExternalLink className="inline-flex items-center gap-2 text-fg" href={SITE.github}>
            <GithubLogoIcon aria-hidden size={20} />
            {t('Home.openSource.cta')}
            <ArrowUpRightIcon aria-hidden size={14} />
            <span className="sr-only">{t('Common.newTab')}</span>
          </ExternalLink>
        </FadeUp>
      </Container>

      <div className="group mt-20 flex overflow-clip border-y border-line py-8 lg:mt-28 lg:py-12">
        <div className="flex animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          <MarqueeRow />
          <MarqueeRow hidden />
        </div>
      </div>
    </section>
  )
}

OpenSource.displayName = 'OpenSource'
