import { type FC, type ReactNode } from 'react'

import '@styles/globals.css'

export { metadata, viewport } from './config'

const RootLayout: FC<
  Readonly<{
    children: ReactNode
  }>
> = ({ children }) => (
  <html lang="en">
    <body className="antialiased">{children}</body>
  </html>
)

export default RootLayout
