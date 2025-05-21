'use client'

import { type FC } from 'react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'

import { Logo } from '@shared/ui'
import { MAIN_HEADER_CONFIG } from '@widgets/header/config'
import { Link } from '@lib/i18n'

export const Header: FC = () => {
  const { theme, setTheme } = useTheme()
  const t = useTranslations('Layout')

  return (
    <header className="sticky top-0 z-50 border-b py-5 flex items-center backdrop-blur-sm justify-between">
      <Logo />

      <nav>
        <ul className="flex items-center gap-8">
          {MAIN_HEADER_CONFIG.map(({ title, href }) => (
            <li key={href}>
              <Link
                className="text-base font-bold text-muted-foreground hover:text-primary transition-colors"
                href={href}
              >
                {t(title)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'dark' ? 'light mode' : 'dark mode'}
      </button>
    </header>
  )
}

Header.displayName = 'Header'
