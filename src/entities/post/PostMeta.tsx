import { type FC } from 'react'

import { useFormatter, useTranslations } from 'next-intl'

import { cn } from '@lib/cn'

type PostMetaProps = {
  date: Date
  readingMinutes: number
  isFallback?: boolean
  className?: string
}

export const PostMeta: FC<PostMetaProps> = ({ date, readingMinutes, isFallback, className }) => {
  const t = useTranslations('Common')
  const format = useFormatter()

  return (
    <p
      className={cn(
        'flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-fg-subtle',
        className
      )}
    >
      <time dateTime={date.toISOString().slice(0, 10)}>
        {format.dateTime(date, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}
      </time>
      <span>{t('readingTime', { minutes: readingMinutes })}</span>
      {isFallback ? (
        <span className="border border-line px-2 py-0.5 text-xs text-fg-muted">
          {t('englishVersion')}
        </span>
      ) : null}
    </p>
  )
}

PostMeta.displayName = 'PostMeta'
