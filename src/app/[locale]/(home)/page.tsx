import { type Metadata } from 'next'
import { type FC } from 'react'

import { getLocale, getTranslations } from 'next-intl/server'

import { createPageMetadata } from '@lib/seo'
import { Home } from '@modules/home'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale()
  const t = await getTranslations('Metadata.home')
  return {
    ...createPageMetadata({ locale, path: '/', title: t('title'), description: t('description') }),
    title: { absolute: t('title') },
  }
}

const HomePage: FC = () => <Home />

export default HomePage
