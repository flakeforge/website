'use client'

import { type FC, type PropsWithChildren, useRef } from 'react'

import { useGSAP } from '@gsap/react'

import { gsap, MEDIA } from '@lib/gsap'

export const ProcessScene: FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MEDIA.motion, () => {
        gsap.fromTo(
          '[data-process-line]',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '[data-process-steps]',
              start: 'top 70%',
              end: 'bottom 70%',
              scrub: 0.4,
            },
          }
        )

        gsap.utils.toArray<HTMLElement>('[data-process-step]').forEach(step => {
          gsap.from(step, {
            autoAlpha: 0,
            y: 40,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          })
          gsap.from(step.querySelector('[data-process-dot]'), {
            scale: 0,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: step,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          })
        })
      })
    },
    { scope: ref }
  )

  return <div ref={ref}>{children}</div>
}

ProcessScene.displayName = 'ProcessScene'
