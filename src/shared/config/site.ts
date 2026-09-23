export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://flakeforge.com'

export const SITE = {
  name: 'FlakeForge',
  url: BASE_URL,
  email: 'oss@flakeforge.com',
  github: 'https://github.com/flakeforge',
  telegram: 'https://t.me/flakeforge',
  telegramHandle: '@flakeforge',
} as const

export const OPEN_SOURCE_REPOS = [
  { name: 'sf-icons', href: 'https://github.com/flakeforge/sf-icons' },
  { name: 'next-boilerplate', href: 'https://github.com/flakeforge/next-boilerplate' },
  { name: 'fin', href: 'https://github.com/flakeforge/fin' },
  { name: 'ekspertor', href: 'https://github.com/flakeforge/ekspertor' },
  { name: 'turbo-boilerplate', href: 'https://github.com/flakeforge/turbo-boilerplate' },
  { name: 'website', href: 'https://github.com/flakeforge/website' },
] as const

export const TEAM = [
  {
    id: 'muhammaddiyor',
    name: 'Muhammaddiyor Tohirov',
    href: 'https://github.com/mtakhirov',
  },
] as const
