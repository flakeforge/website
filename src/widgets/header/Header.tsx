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

  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.1,
        }
      )

      gsap.fromTo(
        logoRef.current,
        { scale: 0.9, opacity: 0, x: -20 },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'back.out(1.2)',
          delay: 0.3,
        }
      )

      gsap.fromTo(
        navRef.current?.children[1]?.children,
        { y: 20, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.1)',
          delay: 0.5,
        }
      )

      gsap.fromTo(
        actionsRef.current?.children,
        { x: 30, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'back.out(1.1)',
          delay: 0.7,
        }
      )
    })

    return () => ctx.revert()
  }, [])

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
    setHoveredNav(href)

    gsap.to(element, {
      y: -2,
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
    })

    const rect = element.getBoundingClientRect()
    const navRect = navRef.current?.getBoundingClientRect()

    if (hoverLineRef.current && navRect) {
      gsap.to(hoverLineRef.current, {
        width: rect.width + 8,
        x: rect.left - navRect.left - 4,
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out',
      })
    }
  }

  const handleNavLeave = (element: HTMLElement): void => {
    gsap.to(element, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleNavContainerLeave = (): void => {
    setHoveredNav(null)

    if (hoverLineRef.current) {
      gsap.to(hoverLineRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 backdrop-blur-md border-b border-border/50 shadow-sm"
      role="banner"
    >
      <div className="flex items-center h-16">
        <div ref={logoRef} className="border-r border-border/50 h-full flex items-center">
          <Logo className="size-full px-6 hover:text-primary transition-all duration-500 hover:bg-primary/10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-sm" />
        </div>

        <div className="relative border-r border-border/50 h-full">
          <button
            aria-expanded="false"
            aria-haspopup="true"
            aria-label={t('usecases')}
            className="flex items-center gap-2 px-6 h-full hover:bg-primary/10 hover:text-primary transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-primary/50 group"
            onMouseEnter={e => {
              gsap.to(e.currentTarget.querySelector('svg'), {
                rotation: 180,
                scale: 1.1,
                duration: 0.4,
                ease: 'back.out(1.2)',
              })
              gsap.to(e.currentTarget.querySelector('span'), {
                y: -2,
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out',
              })
            }}
            onMouseLeave={e => {
              gsap.to(e.currentTarget.querySelector('svg'), {
                rotation: 0,
                scale: 1,
                duration: 0.4,
                ease: 'power2.out',
              })
              gsap.to(e.currentTarget.querySelector('span'), {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
              })
            }}
          >
            <span className="text-sm font-medium uppercase tracking-wide">{t('usecases')}</span>
            <svg
              aria-hidden="true"
              className="w-4 h-4 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M19 9l-7 7-7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </button>
        </div>

        <nav
          ref={navRef}
          aria-label="Main navigation"
          className="flex-grow px-8 relative"
          role="navigation"
          onMouseLeave={handleNavContainerLeave}
        >
          <div
            ref={hoverLineRef}
            className="absolute bottom-3 h-1 bg-gradient-to-r from-primary to-primary/60 opacity-0 pointer-events-none rounded-full"
          />

          <ul className="flex items-center justify-center gap-8">
            {MAIN_HEADER_CONFIG.map(({ title, href }) => (
              <li key={href}>
                <Link
                  aria-label={`Navigate to ${t(title)}`}
                  className="text-sm font-medium hover:text-primary transition-all duration-500 uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-primary/50 px-3 py-2 rounded-lg relative block"
                  href={href}
                  onMouseEnter={e => handleNavHover(href, e.currentTarget)}
                  onMouseLeave={e => handleNavLeave(e.currentTarget)}
                >
                  {t(title)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div ref={actionsRef} className="flex items-center border-l border-border/50 h-full">
          <Button
            aria-label={`Change language from ${currentLocale}`}
            className="hover:text-primary uppercase hover:bg-primary/10 border-r border-border/50 rounded-none h-full px-6 transition-all duration-500 focus:ring-2 focus:ring-primary/50"
            variant="ghost"
            onClick={handleChangeLocale}
            onMouseEnter={e => {
              gsap.to(e.currentTarget, {
                scale: 1.05,
                y: -1,
                duration: 0.3,
                ease: 'power2.out',
              })
            }}
            onMouseLeave={e => {
              gsap.to(e.currentTarget, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
              })
            }}
          >
            {currentLocale}
          </Button>

          <Button
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="hover:text-primary hover:bg-primary/10 border-r border-border/50 rounded-none h-full px-6 transition-all duration-500 focus:ring-2 focus:ring-primary/50"
            variant="ghost"
            onClick={handleThemeToggle}
            onMouseEnter={e => {
              gsap.to(e.currentTarget.querySelector('svg'), {
                rotation: 180,
                scale: 1.1,
                duration: 0.4,
                ease: 'back.out(1.2)',
              })
              gsap.to(e.currentTarget, {
                scale: 1.05,
                y: -1,
                duration: 0.3,
                ease: 'power2.out',
              })
            }}
            onMouseLeave={e => {
              gsap.to(e.currentTarget.querySelector('svg'), {
                rotation: 0,
                scale: 1,
                duration: 0.4,
                ease: 'power2.out',
              })
              gsap.to(e.currentTarget, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
              })
            }}
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

          <Button
            aria-label="Visit Blog"
            className="px-6 shadow-none  hover:text-primary hover:bg-primary/10 h-full rounded-none font-medium text-sm uppercase tracking-wide transition-all duration-500 focus:ring-2 focus:ring-primary/50 group"
            variant="ghost"
            onMouseEnter={e => {
              gsap.to(e.currentTarget, {
                scale: 1.05,
                y: -1,
                duration: 0.3,
                ease: 'power2.out',
              })
            }}
            onMouseLeave={e => {
              gsap.to(e.currentTarget, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
              })
            }}
          >
            BLOG
          </Button>
        </div>
      </div>
    </header>
  )
}

Header.displayName = 'Header'
