'use client'

import { type ComponentProps, type FC, type ReactNode } from 'react'

import { Button as BaseButton } from '@base-ui/react/button'

import { buttonClassName, type ButtonSize, type ButtonVariant } from './button-styles'
import { ButtonLabel } from './ButtonLabel'

type ButtonProps = Omit<ComponentProps<typeof BaseButton>, 'children' | 'className'> & {
  children: string
  className?: string
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
}

export const Button: FC<ButtonProps> = ({ children, variant, size, icon, className, ...props }) => (
  <BaseButton className={buttonClassName(variant, size, className)} {...props}>
    <ButtonLabel icon={icon}>{children}</ButtonLabel>
  </BaseButton>
)

Button.displayName = 'Button'
