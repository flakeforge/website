'use client'

import { type FC, type PropsWithChildren, useEffect, useRef } from 'react'

import Lenis from 'lenis'

import { gsap, MEDIA, ScrollTrigger } from '@lib/gsap'
import { usePathname } from '@lib/i18n'

export const SmoothScrollProvider: FC<PropsWithChildren> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add(MEDIA.motion, () => {
      const lenis = new Lenis({
        duration: 1.1,
        easing: time => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
        anchors: { offset: -80 },
        autoRaf: false,
      })
      lenisRef.current = lenis

      const tick = (time: number): void => lenis.raf(time * 1000)

      lenis.on('scroll', () => ScrollTrigger.update())
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)

      return () => {
        gsap.ticker.remove(tick)
        lenis.destroy()
        lenisRef.current = null
      }
    })

    return () => mm.revert()
  }, [])

  const lastPathname = useRef(pathname)

  useEffect(() => {
    const changed = lastPathname.current !== pathname
    lastPathname.current = pathname
    if (changed) lenisRef.current?.scrollTo(0, { immediate: true, force: true })
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(frame)
  }, [pathname])

  return <>{children}</>
}

SmoothScrollProvider.displayName = 'SmoothScrollProvider'
