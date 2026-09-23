import { type FC, type ReactNode } from 'react'

import { Container } from '@shared/ui'
import { FadeUp, SplitReveal } from '@shared/ui/motion'

type PageHeaderProps = {
  title: string
  intro?: string
  children?: ReactNode
}

export const PageHeader: FC<PageHeaderProps> = ({ title, intro, children }) => (
  <header className="pt-36 pb-16 lg:pt-48 lg:pb-24">
    <Container>
      <SplitReveal as="h1" className="max-w-[18ch] text-display-xl" trigger="mount">
        {title}
      </SplitReveal>
      {intro || children ? (
        <FadeUp className="mt-10 flex flex-col gap-8 lg:mt-14" delay={0.35} trigger="mount">
          {intro ? <p className="max-w-2xl text-lede text-fg-muted">{intro}</p> : null}
          {children}
        </FadeUp>
      ) : null}
    </Container>
  </header>
)

PageHeader.displayName = 'PageHeader'
