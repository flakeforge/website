import { type FC } from 'react'

import { cn } from '@lib/cn'

import { FLAKE_ARM_ANGLES, FLAKE_ARM_POINTS } from './flake'

type FlakeMarkProps = {
  className?: string
  title?: string
  armClassName?: string
}

export const FlakeMark: FC<FlakeMarkProps> = ({ className, title, armClassName }) => (
  <svg
    aria-hidden={title ? undefined : true}
    className={cn('block', className)}
    fill="currentColor"
    role={title ? 'img' : undefined}
    viewBox="-256 -256 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    {title ? <title>{title}</title> : null}
    <g data-flake-body>
      {FLAKE_ARM_ANGLES.map(angle => (
        <g key={angle} className={armClassName} data-flake-arm={angle}>
          <polygon points={FLAKE_ARM_POINTS} transform={`rotate(${angle})`} />
        </g>
      ))}
    </g>
  </svg>
)

FlakeMark.displayName = 'FlakeMark'
