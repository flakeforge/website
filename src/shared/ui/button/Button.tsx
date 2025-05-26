import { type ButtonHTMLAttributes, type ElementType, forwardRef, type ReactNode } from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@lib/utils'

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-slate-800 shadow-md hover:shadow-lg',
        destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg',
        outline:
          'border border-slate-200 bg-white hover:bg-slate-50 hover:text-slate-900 shadow-sm hover:shadow-md',
        secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 shadow-sm hover:shadow-md',
        ghost: 'hover:bg-slate-100 hover:text-slate-900',
        link: 'text-slate-900 underline-offset-4 hover:underline',
        gradient:
          'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 shadow-lg hover:shadow-xl',
        success: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg',
        warning: 'bg-amber-600 text-white hover:bg-amber-700 shadow-md hover:shadow-lg',
        info: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg',
        premium:
          'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 shadow-xl hover:shadow-2xl',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-md px-8 text-base',
        xl: 'h-14 rounded-lg px-12 text-lg font-semibold',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-12 w-12',
      },
      loading: {
        true: 'cursor-not-allowed opacity-70',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      loading: false,
    },
  }
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    as?: ElementType
    loading?: boolean
    leftIcon?: ReactNode
    rightIcon?: ReactNode
  }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant,
      size,
      loading = false,
      asChild = false,
      as: Component = 'button',
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    const buttonContent = (
      <>
        {loading ? (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              fill="currentColor"
            />
          </svg>
        ) : null}
        {!loading && leftIcon ? <span className="mr-2 flex items-center">{leftIcon}</span> : null}
        <span className="flex items-center">{children}</span>
        {!loading && rightIcon ? <span className="ml-2 flex items-center">{rightIcon}</span> : null}
      </>
    )

    if (asChild) {
      return (
        <Component
          ref={ref}
          className={cn(buttonVariants({ variant, size, loading }), className)}
          disabled={isDisabled}
          {...props}
        >
          {buttonContent}
        </Component>
      )
    }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, loading }), className)}
        disabled={isDisabled}
        {...props}
      >
        {buttonContent}
      </button>
    )
  }
)

Button.displayName = 'Button'
