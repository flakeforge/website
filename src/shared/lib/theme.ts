export const THEME_MODES = ['light', 'dark', 'system'] as const

export type ThemeMode = (typeof THEME_MODES)[number]

type ResolvedTheme = Exclude<ThemeMode, 'system'>

const THEME_STORAGE_KEY = 'flakeforge-theme'

const LIGHT_QUERY = '(prefers-color-scheme: light)'

const CHANGE_EVENT = 'flakeforge:theme'

export const THEME_INIT_SCRIPT = `(function(){try{var m=localStorage.getItem('${THEME_STORAGE_KEY}');var t=m==='light'||m==='dark'?m:matchMedia('${LIGHT_QUERY}').matches?'light':'dark';document.documentElement.dataset.theme=t}catch(e){}})()`

/**
 * Narrows an unknown value to a theme mode.
 * @param value Raw value from storage or a UI control.
 * @returns `true` for `light`, `dark`, or `system`.
 */
export const isThemeMode = (value: unknown): value is ThemeMode =>
  typeof value === 'string' && (THEME_MODES as readonly string[]).includes(value)

/**
 * Reads the stored theme preference.
 * @returns The saved mode, or `system` on the server, without storage, or with an unknown value.
 */
export const readThemeMode = (): ThemeMode => {
  if (typeof window === 'undefined') return 'system'
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    return isThemeMode(stored) ? stored : 'system'
  } catch {
    return 'system'
  }
}

/**
 * Turns a mode into the theme that should be painted.
 * @param mode Stored preference.
 * @returns `light` or `dark`; `system` follows `prefers-color-scheme`.
 */
const resolveTheme = (mode: ThemeMode): ResolvedTheme => {
  if (mode !== 'system') return mode
  return window.matchMedia(LIGHT_QUERY).matches ? 'light' : 'dark'
}

/**
 * Paints the theme for a mode on `<html>` without saving it.
 * @param mode Preference to paint.
 */
export const paintTheme = (mode: ThemeMode): void => {
  document.documentElement.dataset.theme = resolveTheme(mode)
}

const persistThemeMode = (mode: ThemeMode): boolean => {
  try {
    if (mode === 'system') window.localStorage.removeItem(THEME_STORAGE_KEY)
    else window.localStorage.setItem(THEME_STORAGE_KEY, mode)
    return true
  } catch {
    return false
  }
}

const notifyThemeChange = (): void => {
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

/**
 * Saves a theme preference, paints it, and notifies subscribers in this tab.
 * Painting still happens when storage is unavailable, the choice just does not persist.
 * @param mode Preference chosen by the user.
 */
const setThemeMode = (mode: ThemeMode): void => {
  persistThemeMode(mode)
  paintTheme(mode)
  notifyThemeChange()
}

/**
 * Subscribes to preference changes from this tab, other tabs, and the OS color scheme.
 * @param onChange Called after any change; read the new value with `readThemeMode`.
 * @returns Unsubscribe function.
 */
export const subscribeTheme = (onChange: () => void): (() => void) => {
  const media = window.matchMedia(LIGHT_QUERY)
  const onStorage = (event: StorageEvent): void => {
    if (event.key === THEME_STORAGE_KEY) {
      paintTheme(readThemeMode())
      onChange()
    }
  }
  const onMedia = (): void => {
    if (readThemeMode() === 'system') paintTheme('system')
    onChange()
  }

  window.addEventListener(CHANGE_EVENT, onChange)
  window.addEventListener('storage', onStorage)
  media.addEventListener('change', onMedia)

  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange)
    window.removeEventListener('storage', onStorage)
    media.removeEventListener('change', onMedia)
  }
}

type Point = { x: number; y: number }

/**
 * Switches the theme with a circular reveal that grows from `origin`.
 * Falls back to an instant switch without View Transitions, with reduced motion, or when the
 * painted theme would not change.
 * @param mode Preference chosen by the user.
 * @param origin Viewport point the reveal starts from, usually the center of the control.
 */
export const switchThemeMode = (mode: ThemeMode, origin?: Point): void => {
  const root = document.documentElement
  const animate =
    typeof document.startViewTransition === 'function' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    root.dataset.theme !== resolveTheme(mode)

  if (!animate) {
    setThemeMode(mode)
    return
  }

  const { x, y } = origin ?? { x: window.innerWidth / 2, y: 0 }
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

  root.dataset.themeTransition = ''
  const transition = document.startViewTransition(() => {
    persistThemeMode(mode)
    paintTheme(mode)
  })

  void transition.ready.then(() =>
    root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      {
        duration: 700,
        easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
        pseudoElement: '::view-transition-new(root)',
      }
    )
  )
  void transition.finished.finally(() => {
    delete root.dataset.themeTransition
    notifyThemeChange()
  })
}
