import { type Metadata } from 'next'
import { type FC } from 'react'

import { getLocale, getTranslations } from 'next-intl/server'

import { createPageMetadata } from '@lib/seo'
import { Blog } from '@modules/blog'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale()
  const t = await getTranslations('Metadata.blog')
  return createPageMetadata({
    locale,
    path: '/blog',
    title: t('title'),
    description: t('description'),
  })
}

const BlogPage: FC = () => <Blog />

export default BlogPage
