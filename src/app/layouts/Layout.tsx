import { type FC, type PropsWithChildren } from 'react'

import { Footer } from '@widgets/footer'
import { Header } from '@widgets/header'

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <div>
    <Header />

    <main>{children}</main>

    <Footer />
  </div>
)
