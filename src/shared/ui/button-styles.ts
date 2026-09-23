import { cn } from '@lib/cn'

export type ButtonVariant = 'primary' | 'secondary'

export type ButtonSize = 'lg' | 'md'

const BASE =
  'group/button relative inline-flex shrink-0 items-center justify-center gap-3 overflow-hidden font-medium whitespace-nowrap transition-[background-color,border-color,color,transform] duration-300 ease-out-expo active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-fg hover:bg-fg',
  secondary: 'border border-line-strong text-fg hover:border-fg',
}

const SIZES: Record<ButtonSize, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-14 px-7 text-base',
}

/**
 * Class names for button-like elements, shared by `Button` and `ButtonLink`.
 * @param variant Visual style.
 * @param size Height and padding preset.
 * @param className Extra classes appended last.
 * @returns Class string.
 */
export const buttonClassName = (
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string
): string => cn(BASE, VARIANTS[variant], SIZES[size], className)
