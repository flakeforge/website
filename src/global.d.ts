import type { routing } from '@lib/i18n/routing'

import type messages from '../messages/en.json'

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: number | string | undefined
  }
}

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof messages
  }
}
