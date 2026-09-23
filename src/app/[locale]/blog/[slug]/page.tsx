import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { type ReactElement } from 'react'

import { getLocale } from 'next-intl/server'

import { getPost, getPosts, getPostSlugs, loadPostBody } from '@lib/content'
import { createPageMetadata } from '@lib/seo'
import { BlogPost } from '@modules/blog-post'

export const generateStaticParams = (): { slug: string }[] => getPostSlugs().map(slug => ({ slug }))

export const dynamicParams = false

export const generateMetadata = async ({
  params,
}: PageProps<'/[locale]/blog/[slug]'>): Promise<Metadata> => {
  const { slug } = await params
  const locale = await getLocale()
  const post = getPost(slug, locale)
  if (!post) return {}
  return createPageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    type: 'article',
    publishedTime: post.frontmatter.date,
    generatedImage: true,
  })
}

const BlogPostPage = async ({
  params,
}: PageProps<'/[locale]/blog/[slug]'>): Promise<ReactElement> => {
  const { slug } = await params
  const locale = await getLocale()
  const post = getPost(slug, locale)
  if (!post) notFound()

  const Body = await loadPostBody(slug, post.sourceLocale)
  const morePosts = getPosts(locale)
    .filter(item => item.slug !== slug)
    .slice(0, 2)

  return <BlogPost Body={Body} morePosts={morePosts} post={post} />
}

export default BlogPostPage
