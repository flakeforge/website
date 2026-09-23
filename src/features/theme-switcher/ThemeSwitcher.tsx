'use client'

import { type FC, useRef, useSyncExternalStore } from 'react'

import { Menu } from '@base-ui/react/menu'
import { CheckIcon, DesktopIcon, type Icon, MoonIcon, SunIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'

import { cn } from '@lib/cn'
import {
  isThemeMode,
  readThemeMode,
  subscribeTheme,
  switchThemeMode,
  THEME_MODES,
  type ThemeMode,
} from '@lib/theme'

const ICONS: Record<ThemeMode, Icon> = {
  light: SunIcon,
  dark: MoonIcon,
  system: DesktopIcon,
}

const serverMode = (): ThemeMode => 'system'

type ThemeSwitcherProps = {
  className?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
  const t = useTranslations('Theme')
  const mode = useSyncExternalStore(subscribeTheme, readThemeMode, serverMode)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const onValueChange = (value: unknown): void => {
    if (!isThemeMode(value)) return
    const rect = triggerRef.current?.getBoundingClientRect()
    switchThemeMode(
      value,
      rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : undefined
    )
  }

  return (
    <Menu.Root>
      <Menu.Trigger
        ref={triggerRef}
        aria-label={t('label')}
        className={cn(
          'inline-flex size-11 items-center justify-center text-fg-muted transition-colors duration-300 hover:text-fg data-[popup-open]:text-fg',
          className
        )}
      >
        <SunIcon aria-hidden className="hidden in-data-[theme=light]:block" size={18} />
        <MoonIcon aria-hidden className="block in-data-[theme=light]:hidden" size={18} />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner align="end" className="z-overlay outline-none" sideOffset={8}>
          <Menu.Popup className="min-w-44 origin-[var(--transform-origin)] border border-line bg-surface-raised p-1 shadow-[0_24px_48px_-16px_rgb(0_0_0/0.35)] transition-[opacity,transform] duration-300 ease-out-expo outline-none data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
            <Menu.RadioGroup value={mode} onValueChange={onValueChange}>
              {THEME_MODES.map(item => {
                const ModeIcon = ICONS[item]
                return (
                  <Menu.RadioItem
                    key={item}
                    closeOnClick
                    className="flex h-10 cursor-default items-center gap-3 px-3 text-sm text-fg-muted outline-none select-none data-[checked]:text-fg data-[highlighted]:bg-surface data-[highlighted]:text-fg"
                    value={item}
                  >
                    <ModeIcon aria-hidden size={16} />
                    <span className="flex-1">{t(item)}</span>
                    <Menu.RadioItemIndicator className="flex text-accent">
                      <CheckIcon aria-hidden size={14} />
                    </Menu.RadioItemIndicator>
                  </Menu.RadioItem>
                )
              })}
            </Menu.RadioGroup>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}

ThemeSwitcher.displayName = 'ThemeSwitcher'
