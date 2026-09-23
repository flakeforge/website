import { type FC } from 'react'

import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr'

import { type Post } from '@lib/content'
import { Link } from '@lib/i18n'

import { PostMeta } from './PostMeta'

type PostRowProps = {
  post: Post
  headingLevel?: 'h2' | 'h3'
}

export const PostRow: FC<PostRowProps> = ({ post, headingLevel: Heading = 'h3' }) => (
  <article className="group relative border-t border-line">
    <Link
      className="grid gap-4 py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10"
      href={`/blog/${post.slug}`}
      lang={post.sourceLocale}
    >
      <PostMeta
        className="md:col-span-3"
        date={post.frontmatter.date}
        isFallback={post.isFallback}
        readingMinutes={post.readingMinutes}
      />
      <div className="md:col-span-8">
        <Heading className="text-2xl leading-tight font-semibold tracking-tight text-fg transition-colors duration-300 group-hover:text-accent md:text-3xl">
          {post.frontmatter.title}
        </Heading>
        <p className="mt-3 max-w-2xl text-fg-muted">{post.frontmatter.description}</p>
      </div>
      <ArrowUpRightIcon
        aria-hidden
        className="hidden size-6 justify-self-end text-fg-subtle transition-[transform,color] duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent md:col-span-1 md:block"
      />
    </Link>
  </article>
)

PostRow.displayName = 'PostRow'
