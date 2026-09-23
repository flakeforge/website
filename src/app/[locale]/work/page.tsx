import { type Metadata } from 'next'
import { type FC } from 'react'

import { getLocale, getTranslations } from 'next-intl/server'

import { createPageMetadata } from '@lib/seo'
import { Work } from '@modules/work'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale()
  const t = await getTranslations('Metadata.work')
  return createPageMetadata({
    locale,
    path: '/work',
    title: t('title'),
    description: t('description'),
  })
}

const WorkPage: FC = () => <Work />

export default WorkPage
