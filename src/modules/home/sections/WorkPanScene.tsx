'use client'

import { type FC, type PropsWithChildren, useRef } from 'react'

import { useGSAP } from '@gsap/react'

import { gsap, MEDIA } from '@lib/gsap'

export const WorkPanScene: FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const wrapper = ref.current
      const track = wrapper?.querySelector<HTMLElement>('[data-pan-track]')
      if (!wrapper || !track) return

      const mm = gsap.matchMedia()

      mm.add(MEDIA.desktop, () => {
        gsap.set(track, { overflow: 'visible' })
        const distance = (): number => track.scrollWidth - document.documentElement.clientWidth

        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })

        gsap.from('[data-pan-card]', {
          yPercent: 12,
          autoAlpha: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: wrapper, start: 'top 70%', once: true },
        })
      })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className="md:flex md:min-h-dvh md:items-center">
      {children}
    </div>
  )
}

WorkPanScene.displayName = 'WorkPanScene'
