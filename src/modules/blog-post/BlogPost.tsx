import { type FC } from 'react'

import { ArrowLeftIcon } from '@phosphor-icons/react/ssr'
import { type MDXContent } from 'mdx/types'
import { useTranslations } from 'next-intl'

import { PostMeta, PostRow } from '@entities/post'
import { type Post } from '@lib/content'
import { Container, TextLink } from '@shared/ui'
import { FadeUp, SplitReveal } from '@shared/ui/motion'
import { FallbackNotice } from '@widgets/fallback-notice'

type BlogPostProps = {
  post: Post
  morePosts: Post[]
  Body: MDXContent
}

export const BlogPost: FC<BlogPostProps> = ({ post, morePosts, Body }) => {
  const t = useTranslations('Blog')
  const { frontmatter } = post

  return (
    <>
      <article>
        <header className="pt-36 lg:pt-48">
          <Container className="grid lg:grid-cols-12">
            <div className="lg:col-span-9 lg:col-start-2">
              <FadeUp trigger="mount">
                <TextLink
                  className="inline-flex items-center gap-2 text-fg-muted hover:text-fg"
                  href="/blog"
                >
                  <ArrowLeftIcon aria-hidden size={16} />
                  {t('back')}
                </TextLink>
                <PostMeta
                  className="mt-12"
                  date={frontmatter.date}
                  isFallback={post.isFallback}
                  readingMinutes={post.readingMinutes}
                />
              </FadeUp>
              <SplitReveal as="h1" className="mt-6 text-display" trigger="mount">
                <span lang={post.sourceLocale}>{frontmatter.title}</span>
              </SplitReveal>
              <FadeUp className="mt-8" delay={0.3} trigger="mount">
                <p className="max-w-3xl text-lede text-fg-muted" lang={post.sourceLocale}>
                  {frontmatter.description}
                </p>
                {frontmatter.tags.length > 0 ? (
                  <ul aria-label={t('tags')} className="mt-8 flex flex-wrap gap-2">
                    {frontmatter.tags.map(tag => (
                      <li
                        key={tag}
                        className="border border-line px-3 py-1 font-mono text-xs text-fg-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </FadeUp>
            </div>
          </Container>
        </header>

        <Container className="mt-16 grid border-t border-line pt-8 lg:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-7 lg:col-start-4">
            {post.isFallback ? <FallbackNotice message={t('fallbackNotice')} /> : null}
            <div lang={post.sourceLocale}>
              <Body />
            </div>
          </div>
        </Container>
      </article>

      {morePosts.length > 0 ? (
        <section aria-labelledby="more-posts-title" className="mt-32 lg:mt-48">
          <Container>
            <h2 className="text-title" id="more-posts-title">
              {t('morePosts')}
            </h2>
            <div className="mt-10 border-b border-line">
              {morePosts.map(item => (
                <PostRow key={item.slug} post={item} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  )
}

BlogPost.displayName = 'BlogPost'
