import { type FC } from 'react'

import { RssSimpleIcon } from '@phosphor-icons/react/ssr'
import { useLocale, useTranslations } from 'next-intl'

import { PostRow } from '@entities/post'
import { BlogLocaleFilter } from '@features/blog-locale-filter'
import { getPosts } from '@lib/content'
import { localizedPath } from '@lib/seo'
import { Container, textLinkClassName } from '@shared/ui'
import { PageHeader } from '@widgets/page-header'

export const Blog: FC = () => {
  const locale = useLocale()
  const t = useTranslations('Blog')
  const posts = getPosts(locale)
  const native = posts.filter(post => !post.isFallback).length

  return (
    <>
      <PageHeader intro={t('intro')} title={t('title')}>
        <a
          className={`${textLinkClassName} inline-flex items-center gap-2 self-start text-fg`}
          href={localizedPath(locale, '/blog/rss.xml')}
        >
          <RssSimpleIcon aria-hidden size={18} />
          {t('rss')}
        </a>
      </PageHeader>

      <Container aria-label={t('title')} as="section">
        <BlogLocaleFilter native={native} total={posts.length}>
          <div className="[&>*:first-child]:border-t-0">
            {posts.map(post => (
              <div key={post.slug} data-fallback={post.isFallback}>
                <PostRow headingLevel="h2" post={post} />
              </div>
            ))}
          </div>
        </BlogLocaleFilter>
      </Container>
    </>
  )
}

Blog.displayName = 'Blog'
