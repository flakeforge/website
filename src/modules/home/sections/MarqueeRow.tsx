import { type FC } from 'react'

import { OPEN_SOURCE_REPOS } from '@config/site'
import { FlakeMark } from '@shared/ui'

type MarqueeRowProps = {
  hidden?: boolean
}

export const MarqueeRow: FC<MarqueeRowProps> = ({ hidden }) => (
  <ul aria-hidden={hidden} className="flex shrink-0 items-center">
    {OPEN_SOURCE_REPOS.map(repo => (
      <li key={repo.name} className="flex items-center">
        <a
          className="px-6 text-display text-fg transition-colors duration-300 hover:text-accent lg:px-10"
          href={repo.href}
          rel="noopener noreferrer"
          tabIndex={hidden ? -1 : undefined}
          target="_blank"
        >
          {repo.name}
        </a>
        <FlakeMark className="size-8 shrink-0 text-brand" />
      </li>
    ))}
  </ul>
)

MarqueeRow.displayName = 'MarqueeRow'
