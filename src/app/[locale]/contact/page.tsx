import { type Metadata } from 'next'
import { type FC } from 'react'

import { getLocale, getTranslations } from 'next-intl/server'

import { createPageMetadata } from '@lib/seo'
import { Contact } from '@modules/contact'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale()
  const t = await getTranslations('Metadata.contact')
  return createPageMetadata({
    locale,
    path: '/contact',
    title: t('title'),
    description: t('description'),
  })
}

const ContactPage: FC = () => <Contact />

export default ContactPage
