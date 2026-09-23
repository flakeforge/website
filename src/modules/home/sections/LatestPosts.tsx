import { type FC } from 'react'

import { ArrowRightIcon } from '@phosphor-icons/react/ssr'
import { useTranslations } from 'next-intl'

import { PostRow } from '@entities/post'
import { type Post } from '@lib/content'
import { Container, TextLink } from '@shared/ui'
import { FadeUp } from '@shared/ui/motion'
import { SectionHeading } from '@widgets/section-heading'

type LatestPostsProps = {
  posts: Post[]
}

export const LatestPosts: FC<LatestPostsProps> = ({ posts }) => {
  const t = useTranslations('Home.writing')

  if (posts.length === 0) return null

  return (
    <section aria-labelledby="writing-title" className="py-32 lg:py-48">
      <Container>
        <SectionHeading
          id="writing-title"
          title={t('title')}
          action={
            <TextLink className="inline-flex items-center gap-2 text-fg" href="/blog">
              {t('cta')}
              <ArrowRightIcon aria-hidden size={16} />
            </TextLink>
          }
        />
        <FadeUp stagger className="mt-16 border-b border-line lg:mt-24">
          {posts.map(post => (
            <PostRow key={post.slug} post={post} />
          ))}
        </FadeUp>
      </Container>
    </section>
  )
}

LatestPosts.displayName = 'LatestPosts'
