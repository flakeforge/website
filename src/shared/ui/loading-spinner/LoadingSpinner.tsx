import { type FC } from 'react'

import { cn } from '@lib/utils'

type Props = {
  size?: string
}

export const LoadingSpinner: FC<Props> = ({ size = 'default' }) => {
  const spinnerSize =
    size === 'sm' ? 'h-3 w-3' : size === 'lg' || size === 'xl' ? 'h-5 w-5' : 'h-4 w-4'

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        spinnerSize
      )}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

LoadingSpinner.displayName = 'LoadingSpinner'
