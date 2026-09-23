/**
 * Reads a list of strings from a raw next-intl message value.
 * @param value Result of `t.raw()` for a key that holds a JSON array.
 * @returns The string items, or an empty list when the value is not an array.
 */
export const toStringList = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
