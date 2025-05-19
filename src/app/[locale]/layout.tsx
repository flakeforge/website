import { type FC, type PropsWithChildren } from 'react'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'

import { Layout } from '@app/layouts'
import { NextIntlProvider } from '@app/providers'
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
    <NextIntlProvider locale={locale}>
      <Layout>{children}</Layout>
    </NextIntlProvider>
  )
}

export default LocaleLayout
