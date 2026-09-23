'use client'

import { type FC, useLayoutEffect } from 'react'

import { paintTheme, readThemeMode } from '@lib/theme'

export const ThemeSync: FC = () => {
  useLayoutEffect(() => {
    paintTheme(readThemeMode())
  }, [])

  return null
}

ThemeSync.displayName = 'ThemeSync'
