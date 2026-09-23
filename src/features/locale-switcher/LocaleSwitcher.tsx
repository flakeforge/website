'use client'

import { type FC } from 'react'

import { Menu } from '@base-ui/react/menu'
import { CaretDownIcon, CheckIcon } from '@phosphor-icons/react'
import { useLocale, useTranslations } from 'next-intl'

import { cn } from '@lib/cn'
import { Link, LOCALE_LABELS, LOCALES, usePathname } from '@lib/i18n'

type LocaleSwitcherProps = {
  className?: string
}

export const LocaleSwitcher: FC<LocaleSwitcherProps> = ({ className }) => {
  const t = useTranslations('Common')
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <Menu.Root>
      <Menu.Trigger
        aria-label={t('language')}
        className={cn(
          'group inline-flex h-11 items-center gap-1.5 px-2 font-mono text-xs tracking-[0.12em] text-fg-muted uppercase transition-colors duration-300 hover:text-fg data-[popup-open]:text-fg',
          className
        )}
      >
        {locale}
        <CaretDownIcon
          aria-hidden
          className="transition-transform duration-300 ease-out-expo group-data-[popup-open]:rotate-180"
          size={12}
          weight="bold"
        />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner align="end" className="z-overlay outline-none" sideOffset={8}>
          <Menu.Popup className="min-w-44 origin-[var(--transform-origin)] border border-line bg-surface-raised p-1 shadow-[0_24px_48px_-16px_rgb(0_0_0/0.6)] transition-[opacity,transform] duration-300 ease-out-expo outline-none data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
            {LOCALES.map(item => (
              <Menu.LinkItem
                key={item}
                aria-current={item === locale ? 'true' : undefined}
                className="flex h-10 cursor-default items-center justify-between gap-6 px-3 text-sm text-fg-muted outline-none select-none aria-[current=true]:text-fg data-[highlighted]:bg-surface data-[highlighted]:text-fg"
                render={props => (
                  <Link {...props} href={pathname} hrefLang={item} lang={item} locale={item}>
                    {props.children}
                  </Link>
                )}
              >
                {LOCALE_LABELS[item]}
                {item === locale ? (
                  <CheckIcon aria-hidden className="text-accent" size={14} />
                ) : null}
              </Menu.LinkItem>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}

LocaleSwitcher.displayName = 'LocaleSwitcher'
