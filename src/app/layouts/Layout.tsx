import { type FC, type PropsWithChildren, ViewTransition } from 'react'

import { useTranslations } from 'next-intl'

import { Footer } from '@widgets/footer'
import { Header } from '@widgets/header'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const t = useTranslations('Common')

  return (
    <div className="relative flex min-h-dvh flex-col" id="top">
      <a
        className="fixed top-3 left-3 z-overlay -translate-y-20 bg-accent px-4 py-3 text-sm font-medium text-accent-fg transition-transform focus-visible:translate-y-0"
        href="#content"
      >
        {t('skipToContent')}
      </a>
      <Header />
      <ViewTransition default="page">
        <main className="flex-1" id="content" tabIndex={-1}>
          {children}
        </main>
      </ViewTransition>
      <Footer />
    </div>
  )
}

Layout.displayName = 'Layout'
