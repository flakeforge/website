'use client'

import { type FC, useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'

import { gsap } from 'gsap'

import { type LocalesType } from '@shared/types'
import { Logo } from '@shared/ui'
import { Button } from '@shared/ui/button'
import { MAIN_HEADER_CONFIG } from '@widgets/header/config'
import { Link, LOCALES, usePathname, useRouter } from '@lib/i18n'

export const Header: FC = () => {
  const t = useTranslations('Layout')
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()
  const { theme, setTheme } = useTheme()

  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const hoverLineRef = useRef<HTMLDivElement>(null)

  const [, setHoveredNav] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: -20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
          }
        )
      }

      const elements = [logoRef.current, navRef.current, actionsRef.current].filter(Boolean)
      if (elements.length > 0) {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 0.2,
          }
        )
      }
    })

    return () => ctx.revert()
  }, [mounted])

  const handleChangeLocale = (): void => {
    const currentIndex = LOCALES.indexOf(currentLocale as LocalesType)
    const nextIndex = (currentIndex + 1) % LOCALES.length
    const nextLocale = LOCALES[nextIndex]

    router.replace(pathname, { locale: nextLocale })
  }

  const handleThemeToggle = (): void => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleNavHover = (href: string, element: HTMLElement): void => {
    if (!navRef.current || !hoverLineRef.current) return

    setHoveredNav(href)

    const rect = element.getBoundingClientRect()
    const navRect = navRef.current.getBoundingClientRect()

    gsap.to(hoverLineRef.current, {
      width: rect.width - 16,
      x: rect.left - navRect.left + 8,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleNavContainerLeave = (): void => {
    setHoveredNav(null)

    if (hoverLineRef.current) {
      gsap.to(hoverLineRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.out',
      })
    }
  }

  const handleButtonHover = (element: HTMLElement | null, isEnter: boolean): void => {
    if (!element) return

    gsap.to(element, {
      scale: isEnter ? 1.02 : 1,
      duration: 0.2,
      ease: 'power2.out',
    })
  }

  const handleThemeHover = (element: HTMLElement | null, isEnter: boolean): void => {
    if (!element) return

    const icon = element.querySelector('svg')
    if (icon) {
      gsap.to(icon, {
        rotation: isEnter ? 90 : 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
    handleButtonHover(element, isEnter)
  }

  if (!mounted) {
    return null
  }

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 backdrop-blur-md border-b border-border/40 bg-background/80"
      role="banner"
    >
      <div className="flex items-center h-16">
        <div
          ref={logoRef}
          className="border-r border-border/40 h-full flex items-center group cursor-pointer"
          onMouseEnter={e => handleButtonHover(e.currentTarget, true)}
          onMouseLeave={e => handleButtonHover(e.currentTarget, false)}
        >
          <Logo className="size-full px-6 transition-all duration-300 group-hover:text-primary" />
        </div>

        <Button
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          className="hover:text-primary hover:bg-primary/5 border-r border-border/40 rounded-none h-full px-6 transition-all duration-300"
          variant="ghost"
          onClick={handleThemeToggle}
          onMouseEnter={e => handleThemeHover(e.currentTarget, true)}
          onMouseLeave={e => handleThemeHover(e.currentTarget, false)}
        >
          {theme === 'dark' ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          )}
        </Button>

        <nav
          ref={navRef}
          aria-label="Main navigation"
          className="flex-grow px-8 relative"
          role="navigation"
          tabIndex={0}
          onMouseLeave={handleNavContainerLeave}
        >
          <div
            ref={hoverLineRef}
            className="absolute bottom-2 h-0.5 bg-primary opacity-0 pointer-events-none rounded-full transition-all duration-300"
          />

          <ul className="flex items-center justify-center gap-8">
            {MAIN_HEADER_CONFIG.map(({ title, href }) => (
              <li key={href}>
                <Link
                  aria-label={`Navigate to ${t(title)}`}
                  className="text-sm font-medium hover:text-primary transition-all duration-300 uppercase tracking-wide px-3 py-2 rounded-md relative block cursor-pointer"
                  href={href}
                  onMouseEnter={e => handleNavHover(href, e.currentTarget)}
                >
                  {t(title)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div ref={actionsRef} className="flex items-center border-l border-border/40 h-full">
          <Button
            aria-label={`Change language from ${currentLocale}`}
            className="hover:text-primary uppercase hover:bg-primary/5 border-r border-border/40 rounded-none h-full px-6 transition-all duration-300 cursor-pointer"
            variant="ghost"
            onClick={handleChangeLocale}
            onMouseEnter={e => handleButtonHover(e.currentTarget, true)}
            onMouseLeave={e => handleButtonHover(e.currentTarget, false)}
          >
            {currentLocale}
          </Button>

          {/* Blog Button */}
          <Button
            aria-label="Visit Blog"
            className="px-6 hover:text-primary hover:bg-primary/5 h-full rounded-none font-medium text-sm uppercase tracking-wide transition-all duration-300 cursor-pointer"
            variant="ghost"
            onMouseEnter={e => handleButtonHover(e.currentTarget, true)}
            onMouseLeave={e => handleButtonHover(e.currentTarget, false)}
          >
            BLOG
          </Button>
        </div>
      </div>
    </header>
  )
}

Header.displayName = 'Header'
