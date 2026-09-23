import { type ComponentProps, type FC } from 'react'

import { cn } from '@lib/cn'

import { textLinkClassName } from './text-link-styles'

type ExternalLinkProps = Omit<ComponentProps<'a'>, 'rel' | 'target'>

export const ExternalLink: FC<ExternalLinkProps> = ({ className, children, ...props }) => (
  <a
    {...props}
    className={cn(textLinkClassName, className)}
    rel="noopener noreferrer"
    target="_blank"
  >
    {children}
  </a>
)

ExternalLink.displayName = 'ExternalLink'
