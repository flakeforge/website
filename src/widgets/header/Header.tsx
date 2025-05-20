'use client'

import { type FC } from 'react'
import { useTheme } from 'next-themes'

export const Header: FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <header className="flex items-center justify-between">
      <p>header</p>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        <span>{theme}</span>
      </button>
    </header>
  )
}

Header.displayName = 'Header'
