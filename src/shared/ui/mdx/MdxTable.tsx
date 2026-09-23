import { type ComponentProps, type FC } from 'react'

import { cn } from '@lib/cn'

export const MdxTable: FC<ComponentProps<'table'>> = ({ className, ...props }) => (
  <div data-lenis-prevent className="my-8 overflow-x-auto">
    <table className={cn('w-full border-collapse text-left text-base', className)} {...props} />
  </div>
)

MdxTable.displayName = 'MdxTable'
