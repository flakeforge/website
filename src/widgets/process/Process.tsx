import { type FC } from 'react'

import { useTranslations } from 'next-intl'

import { Container } from '@shared/ui'
import { SplitReveal } from '@shared/ui/motion'

import { ProcessScene } from './ProcessScene'

const STEPS = ['discover', 'design', 'build', 'launch'] as const

type ProcessProps = {
  title: string
}

export const Process: FC<ProcessProps> = ({ title }) => {
  const t = useTranslations('Process')

  return (
    <section aria-labelledby="process-title" className="py-32 lg:py-48">
      <Container>
        <ProcessScene>
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <SplitReveal className="text-display" id="process-title">
                  {title}
                </SplitReveal>
              </div>
            </div>

            <ol
              data-process-steps
              className="relative flex flex-col gap-20 lg:col-span-6 lg:col-start-7 lg:gap-32"
            >
              <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-line" />
              <span
                aria-hidden
                data-process-line
                className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-accent"
              />
              {STEPS.map(step => (
                <li key={step} data-process-step className="relative pl-12">
                  <span
                    aria-hidden
                    className="absolute top-2 left-0 flex size-[11px] rotate-45 items-center justify-center border border-line-strong bg-surface"
                  >
                    <span data-process-dot className="size-[7px] bg-accent" />
                  </span>
                  <h3 className="text-title">{t(`${step}.title`)}</h3>
                  <p className="mt-5 max-w-xl text-lede text-fg-muted">{t(`${step}.body`)}</p>
                </li>
              ))}
            </ol>
          </div>
        </ProcessScene>
      </Container>
    </section>
  )
}

Process.displayName = 'Process'
