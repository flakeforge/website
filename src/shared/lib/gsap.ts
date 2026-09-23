import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

export const EASE = {
  out: 'expo.out',
  inOut: 'power3.inOut',
  in: 'power2.in',
} as const

export const DURATION = {
  fast: 0.35,
  base: 0.8,
  slow: 1.2,
} as const

export const MEDIA = {
  motion: '(prefers-reduced-motion: no-preference)',
  reduced: '(prefers-reduced-motion: reduce)',
  desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
} as const

export { gsap, ScrollTrigger, SplitText }
