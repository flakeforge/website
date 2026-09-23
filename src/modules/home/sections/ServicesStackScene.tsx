'use client'

import { type FC, type PropsWithChildren, useRef } from 'react'

import { useGSAP } from '@gsap/react'

import { gsap, MEDIA } from '@lib/gsap'

export const ServicesStackScene: FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MEDIA.desktop, () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-stack-card]')

        cards.forEach((card, index) => {
          const next = cards[index + 1]
          if (!next) return

          gsap.to(card.querySelector('[data-stack-inner]'), {
            scale: 0.92,
            autoAlpha: 0.35,
            ease: 'none',
            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 25%', scrub: true },
          })
        })
      })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className="flex flex-col gap-6 md:gap-0">
      {children}
    </div>
  )
}

ServicesStackScene.displayName = 'ServicesStackScene'
