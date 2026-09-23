'use client'

import { type FC } from 'react'

type InlineScriptProps = {
  html: string
}

export const InlineScript: FC<InlineScriptProps> = ({ html }) => (
  <script
    suppressHydrationWarning
    dangerouslySetInnerHTML={{ __html: html }}
    type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
  />
)

InlineScript.displayName = 'InlineScript'
