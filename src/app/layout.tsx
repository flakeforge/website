import { type FC, type PropsWithChildren } from 'react'
import { getLocale } from 'next-intl/server'

import '@styles/globals.css'

export { metadata, viewport } from './config'

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
  const locale = await getLocale()

  return (
    <html suppressHydrationWarning lang={locale}>
      <body className="antialiased">{children}</body>
    </html>
  )
}

export default RootLayout
