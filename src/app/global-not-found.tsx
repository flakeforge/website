import { type Metadata } from 'next'
import Link from 'next/link'
import { type FC } from 'react'

import { THEME_INIT_SCRIPT } from '@lib/theme'
import { jetbrainsMono, onest } from '@shared/styles/fonts'
import { InlineScript } from '@shared/ui'

import messages from '../../messages/en.json'

import '@styles/globals.css'

export const metadata: Metadata = {
  title: messages.Metadata.notFound.title,
}

const GlobalNotFound: FC = () => (
  <html
    suppressHydrationWarning
    className={`${onest.variable} ${jetbrainsMono.variable}`}
    lang="en"
  >
    <head>
      <InlineScript html={THEME_INIT_SCRIPT} />
    </head>
    <body>
      <main className="mx-auto flex min-h-dvh w-full max-w-[112rem] flex-col justify-end px-4 pb-24 sm:px-6 lg:px-10">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-6 max-w-[16ch] text-display-xl">{messages.NotFound.title}</h1>
        <p className="mt-8 max-w-md text-lede text-fg-muted">{messages.NotFound.body}</p>
        <Link
          className="mt-12 inline-flex h-14 items-center self-start bg-accent px-7 font-medium text-accent-fg"
          href="/en"
        >
          {messages.NotFound.cta}
        </Link>
      </main>
    </body>
  </html>
)

export default GlobalNotFound
