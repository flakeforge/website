'use client'

import { type FC, type PropsWithChildren, useRef } from 'react'

import { useGSAP } from '@gsap/react'

import { ScrollTrigger } from '@lib/gsap'

export const HeaderShell: FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    const header = ref.current
    if (!header) return

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: self => {
        const offset = self.scroll()
        header.dataset.scrolled = String(offset > 24)
        header.dataset.hidden = String(self.direction === 1 && offset > 160)
      },
    })
  })

  return (
    <header
      ref={ref}
      className="group/header fixed inset-x-0 top-0 z-header transition-transform duration-500 ease-out-expo [view-transition-name:header] has-[[data-popup-open]]:translate-y-0 data-[hidden=true]:-translate-y-full"
      data-header
      data-hidden="false"
      data-scrolled="false"
    >
      <div className="border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-500 group-data-[scrolled=true]/header:border-line group-data-[scrolled=true]/header:bg-surface/80 group-data-[scrolled=true]/header:backdrop-blur-xl">
        {children}
      </div>
    </header>
  )
}

HeaderShell.displayName = 'HeaderShell'
