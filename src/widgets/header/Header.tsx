import { type FC } from 'react'

import { useTranslations } from 'next-intl'

import { CONTACT_HREF } from '@config/navigation'
import { LocaleSwitcher } from '@features/locale-switcher'
import { ThemeSwitcher } from '@features/theme-switcher'
import { Link } from '@lib/i18n'
import { BrandLockup, ButtonLink, Container } from '@shared/ui'

import { HeaderShell } from './HeaderShell'
import { MobileMenu } from './MobileMenu'
import { NavLinks } from './NavLinks'

export const Header: FC = () => {
  const t = useTranslations('Common')

  return (
    <HeaderShell>
      <Container className="flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Link aria-label={t('homeLabel')} className="-my-2 py-2 text-fg" href="/">
          <BrandLockup className="h-9 w-[181px]" />
        </Link>

        <nav aria-label={t('mainNavigation')} className="hidden lg:block">
          <NavLinks />
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center">
            <ThemeSwitcher />
            <LocaleSwitcher />
          </div>
          <ButtonLink href={CONTACT_HREF}>{t('startProject')}</ButtonLink>
        </div>

        <div className="lg:hidden">
          <MobileMenu />
        </div>
      </Container>
    </HeaderShell>
  )
}

Header.displayName = 'Header'
