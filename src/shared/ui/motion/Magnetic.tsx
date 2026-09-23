'use client'

import { type FC, type ReactNode, useRef } from 'react'

import { useGSAP } from '@gsap/react'

import { gsap } from '@lib/gsap'

type MagneticProps = {
  children: ReactNode
  className?: string
  strength?: number
}

const FINE_POINTER =
  '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

export const Magnetic: FC<MagneticProps> = ({ children, className, strength = 0.3 }) => {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const element = ref.current
      if (!element) return

      const mm = gsap.matchMedia()

      mm.add(FINE_POINTER, () => {
        const moveX = gsap.quickTo(element, 'x', { duration: 0.6, ease: 'power3.out' })
        const moveY = gsap.quickTo(element, 'y', { duration: 0.6, ease: 'power3.out' })

        const onMove = (event: PointerEvent): void => {
          const rect = element.getBoundingClientRect()
          moveX((event.clientX - rect.left - rect.width / 2) * strength)
          moveY((event.clientY - rect.top - rect.height / 2) * strength)
        }

        const onLeave = (): void => {
          moveX(0)
          moveY(0)
        }

        element.addEventListener('pointermove', onMove)
        element.addEventListener('pointerleave', onLeave)

        return () => {
          element.removeEventListener('pointermove', onMove)
          element.removeEventListener('pointerleave', onLeave)
        }
      })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={className ?? 'inline-block'}>
      {children}
    </div>
  )
}

Magnetic.displayName = 'Magnetic'
