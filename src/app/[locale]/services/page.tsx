import { type Metadata } from 'next'
import { type FC } from 'react'

import { getLocale, getTranslations } from 'next-intl/server'

import { createPageMetadata } from '@lib/seo'
import { Services } from '@modules/services'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale()
  const t = await getTranslations('Metadata.services')
  return createPageMetadata({
    locale,
    path: '/services',
    title: t('title'),
    description: t('description'),
  })
}

const ServicesPage: FC = () => <Services />

export default ServicesPage
