import { type FC } from 'react'

import { cn } from '@lib/cn'

import { WORDMARK_GLYPHS } from './wordmark-glyphs'

type WordmarkProps = {
  className?: string
  glyphClassName?: string
  title?: string
}

export const Wordmark: FC<WordmarkProps> = ({ className, glyphClassName, title }) => (
  <svg
    aria-hidden={title ? undefined : true}
    className={cn('block overflow-visible', className)}
    fill="currentColor"
    role={title ? 'img' : undefined}
    viewBox="318 108 774 150"
    xmlns="http://www.w3.org/2000/svg"
  >
    {title ? <title>{title}</title> : null}
    {WORDMARK_GLYPHS.map(glyph => (
      <g key={`${glyph.x}-${glyph.y}`} data-wordmark-glyph className={glyphClassName}>
        <path
          d={glyph.d}
          transform={`translate(${glyph.x} ${glyph.y}) scale(${glyph.scale} ${-glyph.scale})`}
        />
      </g>
    ))}
  </svg>
)

Wordmark.displayName = 'Wordmark'
