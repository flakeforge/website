'use client'

import {
  type ButtonHTMLAttributes,
  type ElementType,
  forwardRef,
  type ReactNode,
  useEffect,
  useRef,
} from 'react'

import { cva, type VariantProps } from 'class-variance-authority'
import { gsap } from 'gsap'
import type React from 'react'

import { LoadingSpinner } from '@shared/ui/loading-spinner'
import { cn } from '@lib/utils'

export const buttonVariants = cva(
  'relative inline-flex items-center justify-center font-medium transition-colors duration-200 overflow-hidden disabled:pointer-events-none disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  {
    variants: {
      variant: {
        default: [
          'bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg shadow-primary/20',
          'before:absolute before:inset-0 before:bg-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300',
        ],
        secondary: [
          'bg-accent/50 text-foreground border border-accent shadow-sm',
          'hover:bg-accent/70 hover:shadow-md transition-all duration-200',
        ],
        outline: [
          'border-2 border-primary/20 text-primary bg-transparent',
          'hover:bg-primary/5 hover:border-primary/40 transition-all duration-200',
        ],
        ghost: ['text-foreground bg-transparent', 'hover:bg-accent/30 transition-all duration-200'],
        destructive: [
          'bg-gradient-to-r from-destructive to-destructive/90 text-white shadow-lg shadow-destructive/20',
          'before:absolute before:inset-0 before:bg-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300',
        ],
        link: [
          'text-primary bg-transparent underline-offset-4 p-0 h-auto',
          'hover:underline transition-all duration-200',
        ],
      },
      size: {
        sm: 'h-8 px-4 text-xs rounded-xl gap-2 font-medium',
        default: 'h-10 px-5 text-sm rounded-xl gap-2.5 font-medium',
        lg: 'h-12 px-7 text-base rounded-2xl gap-3 font-semibold',
        xl: 'h-14 px-9 text-lg rounded-2xl gap-3.5 font-bold tracking-wide',
        icon: 'h-10 w-10 rounded-xl',
        'icon-sm': 'h-8 w-8 rounded-xl',
        'icon-lg': 'h-12 w-12 rounded-2xl',
      },
      loading: {
        true: 'cursor-not-allowed',
        false: 'cursor-pointer',
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
    hoverText?: string
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
      hoverText,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLButtonElement>(null)
    const childrenRef = useRef<HTMLSpanElement>(null)
    const hoverTextRef = useRef<HTMLSpanElement>(null)
    const tl = useRef<gsap.core.Timeline | null>(null)

    const buttonRef = (ref as React.RefObject<HTMLButtonElement>) || internalRef
    const isDisabled = disabled || loading

    useEffect(() => {
      const button = buttonRef.current
      const childrenEl = childrenRef.current
      const hoverTextEl = hoverTextRef.current

      if (!button || !hoverText || !childrenEl || !hoverTextEl) return

      if (tl.current) {
        tl.current.kill()
      }
      tl.current = gsap.timeline({ paused: true })

      const handleMouseEnter = (e: MouseEvent): void => {
        if (isDisabled) return

        const rect = button.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        let fromDirection = { x: 0, y: 0 }
        let toDirection = { x: 0, y: 0 }

        if (Math.abs(mouseX - centerX) > Math.abs(mouseY - centerY)) {
          if (mouseX < centerX) {
            fromDirection = { x: -100, y: 0 }
            toDirection = { x: 100, y: 0 }
          } else {
            fromDirection = { x: 100, y: 0 }
            toDirection = { x: -100, y: 0 }
          }
        } else {
          if (mouseY < centerY) {
            fromDirection = { x: 0, y: -100 }
            toDirection = { x: 0, y: 100 }
          } else {
            fromDirection = { x: 0, y: 100 }
            toDirection = { x: 0, y: -100 }
          }
        }

        if (tl.current) {
          tl.current.clear()
        }

        gsap.to(button, {
          x: (mouseX - centerX) * 0.1,
          y: (mouseY - centerY) * 0.1,
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
        })

        if (hoverTextEl && childrenEl) {
          gsap.set(hoverTextEl, {
            x: fromDirection.x + '%',
            y: fromDirection.y + '%',
            opacity: 0,
          })

          gsap.to(hoverTextEl, {
            x: '0%',
            y: '0%',
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(1.7)',
          })

          gsap.to(childrenEl, {
            x: toDirection.x + '%',
            y: toDirection.y + '%',
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
          })
        }
      }

      const handleMouseLeave = (): void => {
        if (isDisabled) return

        gsap.to(button, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)',
        })

        if (hoverTextEl && childrenEl) {
          gsap.to(hoverTextEl, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in',
          })

          gsap.to(childrenEl, {
            x: '0%',
            y: '0%',
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(1.7)',
            delay: 0.1,
          })
        }
      }

      const handleMouseMove = (e: MouseEvent): void => {
        if (isDisabled) return

        const rect = button.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2

        gsap.to(button, {
          x: (mouseX - centerX) * 0.1,
          y: (mouseY - centerY) * 0.1,
          duration: 0.2,
          ease: 'power2.out',
        })
      }

      button.addEventListener('mouseenter', handleMouseEnter)
      button.addEventListener('mouseleave', handleMouseLeave)
      button.addEventListener('mousemove', handleMouseMove)

      return () => {
        button.removeEventListener('mouseenter', handleMouseEnter)
        button.removeEventListener('mouseleave', handleMouseLeave)
        button.removeEventListener('mousemove', handleMouseMove)
        if (tl.current) {
          tl.current.kill()
        }
      }
    }, [isDisabled, hoverText, buttonRef])

    const content = (
      <>
        {loading ? <LoadingSpinner size={size || 'default'} /> : null}

        {!loading && leftIcon ? (
          <span className="flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110">
            {leftIcon}
          </span>
        ) : null}

        {children ? (
          <span ref={childrenRef} className={cn('truncate relative', loading && 'opacity-70')}>
            {children}
          </span>
        ) : null}

        {hoverText ? (
          <span
            ref={hoverTextRef}
            className="absolute inset-0 flex items-center justify-center truncate opacity-0 pointer-events-none font-medium"
          >
            {hoverText}
          </span>
        ) : null}

        {!loading && rightIcon ? (
          <span className="flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110">
            {rightIcon}
          </span>
        ) : null}
      </>
    )

    if (asChild) {
      return (
        <Component
          ref={buttonRef}
          className={cn(buttonVariants({ variant, size, loading }), 'group', className)}
          disabled={isDisabled}
          {...props}
        >
          {content}
        </Component>
      )
    }

    return (
      <button
        ref={buttonRef}
        className={cn(buttonVariants({ variant, size, loading }), 'group', className)}
        disabled={isDisabled}
        {...props}
      >
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'
