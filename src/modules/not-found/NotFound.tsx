import { type FC } from 'react'

import { ArrowRightIcon } from '@phosphor-icons/react/ssr'
import { useTranslations } from 'next-intl'

import { ButtonLink, Container, FlakeMark } from '@shared/ui'

export const NotFound: FC = () => {
  const t = useTranslations('NotFound')

  return (
    <section className="relative flex min-h-dvh items-end overflow-clip pt-36 pb-24">
      <FlakeMark
        armClassName="first:text-brand not-first:text-line"
        className="pointer-events-none absolute top-24 -right-[20vw] w-[70vw] max-w-[56rem]"
      />
      <Container className="relative">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-6 max-w-[16ch] text-display-xl">{t('title')}</h1>
        <p className="mt-8 max-w-md text-lede text-fg-muted">{t('body')}</p>
        <ButtonLink className="mt-12" href="/" icon={<ArrowRightIcon size={18} />} size="lg">
          {t('cta')}
        </ButtonLink>
      </Container>
    </section>
  )
}

NotFound.displayName = 'NotFound'
