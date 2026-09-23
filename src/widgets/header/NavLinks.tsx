'use client'

import { type FC } from 'react'

import { useTranslations } from 'next-intl'

import { NAV_ITEMS } from '@config/navigation'
import { cn } from '@lib/cn'
import { Link, usePathname } from '@lib/i18n'

export const NavLinks: FC = () => {
  const t = useTranslations('Nav')
  const pathname = usePathname()

  return (
    <ul className="flex items-center gap-8">
      {NAV_ITEMS.map(item => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
        return (
          <li key={item.id}>
            <Link
              aria-current={active ? 'page' : undefined}
              href={item.href}
              className={cn(
                'relative py-2 text-sm transition-colors duration-300 hover:text-fg',
                'after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-500 after:ease-out-expo',
                active ? 'text-fg after:scale-x-100' : 'text-fg-muted hover:after:scale-x-100'
              )}
            >
              {t(item.id)}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

NavLinks.displayName = 'NavLinks'
