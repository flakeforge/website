import { type FC } from 'react'

import { ArrowRightIcon } from '@phosphor-icons/react/ssr'
import { useTranslations } from 'next-intl'

import { CONTACT_HREF } from '@config/navigation'
import { ButtonLink, Container, FlakeMark } from '@shared/ui'
import { FadeUp, Magnetic, SplitReveal } from '@shared/ui/motion'

export const ClosingCta: FC = () => {
  const t = useTranslations()

  return (
    <section aria-labelledby="closing-title" className="relative overflow-clip py-32 lg:py-48">
      <FlakeMark className="pointer-events-none absolute top-1/2 -right-[14vw] w-[52vw] max-w-[52rem] -translate-y-1/2 text-surface-raised" />
      <Container className="relative">
        <SplitReveal className="max-w-5xl text-display-xl" id="closing-title">
          {t('Home.closing.title')}
        </SplitReveal>
        <FadeUp className="mt-10 flex flex-col items-start gap-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-lede text-fg-muted">{t('Home.closing.body')}</p>
          <Magnetic>
            <ButtonLink href={CONTACT_HREF} icon={<ArrowRightIcon size={20} />} size="lg">
              {t('Common.startProject')}
            </ButtonLink>
          </Magnetic>
        </FadeUp>
      </Container>
    </section>
  )
}

ClosingCta.displayName = 'ClosingCta'
