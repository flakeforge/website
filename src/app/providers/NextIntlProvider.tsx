import { type FC, type PropsWithChildren } from 'react'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

import { routing } from '@lib/i18n'

type Props = {
  locale: string
}

export const NextIntlProvider: FC<PropsWithChildren<Props>> = async ({ children, locale }) => {
  const messages = await getMessages()

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
}
