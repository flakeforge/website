import { type FC } from 'react'

import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr'
import { useTranslations } from 'next-intl'

import { SITE } from '@config/site'
import { ExternalLink } from '@shared/ui'

export const ContactDetails: FC = () => {
  const t = useTranslations()

  return (
    <div>
      <p className="text-sm text-fg-subtle">{t('Contact.direct')}</p>
      <dl className="mt-5 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <dt className="text-sm text-fg-subtle">{t('Contact.email')}</dt>
          <dd>
            <a
              className="text-xl text-fg transition-colors duration-300 hover:text-accent"
              href={`mailto:${SITE.email}`}
            >
              {SITE.email}
            </a>
          </dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-sm text-fg-subtle">{t('Contact.telegram')}</dt>
          <dd>
            <ExternalLink
              className="inline-flex items-center gap-1.5 text-xl text-fg"
              href={SITE.telegram}
            >
              {SITE.telegramHandle}
              <ArrowUpRightIcon aria-hidden size={16} />
              <span className="sr-only">{t('Common.newTab')}</span>
            </ExternalLink>
          </dd>
        </div>
      </dl>
    </div>
  )
}

ContactDetails.displayName = 'ContactDetails'
