import { type ComponentProps, type FC, type ReactNode } from 'react'

import { Link } from '@lib/i18n'

import { buttonClassName, type ButtonSize, type ButtonVariant } from './button-styles'
import { ButtonLabel } from './ButtonLabel'

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, 'children'> & {
  children: string
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
}

export const ButtonLink: FC<ButtonLinkProps> = ({
  children,
  variant,
  size,
  icon,
  className,
  ...props
}) => (
  <Link className={buttonClassName(variant, size, className)} {...props}>
    <ButtonLabel icon={icon}>{children}</ButtonLabel>
  </Link>
)

ButtonLink.displayName = 'ButtonLink'
