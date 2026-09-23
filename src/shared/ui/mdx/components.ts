import { type MDXComponents } from 'mdx/types'

import { CodeBlock } from './CodeBlock'
import { MdxAnchor } from './MdxAnchor'
import { MdxTable } from './MdxTable'
import { styled } from './styled'

export const mdxComponents: MDXComponents = {
  h2: styled(
    'h2',
    'mt-16 mb-6 scroll-mt-28 text-3xl leading-tight font-semibold tracking-tight md:text-4xl'
  ),
  h3: styled('h3', 'mt-12 mb-4 scroll-mt-28 text-2xl leading-snug font-semibold tracking-tight'),
  p: styled('p', 'my-6 text-lg leading-relaxed text-fg-muted'),
  a: MdxAnchor,
  ul: styled('ul', 'my-6 flex list-none flex-col gap-3 text-lg text-fg-muted'),
  ol: styled(
    'ol',
    'my-6 flex list-decimal flex-col gap-3 pl-6 text-lg text-fg-muted marker:text-fg-subtle'
  ),
  li: styled(
    'li',
    'relative leading-relaxed [ul>&]:pl-6 [ul>&]:before:absolute [ul>&]:before:top-[0.7em] [ul>&]:before:left-0 [ul>&]:before:h-px [ul>&]:before:w-3 [ul>&]:before:bg-accent'
  ),
  blockquote: styled(
    'blockquote',
    'my-10 border-l-2 border-accent pl-6 text-xl text-fg [&>p]:text-fg'
  ),
  strong: styled('strong', 'font-semibold text-fg'),
  hr: styled('hr', 'my-16 border-line'),
  code: styled(
    'code',
    'font-mono text-[0.9em] [:not(pre)>&]:border [:not(pre)>&]:border-line [:not(pre)>&]:bg-surface-raised [:not(pre)>&]:px-1.5 [:not(pre)>&]:py-0.5 [:not(pre)>&]:text-fg'
  ),
  pre: CodeBlock,
  figure: styled('figure', 'my-8'),
  table: MdxTable,
  th: styled('th', 'border-b border-line-strong py-3 pr-6 font-medium text-fg'),
  td: styled('td', 'border-b border-line py-3 pr-6 text-fg-muted'),
}
