import { type FC } from 'react'

import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr'
import { useTranslations } from 'next-intl'

import { CONTACT_HREF, NAV_ITEMS } from '@config/navigation'
import { OPEN_SOURCE_REPOS, SITE } from '@config/site'
import { Container, ExternalLink, TextLink } from '@shared/ui'

import { FooterColumn } from './FooterColumn'
import { FooterWordmark } from './FooterWordmark'

export const Footer: FC = () => {
  const t = useTranslations()
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-32 border-t border-line pt-16 lg:mt-48 lg:pt-24">
      <Container>
        <div className="grid gap-12 md:grid-cols-12">
          <p className="max-w-sm text-title md:col-span-5">{t('Footer.tagline')}</p>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
            <FooterColumn title={t('Footer.pages')}>
              {[...NAV_ITEMS, { id: 'contact' as const, href: CONTACT_HREF }].map(item => (
                <li key={item.id}>
                  <TextLink href={item.href}>{t(`Nav.${item.id}`)}</TextLink>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title={t('Footer.openSource')}>
              {OPEN_SOURCE_REPOS.slice(0, 4).map(repo => (
                <li key={repo.name}>
                  <ExternalLink className="font-mono text-sm" href={repo.href}>
                    {repo.name}
                    <span className="sr-only"> {t('Common.newTab')}</span>
                  </ExternalLink>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title={t('Footer.contact')}>
              <li>
                <a className="break-all" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
              </li>
              <li>
                <ExternalLink className="inline-flex items-center gap-1.5" href={SITE.telegram}>
                  Telegram
                  <ArrowUpRightIcon aria-hidden size={14} />
                  <span className="sr-only">{t('Common.newTab')}</span>
                </ExternalLink>
              </li>
              <li>
                <ExternalLink className="inline-flex items-center gap-1.5" href={SITE.github}>
                  GitHub
                  <ArrowUpRightIcon aria-hidden size={14} />
                  <span className="sr-only">{t('Common.newTab')}</span>
                </ExternalLink>
              </li>
            </FooterColumn>
          </div>
        </div>

        <div className="mt-20 lg:mt-32">
          <FooterWordmark />
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-line py-6 text-sm text-fg-subtle">
          <p>{t('Footer.rights', { year })}</p>
          <a className="transition-colors duration-300 hover:text-fg" href="#top">
            {t('Common.backToTop')}
          </a>
        </div>
      </Container>
    </footer>
  )
}

Footer.displayName = 'Footer'
