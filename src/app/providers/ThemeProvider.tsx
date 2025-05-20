import { type FC, type PropsWithChildren } from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <NextThemeProvider disableTransitionOnChange enableSystem attribute="class" defaultTheme="system">
    {children}
  </NextThemeProvider>
)
