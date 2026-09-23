'use client'

import { type ElementType, type FC, type ReactNode, useRef } from 'react'

import { useGSAP } from '@gsap/react'

import { DURATION, EASE, gsap, MEDIA, SplitText } from '@lib/gsap'

type SplitRevealProps = {
  as?: ElementType
  children: ReactNode
  className?: string
  id?: string
  trigger?: 'mount' | 'scroll'
  delay?: number
}

export const SplitReveal: FC<SplitRevealProps> = ({
  as: Tag = 'h2',
  children,
  className,
  id,
  trigger = 'scroll',
  delay = 0,
}) => {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const element = ref.current
      if (!element) return

      const mm = gsap.matchMedia()

      mm.add(MEDIA.motion, () => {
        const split = SplitText.create(element, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit: self => {
            element.dataset.revealed = ''
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: DURATION.slow,
              ease: EASE.out,
              stagger: 0.08,
              delay,
              scrollTrigger:
                trigger === 'scroll'
                  ? { trigger: element, start: 'top 85%', once: true }
                  : undefined,
            })
          },
        })

        return () => split.revert()
      })

      mm.add(MEDIA.reduced, () => {
        element.dataset.revealed = ''
      })
    },
    { scope: ref }
  )

  return (
    <Tag ref={ref} className={className} data-reveal={trigger === 'mount' ? '' : undefined} id={id}>
      {children}
    </Tag>
  )
}

SplitReveal.displayName = 'SplitReveal'
