import { type FC } from 'react'

import { useTranslations } from 'next-intl'

import { ContactForm } from '@features/contact-form'
import { Container } from '@shared/ui'
import { FadeUp, SplitReveal } from '@shared/ui/motion'

import { ContactDetails } from './ContactDetails'

export const Contact: FC = () => {
  const t = useTranslations('Contact')

  return (
    <section aria-labelledby="contact-title" className="pt-36 lg:pt-48">
      <Container className="grid gap-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SplitReveal as="h1" className="text-display-xl" id="contact-title" trigger="mount">
              {t('title')}
            </SplitReveal>
            <FadeUp className="mt-10 flex flex-col gap-12" delay={0.3} trigger="mount">
              <p className="max-w-md text-lede text-fg-muted">{t('intro')}</p>
              <ContactDetails />
            </FadeUp>
          </div>
        </div>

        <FadeUp className="lg:col-span-6 lg:col-start-7" delay={0.45} trigger="mount">
          <ContactForm />
        </FadeUp>
      </Container>
    </section>
  )
}

Contact.displayName = 'Contact'
