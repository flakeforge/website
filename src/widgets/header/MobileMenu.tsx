'use client'

import { type FC, useState } from 'react'

import { Dialog } from '@base-ui/react/dialog'
import { ArrowUpRightIcon, ListIcon, XIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'

import { CONTACT_HREF, NAV_ITEMS } from '@config/navigation'
import { SITE } from '@config/site'
import { LocaleSwitcher } from '@features/locale-switcher'
import { ThemeSwitcher } from '@features/theme-switcher'
import { cn } from '@lib/cn'
import { Link, usePathname } from '@lib/i18n'

export const MobileMenu: FC = () => {
  const t = useTranslations()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const links = [...NAV_ITEMS, { id: 'contact' as const, href: CONTACT_HREF }]

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label={t('Common.openMenu')}
        className="-mr-2 inline-flex size-11 items-center justify-center text-fg"
      >
        <ListIcon aria-hidden size={24} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Popup className="group/menu fixed inset-0 z-overlay flex flex-col bg-surface transition-opacity duration-500 ease-out-expo data-[ending-style]:opacity-0 data-[starting-style]:opacity-0">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <Dialog.Title className="font-mono text-xs tracking-[0.12em] text-fg-subtle uppercase">
              {t('Common.menu')}
            </Dialog.Title>
            <Dialog.Close
              aria-label={t('Common.closeMenu')}
              className="-mr-2 inline-flex size-11 items-center justify-center text-fg"
            >
              <XIcon aria-hidden size={24} />
            </Dialog.Close>
          </div>
          <nav aria-label={t('Common.mainNavigation')} className="flex-1 px-4 pt-6 sm:px-6">
            <ul className="flex flex-col">
              {links.map((item, index) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <li
                    key={item.id}
                    className="translate-y-0 border-b border-line opacity-100 transition-[transform,opacity] delay-[calc(var(--index)*60ms_+_120ms)] duration-700 ease-out-expo group-data-[starting-style]/menu:translate-y-8 group-data-[starting-style]/menu:opacity-0"
                    style={{ '--index': index }}
                  >
                    <Link
                      aria-current={active ? 'page' : undefined}
                      href={item.href}
                      className={cn(
                        'flex items-center justify-between py-4 text-4xl font-semibold tracking-tight',
                        active ? 'text-accent' : 'text-fg'
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {t(`Nav.${item.id}`)}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-4 sm:px-6">
            <a
              className="inline-flex items-center gap-2 text-sm text-fg-muted"
              href={SITE.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
              <ArrowUpRightIcon aria-hidden size={14} />
              <span className="sr-only">{t('Common.newTab')}</span>
            </a>
            <div className="flex items-center">
              <ThemeSwitcher />
              <LocaleSwitcher />
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

MobileMenu.displayName = 'MobileMenu'
