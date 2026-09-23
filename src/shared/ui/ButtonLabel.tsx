import { type FC, type ReactNode } from 'react'

type ButtonLabelProps = {
  children: string
  icon?: ReactNode
}

export const ButtonLabel: FC<ButtonLabelProps> = ({ children, icon }) => (
  <>
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-out-expo group-hover/button:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-expo group-hover/button:translate-y-0"
      >
        {children}
      </span>
    </span>
    {icon ? (
      <span
        aria-hidden
        className="block transition-transform duration-500 ease-out-expo group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
      >
        {icon}
      </span>
    ) : null}
  </>
)

ButtonLabel.displayName = 'ButtonLabel'
