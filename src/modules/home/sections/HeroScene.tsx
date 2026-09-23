'use client'

import { type FC, type PropsWithChildren, useRef } from 'react'

import { useGSAP } from '@gsap/react'

import { gsap, MEDIA, SplitText } from '@lib/gsap'

const ARM_DISTANCE = 140

const armOffset = (angle: number, distance: number): { x: number; y: number } => {
  const radians = (angle * Math.PI) / 180
  return { x: Math.sin(radians) * distance, y: -Math.cos(radians) * distance }
}

export const HeroScene: FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return

      const title = root.querySelector<HTMLElement>('[data-hero-title]')
      const arms = gsap.utils.toArray<SVGGElement>('[data-flake-arm]', root)
      const mm = gsap.matchMedia()

      mm.add(MEDIA.motion, () => {
        const timeline = gsap.timeline({ defaults: { ease: 'expo.out' } })

        if (title) {
          const split = SplitText.create(title, {
            type: 'lines',
            mask: 'lines',
            linesClass: 'split-line',
          })
          title.dataset.revealed = ''
          timeline.from(split.lines, { yPercent: 115, duration: 1.3, stagger: 0.1 }, 0.15)
        }

        timeline.from(
          arms,
          {
            opacity: 0,
            x: index => armOffset(Number(arms[index].dataset.flakeArm), ARM_DISTANCE * 2).x,
            y: index => armOffset(Number(arms[index].dataset.flakeArm), ARM_DISTANCE * 2).y,
            duration: 1.6,
            stagger: 0.06,
          },
          0.1
        )

        const scroll = gsap.timeline({
          scrollTrigger: {
            trigger: root.firstElementChild,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        })

        scroll
          .to(
            arms,
            {
              x: index => armOffset(Number(arms[index].dataset.flakeArm), ARM_DISTANCE).x,
              y: index => armOffset(Number(arms[index].dataset.flakeArm), ARM_DISTANCE).y,
              ease: 'none',
            },
            0
          )
          .to('[data-hero-content]', { yPercent: -18, autoAlpha: 0.2, ease: 'none' }, 0)
      })

      mm.add(MEDIA.reduced, () => {
        title?.setAttribute('data-revealed', '')
      })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className="contents">
      {children}
    </div>
  )
}

HeroScene.displayName = 'HeroScene'
