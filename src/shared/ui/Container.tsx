import { type ComponentPropsWithoutRef, type ElementType, type FC } from 'react'

import { cn } from '@lib/cn'

type ContainerProps = ComponentPropsWithoutRef<'div'> & {
  as?: ElementType
}

export const Container: FC<ContainerProps> = ({ as: Tag = 'div', className, ...props }) => (
  <Tag
    className={cn('mx-auto w-full max-w-[112rem] px-4 sm:px-6 lg:px-10', className)}
    {...props}
  />
)

Container.displayName = 'Container'
