import { type FC, type PropsWithChildren } from 'react'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'

import { Layout } from '@app/layouts'
import { routing } from '@lib/i18n'

import '@styles/globals.css'

export { metadata, viewport } from './config'

type Props = {
  params: Promise<{ locale: string }>
}

const LocaleLayout: FC<PropsWithChildren<Props>> = async ({ children, params }) => {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html suppressHydrationWarning lang={locale}>
      <body>
        <NextIntlClientProvider>
          <Layout>{children}</Layout>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
