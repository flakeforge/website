import { type MDXComponents } from 'mdx/types'

import { mdxComponents } from '@shared/ui/mdx'

export const useMDXComponents = (components: MDXComponents): MDXComponents => ({
  ...mdxComponents,
  ...components,
})
