import { type FC } from 'react'

import { type Icon } from '@phosphor-icons/react'
import { BrowserIcon, DeviceMobileIcon, TelegramLogoIcon } from '@phosphor-icons/react/ssr'
import { useTranslations } from 'next-intl'

import { SERVICE_IDS, type ServiceId } from '@config/services'
import { toStringList } from '@lib/messages'
import { Container } from '@shared/ui'
import { FadeUp } from '@shared/ui/motion'
import { ClosingCta } from '@widgets/closing-cta'
import { PageHeader } from '@widgets/page-header'
import { Process } from '@widgets/process'

const ICONS: Record<ServiceId, Icon> = {
  web: BrowserIcon,
  mobile: DeviceMobileIcon,
  telegram: TelegramLogoIcon,
}

export const Services: FC = () => {
  const t = useTranslations()

  return (
    <>
      <PageHeader intro={t('ServicesPage.intro')} title={t('ServicesPage.title')} />

      <Container aria-label={t('Metadata.services.title')} as="section" className="flex flex-col">
        {SERVICE_IDS.map(id => {
          const ServiceIcon = ICONS[id]
          const points = toStringList(t.raw(`Services.${id}.points`))
          return (
            <FadeUp
              key={id}
              as="article"
              className="grid gap-10 border-t border-line py-16 lg:grid-cols-12 lg:gap-8 lg:py-24"
              id={id}
            >
              <div className="flex flex-col gap-8 lg:col-span-6">
                <ServiceIcon aria-hidden className="size-12 text-accent" weight="light" />
                <h2 className="text-display">{t(`Services.${id}.title`)}</h2>
              </div>
              <div className="flex flex-col gap-10 lg:col-span-5 lg:col-start-8 lg:pt-20">
                <p className="text-lede text-fg-muted">{t(`Services.${id}.summary`)}</p>
                <div>
                  <h3 className="text-sm text-fg-subtle">{t('ServicesPage.includes')}</h3>
                  <ul className="mt-4 flex flex-col">
                    {points.map(point => (
                      <li key={point} className="flex gap-4 border-b border-line py-4 text-fg">
                        <span aria-hidden className="mt-[0.6em] h-px w-4 shrink-0 bg-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeUp>
          )
        })}
      </Container>

      <Process title={t('ServicesPage.processTitle')} />
      <ClosingCta />
    </>
  )
}

Services.displayName = 'Services'
