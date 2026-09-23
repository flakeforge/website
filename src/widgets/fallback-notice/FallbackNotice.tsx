import { type FC } from 'react'

import { TranslateIcon } from '@phosphor-icons/react/ssr'

type FallbackNoticeProps = {
  message: string
}

export const FallbackNotice: FC<FallbackNoticeProps> = ({ message }) => (
  <aside className="flex items-start gap-3 border border-line bg-surface-raised px-5 py-4 text-fg-muted">
    <TranslateIcon aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" />
    <p>{message}</p>
  </aside>
)

FallbackNotice.displayName = 'FallbackNotice'
