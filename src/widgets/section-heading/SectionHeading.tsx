import { type FC, type ReactNode } from 'react'

import { cn } from '@lib/cn'
import { SplitReveal } from '@shared/ui/motion'

type SectionHeadingProps = {
  id?: string
  title: string
  action?: ReactNode
  className?: string
}

export const SectionHeading: FC<SectionHeadingProps> = ({ id, title, action, className }) => (
  <div className={cn('flex flex-wrap items-end justify-between gap-x-10 gap-y-6', className)}>
    <SplitReveal className="max-w-4xl text-display" id={id}>
      {title}
    </SplitReveal>
    {action ? <div className="pb-2">{action}</div> : null}
  </div>
)

SectionHeading.displayName = 'SectionHeading'
