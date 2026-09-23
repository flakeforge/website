type ClassValue = string | false | null | undefined

/**
 * Joins class names, skipping falsy values.
 * @param values Class strings or falsy placeholders from conditionals.
 * @returns A single space-separated class string.
 */
export const cn = (...values: ClassValue[]): string => values.filter(Boolean).join(' ')
