import { type FC } from 'react'

import { cn } from '@lib/cn'
import { FLAKE_ARM_ANGLES, FLAKE_ARM_POINTS } from '@shared/ui'

type ProjectCoverProps = {
  title: string
  seed: number
  className?: string
}

const COMPOSITIONS = [
  { arm: 0, x: '64%', y: '58%', scale: 1.9 },
  { arm: 2, x: '30%', y: '62%', scale: 2.3 },
  { arm: 4, x: '70%', y: '38%', scale: 1.6 },
  { arm: 1, x: '46%', y: '50%', scale: 2.6 },
] as const

export const ProjectCover: FC<ProjectCoverProps> = ({ title, seed, className }) => {
  const composition = COMPOSITIONS[seed % COMPOSITIONS.length]

  return (
    <div
      className={cn('relative isolate overflow-hidden bg-surface-raised', className)}
      style={{ '--cover-x': composition.x, '--cover-y': composition.y }}
    >
      <svg
        aria-hidden
        className="absolute inset-0 size-full text-line"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 800 600"
      >
        <defs>
          <pattern height="60" id={`hex-${seed}`} patternUnits="userSpaceOnUse" width="104">
            <path
              d="M0 15 26 0l26 15v30L26 60 0 45Zm52 0 26-15 26 15v30L78 60 52 45Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect fill={`url(#hex-${seed})`} height="600" width="800" />
      </svg>
      <svg
        aria-hidden
        className="absolute top-[var(--cover-y)] left-[var(--cover-x)] w-[70%] -translate-1/2 transition-transform duration-1000 ease-out-expo group-hover:scale-105"
        viewBox="-256 -256 512 512"
      >
        <g transform={`scale(${composition.scale / 2})`}>
          {FLAKE_ARM_ANGLES.map((angle, index) => (
            <polygon
              key={angle}
              className={index === composition.arm ? 'fill-brand' : 'fill-line-strong'}
              points={FLAKE_ARM_POINTS}
              transform={`rotate(${angle})`}
            />
          ))}
        </g>
      </svg>
      <p
        aria-hidden
        className="absolute bottom-5 left-5 font-mono text-xs tracking-[0.12em] text-fg-subtle uppercase"
      >
        {title}
      </p>
    </div>
  )
}

ProjectCover.displayName = 'ProjectCover'
