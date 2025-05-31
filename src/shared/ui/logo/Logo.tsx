import { type FC } from 'react'

import { ROUTES } from '@shared/config'
import { Link } from '@lib/i18n'

export const Logo: FC = () => (
  <Link href={ROUTES.HOME}>
    <div className="font-black text-3xl">FlakeForge</div>
  </Link>
)

Logo.displayName = 'Logo'
