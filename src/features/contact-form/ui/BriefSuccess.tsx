'use client'

import { type FC, useEffect, useRef } from 'react'

import { useTranslations } from 'next-intl'

import { Button, FlakeMark } from '@shared/ui'

type BriefSuccessProps = {
  onReset: () => void
}

export const BriefSuccess: FC<BriefSuccessProps> = ({ onReset }) => {
  const t = useTranslations('Contact.success')
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div
      className="flex flex-col items-start gap-6 border border-line p-8 md:p-12"
      aria-live="polite"
    >
      <FlakeMark className="size-10 text-brand" />
      <h2 ref={headingRef} className="text-title outline-none" tabIndex={-1}>
        {t('title')}
      </h2>
      <p className="max-w-md text-lede text-fg-muted">{t('body')}</p>
      <Button type="button" variant="secondary" onClick={onReset}>
        {t('again')}
      </Button>
    </div>
  )
}

BriefSuccess.displayName = 'BriefSuccess'
