import { type ComponentProps, type FC } from 'react'

import { cn } from '@lib/cn'
import { Link } from '@lib/i18n'

import { textLinkClassName } from './text-link-styles'

type TextLinkProps = ComponentProps<typeof Link>

export const TextLink: FC<TextLinkProps> = ({ className, children, ...props }) => (
  <Link {...props} className={cn(textLinkClassName, className)}>
    {children}
  </Link>
)

TextLink.displayName = 'TextLink'
