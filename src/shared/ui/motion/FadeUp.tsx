'use client'

import { type ElementType, type FC, type ReactNode, useRef } from 'react'

import { useGSAP } from '@gsap/react'

import { DURATION, EASE, gsap, MEDIA } from '@lib/gsap'

type FadeUpProps = {
  as?: ElementType
  children: ReactNode
  className?: string
  id?: string
  trigger?: 'mount' | 'scroll'
  delay?: number
  stagger?: boolean
}

export const FadeUp: FC<FadeUpProps> = ({
  as: Tag = 'div',
  children,
  className,
  id,
  trigger = 'scroll',
  delay = 0,
  stagger = false,
}) => {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const element = ref.current
      if (!element || trigger === 'mount') return

      const mm = gsap.matchMedia()

      mm.add(MEDIA.motion, () => {
        element.dataset.revealed = ''
        gsap.from(stagger ? element.children : element, {
          y: 32,
          autoAlpha: 0,
          duration: DURATION.base,
          ease: EASE.out,
          delay,
          stagger: stagger ? 0.08 : 0,
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        })
      })

      mm.add(MEDIA.reduced, () => {
        element.dataset.revealed = ''
      })
    },
    { scope: ref }
  )

  return (
    <Tag
      ref={ref}
      className={className}
      data-intro={trigger === 'mount' ? '' : undefined}
      id={id}
      style={trigger === 'mount' ? { '--intro-delay': `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  )
}

FadeUp.displayName = 'FadeUp'
