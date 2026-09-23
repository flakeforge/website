import { type FC } from 'react'

import { type Icon } from '@phosphor-icons/react'
import {
  ArrowRightIcon,
  BrowserIcon,
  DeviceMobileIcon,
  TelegramLogoIcon,
} from '@phosphor-icons/react/ssr'
import { useTranslations } from 'next-intl'

import { SERVICE_IDS, type ServiceId } from '@config/services'
import { toStringList } from '@lib/messages'
import { Container, TextLink } from '@shared/ui'
import { SectionHeading } from '@widgets/section-heading'

import { ServicesStackScene } from './ServicesStackScene'

const ICONS: Record<ServiceId, Icon> = {
  web: BrowserIcon,
  mobile: DeviceMobileIcon,
  telegram: TelegramLogoIcon,
}

export const ServicesStack: FC = () => {
  const t = useTranslations()

  return (
    <section aria-labelledby="services-title" className="py-32 lg:py-48">
      <Container>
        <SectionHeading
          id="services-title"
          title={t('Home.services.title')}
          action={
            <TextLink className="inline-flex items-center gap-2 text-fg" href="/services">
              {t('Home.services.cta')}
              <ArrowRightIcon aria-hidden size={16} />
            </TextLink>
          }
        />

        <div className="mt-16 lg:mt-24">
          <ServicesStackScene>
            {SERVICE_IDS.map((id, index) => {
              const ServiceIcon = ICONS[id]
              const points = toStringList(t.raw(`Services.${id}.points`))
              return (
                <article
                  key={id}
                  data-stack-card
                  className="md:sticky md:top-[calc(6rem_+_var(--index)*1.75rem)] md:pb-10"
                  style={{ '--index': index }}
                >
                  <div
                    data-stack-inner
                    className="relative grid origin-top overflow-clip border border-line bg-surface-raised p-6 sm:p-10 md:min-h-[32rem] md:grid-cols-12 md:gap-10 lg:p-14"
                  >
                    <ServiceIcon
                      aria-hidden
                      className="pointer-events-none absolute -right-10 -bottom-12 size-72 text-line md:size-[26rem]"
                      weight="thin"
                    />
                    <div className="relative flex flex-col md:col-span-7">
                      <ServiceIcon aria-hidden className="size-10 text-accent" weight="light" />
                      <h3 className="mt-auto pt-16 text-display">{t(`Services.${id}.title`)}</h3>
                      <p className="mt-6 max-w-lg text-lede text-fg-muted">
                        {t(`Services.${id}.summary`)}
                      </p>
                    </div>
                    <ul className="relative mt-10 flex flex-col self-end border-t border-line md:col-span-5 md:mt-0">
                      {points.map(point => (
                        <li key={point} className="border-b border-line py-4 text-fg">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              )
            })}
          </ServicesStackScene>
        </div>
      </Container>
    </section>
  )
}

ServicesStack.displayName = 'ServicesStack'
