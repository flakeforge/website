export const LOCALES = ['en', 'ru', 'uz'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
  uz: 'Oʻzbekcha',
}

export const LOCALE_OG: Record<Locale, string> = {
  en: 'en_US',
  ru: 'ru_RU',
  uz: 'uz_UZ',
}

/**
 * Narrows an arbitrary string to a supported locale.
 * @param value Raw value, usually from a route param or form field.
 * @returns `true` when the value is one of `LOCALES`.
 */
export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (LOCALES as readonly string[]).includes(value)
