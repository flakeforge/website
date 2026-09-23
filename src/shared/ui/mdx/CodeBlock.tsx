'use client'

import { type ComponentProps, type FC, useRef, useState } from 'react'

import { CheckIcon, CopyIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'

import { cn } from '@lib/cn'

export const CodeBlock: FC<ComponentProps<'pre'>> = ({ className, children, ...props }) => {
  const t = useTranslations('Common')
  const ref = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  const copy = async (): Promise<void> => {
    const text = ref.current?.innerText
    if (!text) return
    await navigator.clipboard.writeText(text)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="group/code relative">
      <pre
        ref={ref}
        data-lenis-prevent
        className={cn(
          'overflow-x-auto border border-line bg-surface-sunken py-5 text-sm leading-relaxed',
          className
        )}
        {...props}
      >
        {children}
      </pre>
      <button
        aria-label={copied ? t('copied') : t('copyCode')}
        className="absolute top-3 right-3 inline-flex size-9 items-center justify-center border border-line bg-surface-raised text-fg-muted opacity-0 transition-[opacity,color] duration-300 group-hover/code:opacity-100 hover:text-fg focus-visible:opacity-100"
        type="button"
        onClick={() => void copy()}
      >
        {copied ? (
          <CheckIcon aria-hidden className="text-accent" size={16} />
        ) : (
          <CopyIcon aria-hidden size={16} />
        )}
      </button>
    </div>
  )
}

CodeBlock.displayName = 'CodeBlock'
