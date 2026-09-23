import * as rootParams from 'next/root-params'
import { type FC, type PropsWithChildren } from 'react'

import { NextIntlClientProvider } from 'next-intl'

import { Layout } from '@app/layouts'
import { SmoothScrollProvider, ThemeSync } from '@app/providers'
import { LOCALES } from '@lib/i18n'
import { THEME_INIT_SCRIPT } from '@lib/theme'
import { jetbrainsMono, onest } from '@shared/styles/fonts'
import { InlineScript } from '@shared/ui'

import '@styles/globals.css'

export { generateMetadata, viewport } from './config'

export const generateStaticParams = (): { locale: string }[] => LOCALES.map(locale => ({ locale }))

export const dynamicParams = false

const LocaleLayout: FC<PropsWithChildren> = async ({ children }) => {
  const locale = await rootParams.locale()

  return (
    <html
      suppressHydrationWarning
      className={`${onest.variable} ${jetbrainsMono.variable}`}
      lang={locale}
    >
      <head>
        <InlineScript html={THEME_INIT_SCRIPT} />
      </head>
      <body>
        <ThemeSync />
        <NextIntlClientProvider>
          <SmoothScrollProvider>
            <Layout>{children}</Layout>
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
