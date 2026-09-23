'use client'

import { type FC, type PropsWithChildren, useRef } from 'react'

import { useGSAP } from '@gsap/react'

import { gsap } from '@lib/gsap'

const FINE_POINTER =
  '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

export const ProjectIndexScene: FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      const preview = root?.querySelector<HTMLElement>('[data-index-preview]')
      if (!root || !preview) return

      const mm = gsap.matchMedia()

      mm.add(FINE_POINTER, () => {
        const slides = gsap.utils.toArray<HTMLElement>('[data-index-slide]', preview)
        const moveX = gsap.quickTo(preview, 'x', { duration: 0.7, ease: 'power3.out' })
        const moveY = gsap.quickTo(preview, 'y', { duration: 0.7, ease: 'power3.out' })
        const rows = gsap.utils.toArray<HTMLElement>('[data-index-row]', root)

        const onMove = (event: PointerEvent): void => {
          const rect = root.getBoundingClientRect()
          moveX(event.clientX - rect.left)
          moveY(event.clientY - rect.top)
        }

        const show = (index: number) => (): void => {
          gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'expo.out' })
          gsap.to(slides, { yPercent: -100 * index, duration: 0.7, ease: 'expo.out' })
        }

        const hide = (): void => {
          gsap.to(preview, { autoAlpha: 0, scale: 0.85, duration: 0.4, ease: 'power2.out' })
        }

        const enterHandlers = rows.map((_, index) => show(index))
        gsap.set(preview, { autoAlpha: 0, scale: 0.85, xPercent: -50, yPercent: -50 })
        root.addEventListener('pointermove', onMove)
        root.addEventListener('pointerleave', hide)
        rows.forEach((row, index) => row.addEventListener('pointerenter', enterHandlers[index]))

        return () => {
          root.removeEventListener('pointermove', onMove)
          root.removeEventListener('pointerleave', hide)
          rows.forEach((row, index) =>
            row.removeEventListener('pointerenter', enterHandlers[index])
          )
        }
      })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className="relative">
      {children}
    </div>
  )
}

ProjectIndexScene.displayName = 'ProjectIndexScene'
