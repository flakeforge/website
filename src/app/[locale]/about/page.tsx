import { type Metadata } from 'next'
import { type FC } from 'react'

import { getLocale, getTranslations } from 'next-intl/server'

import { createPageMetadata } from '@lib/seo'
import { About } from '@modules/about'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale()
  const t = await getTranslations('Metadata.about')
  return createPageMetadata({
    locale,
    path: '/about',
    title: t('title'),
    description: t('description'),
  })
}

const AboutPage: FC = () => <About />

export default AboutPage
