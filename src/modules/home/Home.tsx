import { type FC } from 'react'

import { useLocale, useTranslations } from 'next-intl'

import { getPosts, getProjects } from '@lib/content'
import { ClosingCta } from '@widgets/closing-cta'
import { Process } from '@widgets/process'

import { Hero } from './sections/Hero'
import { LatestPosts } from './sections/LatestPosts'
import { OpenSource } from './sections/OpenSource'
import { ServicesStack } from './sections/ServicesStack'
import { WorkPan } from './sections/WorkPan'

export const Home: FC = () => {
  const locale = useLocale()
  const t = useTranslations('Home')

  return (
    <>
      <Hero />
      <ServicesStack />
      <WorkPan projects={getProjects(locale)} />
      <OpenSource />
      <Process title={t('process.title')} />
      <LatestPosts posts={getPosts(locale).slice(0, 3)} />
      <ClosingCta />
    </>
  )
}

Home.displayName = 'Home'
