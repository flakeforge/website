import { type FC } from 'react'

import { cn } from '@lib/utils'

export const Logo: FC = () => <div className={cn('font-black font-mono text-3xl')}>FlakeForge</div>

Logo.displayName = 'Logo'
