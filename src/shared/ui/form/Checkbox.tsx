'use client'

import { type ComponentProps, type FC } from 'react'

import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { CheckIcon } from '@phosphor-icons/react'

import { cn } from '@lib/cn'

type CheckboxProps = Omit<ComponentProps<typeof BaseCheckbox.Root>, 'className'> & {
  className?: string
}

export const Checkbox: FC<CheckboxProps> = ({ className, ...props }) => (
  <BaseCheckbox.Root
    className={cn(
      'flex size-5 shrink-0 items-center justify-center rounded-[2px] border border-line-strong bg-surface-raised text-accent-fg transition-colors duration-200 hover:border-fg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent data-[checked]:border-accent data-[checked]:bg-accent',
      className
    )}
    {...props}
  >
    <BaseCheckbox.Indicator className="flex transition-transform duration-200 ease-out-expo data-[ending-style]:scale-50 data-[starting-style]:scale-50">
      <CheckIcon size={14} weight="bold" />
    </BaseCheckbox.Indicator>
  </BaseCheckbox.Root>
)

Checkbox.displayName = 'Checkbox'
