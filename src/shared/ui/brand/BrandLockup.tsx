import { type FC } from 'react'

import { cn } from '@lib/cn'

import { FLAKE_ARM_ANGLES, FLAKE_ARM_POINTS } from './flake'
import { WORDMARK_GLYPHS } from './wordmark-glyphs'

type BrandLockupProps = {
  className?: string
}

export const BrandLockup: FC<BrandLockupProps> = ({ className }) => (
  <svg
    aria-hidden
    className={cn('block', className)}
    fill="currentColor"
    viewBox="84 70 1008 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g className="text-brand" transform="translate(185 170) scale(0.475)">
      {FLAKE_ARM_ANGLES.map(angle => (
        <polygon key={angle} points={FLAKE_ARM_POINTS} transform={`rotate(${angle})`} />
      ))}
    </g>
    {WORDMARK_GLYPHS.map(glyph => (
      <path
        key={`${glyph.x}-${glyph.y}`}
        d={glyph.d}
        transform={`translate(${glyph.x} ${glyph.y}) scale(${glyph.scale} ${-glyph.scale})`}
      />
    ))}
  </svg>
)

BrandLockup.displayName = 'BrandLockup'
