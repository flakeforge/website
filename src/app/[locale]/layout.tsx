import { type FC, type PropsWithChildren } from 'react'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'

import { routing } from '@lib/i18n'

type Props = {
  params: Promise<{ locale: string }>
}

const LocaleLayout: FC<PropsWithChildren<Props>> = async ({ children, params }) => {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
