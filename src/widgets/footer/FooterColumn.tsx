import { type FC, type ReactNode } from 'react'

type FooterColumnProps = {
  title: string
  children: ReactNode
}

export const FooterColumn: FC<FooterColumnProps> = ({ title, children }) => (
  <div>
    <h2 className="text-sm text-fg-subtle">{title}</h2>
    <ul className="mt-5 flex flex-col gap-3 text-fg">{children}</ul>
  </div>
)

FooterColumn.displayName = 'FooterColumn'
