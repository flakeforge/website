import type { NextConfig } from 'next'

import createMDX from '@next/mdx'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/shared/lib/i18n/request.ts')

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm', 'remark-frontmatter'],
    rehypePlugins: [
      'rehype-slug',
      [
        'rehype-pretty-code',
        {
          theme: { dark: 'vesper', light: 'vitesse-light' },
          keepBackground: false,
          defaultLang: 'plaintext',
        },
      ],
    ],
  },
})

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['192.168.0.7'],
  poweredByHeader: false,
  experimental: {
    globalNotFound: true,
    optimizePackageImports: ['@phosphor-icons/react'],
  },
}

export default withNextIntl(withMDX(nextConfig))
