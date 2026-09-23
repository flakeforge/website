import { type FC, type ReactNode } from 'react'

type FactProps = {
  label: string
  children: ReactNode
}

export const Fact: FC<FactProps> = ({ label, children }) => (
  <div className="flex flex-col gap-2 border-t border-line pt-4">
    <dt className="text-sm text-fg-subtle">{label}</dt>
    <dd className="text-fg">{children}</dd>
  </div>
)

Fact.displayName = 'Fact'
