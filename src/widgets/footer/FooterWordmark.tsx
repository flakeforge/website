'use client'

import { type FC, useRef } from 'react'

import { useGSAP } from '@gsap/react'

import { gsap, MEDIA } from '@lib/gsap'
import { Wordmark } from '@shared/ui'

export const FooterWordmark: FC = () => {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MEDIA.motion, () => {
        gsap.from('[data-wordmark-glyph]', {
          yPercent: 110,
          ease: 'none',
          stagger: 0.04,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 0.6,
          },
        })
      })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} aria-hidden className="overflow-hidden pb-[2%]">
      <Wordmark className="w-full text-fg" />
    </div>
  )
}

FooterWordmark.displayName = 'FooterWordmark'
