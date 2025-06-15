import { type FC } from 'react'

import { gsap } from 'gsap'

import { ROUTES } from '@shared/config'
import { Link } from '@lib/i18n'
import { cn } from '@lib/utils'

type Props = {
  className?: string
}

export const Logo: FC<Props> = ({ className }) => (
  <Link
    aria-label="Company Logo"
    className={cn('flex-center', className)}
    href={ROUTES.HOME}
    role="img"
    tabIndex={0}
    onMouseEnter={e => {
      gsap.to(e.currentTarget, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
      })
    }}
    onMouseLeave={e => {
      gsap.to(e.currentTarget, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
    }}
  >
    <div className="font-black text-3xl">FlakeForge</div>
  </Link>
)

Logo.displayName = 'Logo'
