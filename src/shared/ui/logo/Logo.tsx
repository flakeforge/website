import { type FC } from 'react'

import { ROUTES } from '@shared/config'
import { Link } from '@lib/i18n'
import { cn } from '@lib/utils'

type Props = {
  className?: string
}

export const Logo: FC<Props> = ({ className }) => (
  <Link className={cn('flex-center', className)} href={ROUTES.HOME}>
    <div className="font-black text-3xl">FlakeForge</div>
  </Link>
)

Logo.displayName = 'Logo'
