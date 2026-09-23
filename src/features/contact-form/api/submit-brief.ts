'use server'

import { headers } from 'next/headers'

import { type z } from 'zod'

import { hitRateLimit } from '@lib/rate-limit'
import { escapeTelegramHtml, isTelegramConfigured, sendTelegramMessage } from '@lib/telegram'

import {
  type Brief,
  type BriefField,
  type BriefFieldError,
  briefSchema,
  type BriefState,
  isBriefField,
} from '../model/brief'

const HONEYPOT_FIELD = 'website'

const RATE_LIMIT = { hits: 5, windowMs: 10 * 60 * 1000 }

const toFieldError = (issue: z.core.$ZodIssue): BriefFieldError => {
  if (issue.code === 'too_big') return 'tooLong'
  if (issue.code === 'invalid_format') return 'email'
  return 'required'
}

const collectFieldErrors = (
  issues: z.core.$ZodIssue[]
): Partial<Record<BriefField, BriefFieldError>> => {
  const fields: Partial<Record<BriefField, BriefFieldError>> = {}
  for (const issue of issues) {
    const field = issue.path[0]
    if (isBriefField(field) && !(field in fields)) {
      fields[field] = toFieldError(issue)
    }
  }
  return fields
}

const formatBrief = (brief: Brief): string => {
  const lines = [
    '<b>New brief from the website</b>',
    '',
    `<b>Name:</b> ${escapeTelegramHtml(brief.name)}`,
    `<b>Email:</b> ${escapeTelegramHtml(brief.email)}`,
  ]
  if (brief.telegram) lines.push(`<b>Telegram:</b> ${escapeTelegramHtml(brief.telegram)}`)
  if (brief.services.length > 0) lines.push(`<b>Services:</b> ${brief.services.join(', ')}`)
  lines.push(`<b>Language:</b> ${brief.locale}`, '', escapeTelegramHtml(brief.message))
  return lines.join('\n')
}

const readText = (formData: FormData, key: string): string => {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

const readClientIp = async (): Promise<string> => {
  const requestHeaders = await headers()
  const forwarded = requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwarded || requestHeaders.get('x-real-ip') || 'unknown'
}

export const submitBrief = async (
  _previous: BriefState,
  formData: FormData
): Promise<BriefState> => {
  if (formData.get(HONEYPOT_FIELD)) return { status: 'success' }

  const telegram = readText(formData, 'telegram')
  const parsed = briefSchema.safeParse({
    name: readText(formData, 'name'),
    email: readText(formData, 'email'),
    telegram: telegram || undefined,
    services: formData.getAll('services'),
    message: readText(formData, 'message'),
    locale: readText(formData, 'locale'),
  })

  if (!parsed.success) {
    return { status: 'invalid', fields: collectFieldErrors(parsed.error.issues) }
  }

  if (!hitRateLimit(`brief:${await readClientIp()}`, RATE_LIMIT.hits, RATE_LIMIT.windowMs)) {
    return { status: 'error', reason: 'rateLimited' }
  }

  if (!isTelegramConfigured()) return { status: 'error', reason: 'unavailable' }

  const delivered = await sendTelegramMessage(formatBrief(parsed.data))
  return delivered ? { status: 'success' } : { status: 'error', reason: 'failed' }
}
