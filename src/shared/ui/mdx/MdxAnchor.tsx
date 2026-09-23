import { type ComponentProps, type FC } from 'react'

import { cn } from '@lib/cn'
import { Link } from '@lib/i18n'

import { textLinkClassName } from '../text-link-styles'

export const MdxAnchor: FC<ComponentProps<'a'>> = ({
  href = '',
  className,
  children,
  ...props
}) => {
  const classes = cn(textLinkClassName, 'bg-[length:100%_1px] text-fg hover:text-accent', className)

  if (href.startsWith('/')) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return (
      <a aria-describedby={props['aria-describedby']} className={classes} href={href} id={props.id}>
        {children}
      </a>
    )
  }

  return (
    <a {...props} className={classes} href={href} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  )
}

MdxAnchor.displayName = 'MdxAnchor'
