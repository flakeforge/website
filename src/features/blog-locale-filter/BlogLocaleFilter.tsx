'use client'

import { type FC, type ReactNode, useId, useState } from 'react'

import { useTranslations } from 'next-intl'

import { Checkbox } from '@shared/ui/form'

type BlogLocaleFilterProps = {
  total: number
  native: number
  children: ReactNode
}

export const BlogLocaleFilter: FC<BlogLocaleFilterProps> = ({ total, native, children }) => {
  const t = useTranslations('Blog')
  const [onlyLocale, setOnlyLocale] = useState(false)
  const labelId = useId()
  const visible = onlyLocale ? native : total

  return (
    <div
      className="[&[data-only-locale=true]_[data-fallback=true]]:hidden"
      data-only-locale={onlyLocale}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <p aria-live="polite" className="text-fg-subtle">
          {t('count', { count: visible })}
        </p>
        <label className="flex cursor-pointer items-center gap-3 text-fg select-none" id={labelId}>
          <Checkbox
            aria-labelledby={labelId}
            checked={onlyLocale}
            onCheckedChange={setOnlyLocale}
          />
          {t('onlyLocale')}
        </label>
      </div>
      {children}
      {onlyLocale && native === 0 ? (
        <p className="py-16 text-lede text-fg-muted">{t('empty')}</p>
      ) : null}
    </div>
  )
}

BlogLocaleFilter.displayName = 'BlogLocaleFilter'
