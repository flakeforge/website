'use client'

import { type FC } from 'react'
import { useLocale, useTranslations } from 'next-intl'

import { type LocalesType } from '@shared/types'
import { Logo } from '@shared/ui'
import { Button } from '@shared/ui/button'
import { MAIN_HEADER_CONFIG } from '@widgets/header/config'
import { Link, LOCALES, usePathname, useRouter } from '@lib/i18n'

export const Header: FC = () => {
  const t = useTranslations('Layout')
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()

  const handleChangeLocale = (): void => {
    const currentIndex = LOCALES.indexOf(currentLocale as LocalesType)
    const nextIndex = (currentIndex + 1) % LOCALES.length
    const nextLocale = LOCALES[nextIndex]

    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <header className="sticky top-0 z-50 bg-background backdrop-blur-sm border-b border-input">
      <div className="flex items-center h-16">
        <div className="border-r border-input h-full flex items-center">
          <Logo className="size-full px-6 hover:text-primary transition-colors hover:bg-primary/10" />
        </div>

        <div className="relative border-r border-input h-full">
          <button className="flex items-center gap-2 px-6 h-full hover:bg-primary/10 hover:text-primary transition-colors">
            <span className="text-sm font-medium uppercase tracking-wide">{t('usecases')}</span>
          </button>
        </div>

        <nav className="flex-grow px-8">
          <ul className="flex items-center justify-center gap-8">
            {MAIN_HEADER_CONFIG.map(({ title, href }) => (
              <li key={href}>
                <Link
                  className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-wide"
                  href={href}
                >
                  {t(title)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center border-l border-input h-full">
          <Button
            className="hover:text-primary uppercase hover:bg-primary/10 border-r border-input rounded-none h-full px-6"
            variant="ghost"
            onClick={handleChangeLocale}
          >
            {currentLocale}
          </Button>

          <Button
            className="px-6 shadow-none hover:text-primary hover:bg-primary/10 h-full rounded-none font-medium text-sm uppercase tracking-wide"
            variant="ghost"
          >
            BLOG
          </Button>
        </div>
      </div>
    </header>
  )
}

Header.displayName = 'Header'
