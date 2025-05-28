'use client'

import { type FC } from 'react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'

import { Logo } from '@shared/ui'
import { Button } from '@shared/ui/button'
import { MAIN_HEADER_CONFIG } from '@widgets/header/config'
import { Link } from '@lib/i18n'

export const Header: FC = () => {
  const { theme, setTheme } = useTheme()
  const t = useTranslations('Layout')

  return (
    <header className="sticky top-0 z-50 border-b py-2 backdrop-blur-sm w-full">
      <div className=" container-center flex-between">
        <Logo />

        <nav>
          <ul className="flex items-center gap-8">
            {MAIN_HEADER_CONFIG.map(({ title, href }) => (
              <li key={href}>
                <Link
                  className="text-base font-mono font-semibold text-muted-foreground hover:text-primary transition-colors"
                  href={href}
                >
                  {t(title)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? 'light mode' : 'dark mode'}
        </Button>
      </div>
    </header>
  )
}

Header.displayName = 'Header'
