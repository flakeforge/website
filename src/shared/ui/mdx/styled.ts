import { type ComponentProps, createElement, type FC, type JSX } from 'react'

import { cn } from '@lib/cn'

/**
 * Creates a component that renders an HTML element with base classes merged in front of
 * the incoming `className`.
 * @param tag Intrinsic element to render.
 * @param baseClassName Classes applied to every instance.
 * @returns A component with the element's props.
 */
export const styled = <Tag extends keyof JSX.IntrinsicElements>(
  tag: Tag,
  baseClassName: string
): FC<ComponentProps<Tag>> => {
  const Styled: FC<ComponentProps<Tag>> = ({ className, ...props }) =>
    createElement(tag, { ...props, className: cn(baseClassName, className) })
  Styled.displayName = `Mdx(${tag})`
  return Styled
}
