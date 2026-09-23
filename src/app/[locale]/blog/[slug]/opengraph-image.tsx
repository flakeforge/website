import { ImageResponse } from 'next/og'

import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { getPost, getPostSlugs } from '@lib/content'
import { DEFAULT_LOCALE, isLocale, type Locale } from '@lib/i18n'
import { FLAKE_ARM_ANGLES, FLAKE_ARM_POINTS } from '@shared/ui/brand/flake'
import { WORDMARK_GLYPHS } from '@shared/ui/brand/wordmark-glyphs'

export const size = { width: 1200, height: 630 }

export const contentType = 'image/png'

export const alt = 'FlakeForge'

export const generateStaticParams = (): { slug: string }[] => getPostSlugs().map(slug => ({ slug }))

const FONT_DIR = join(process.cwd(), 'src/shared/assets/fonts')

const COLORS = {
  surface: '#111318',
  line: '#2b3038',
  fg: '#f4f4f2',
  muted: '#a3a7b0',
  accent: '#ff6a1a',
}

type RouteParams = { locale: string; slug: string }

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
}

const DATE_FORMATTERS: Record<Locale, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat('en', DATE_OPTIONS),
  ru: new Intl.DateTimeFormat('ru', DATE_OPTIONS),
  uz: new Intl.DateTimeFormat('uz', DATE_OPTIONS),
}

const Image = async ({ params }: { params: Promise<RouteParams> }): Promise<ImageResponse> => {
  const { locale, slug } = await params
  const activeLocale = isLocale(locale) ? locale : DEFAULT_LOCALE
  const post = getPost(slug, activeLocale)
  const [medium, semibold] = await Promise.all([
    readFile(join(FONT_DIR, 'Onest-500.ttf')),
    readFile(join(FONT_DIR, 'Onest-600.ttf')),
  ])

  const date = post ? DATE_FORMATTERS[activeLocale].format(post.frontmatter.date) : ''

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        backgroundColor: COLORS.surface,
        color: COLORS.fg,
        fontFamily: 'Onest',
        position: 'relative',
      }}
    >
      <svg
        height="720"
        style={{ position: 'absolute', right: -220, bottom: -260 }}
        viewBox="-256 -256 512 512"
        width="720"
      >
        {FLAKE_ARM_ANGLES.map(angle => (
          <polygon
            key={angle}
            fill={angle === 0 ? COLORS.accent : COLORS.line}
            points={FLAKE_ARM_POINTS}
            transform={`rotate(${angle})`}
          />
        ))}
      </svg>

      <svg height="48" viewBox="84 70 1008 200" width="242">
        <g transform="translate(185 170) scale(0.475)">
          {FLAKE_ARM_ANGLES.map(angle => (
            <polygon
              key={angle}
              fill={COLORS.accent}
              points={FLAKE_ARM_POINTS}
              transform={`rotate(${angle})`}
            />
          ))}
        </g>
        {WORDMARK_GLYPHS.map(glyph => (
          <path
            key={`${glyph.x}-${glyph.y}`}
            d={glyph.d}
            fill={COLORS.fg}
            transform={`translate(${glyph.x} ${glyph.y}) scale(${glyph.scale} ${-glyph.scale})`}
          />
        ))}
      </svg>

      <div
        style={{
          display: 'flex',
          maxWidth: 860,
          fontSize: 68,
          fontWeight: 600,
          lineHeight: 1.04,
          letterSpacing: '-0.035em',
        }}
      >
        {post?.frontmatter.title ?? 'FlakeForge'}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          fontSize: 26,
          color: COLORS.muted,
        }}
      >
        <div style={{ width: 48, height: 3, backgroundColor: COLORS.accent }} />
        <span>{date}</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Onest', data: medium, style: 'normal', weight: 500 },
        { name: 'Onest', data: semibold, style: 'normal', weight: 600 },
      ],
    }
  )
}

export default Image
