import { z } from 'zod'

import { SERVICE_IDS } from '@config/services'
import { LOCALES } from '@lib/i18n/config'

export const BRIEF_LIMITS = {
  name: 120,
  email: 200,
  telegram: 64,
  message: 4000,
} as const

export const briefSchema = z.object({
  name: z.string().trim().min(1).max(BRIEF_LIMITS.name),
  email: z.email().max(BRIEF_LIMITS.email),
  telegram: z.string().trim().max(BRIEF_LIMITS.telegram).optional(),
  services: z.array(z.enum(SERVICE_IDS)),
  message: z.string().trim().min(1).max(BRIEF_LIMITS.message),
  locale: z.enum(LOCALES),
})

export type Brief = z.infer<typeof briefSchema>

export const BRIEF_FIELDS = ['name', 'email', 'telegram', 'services', 'message'] as const

export type BriefField = (typeof BRIEF_FIELDS)[number]

export const isBriefField = (value: unknown): value is BriefField =>
  typeof value === 'string' && (BRIEF_FIELDS as readonly string[]).includes(value)

export type BriefFieldError = 'email' | 'required' | 'tooLong'

type BriefErrorReason = 'failed' | 'rateLimited' | 'unavailable'

export type BriefState =
  | { status: 'error'; reason: BriefErrorReason }
  | { status: 'idle' }
  | { status: 'invalid'; fields: Partial<Record<BriefField, BriefFieldError>> }
  | { status: 'success' }

export const INITIAL_BRIEF_STATE: BriefState = { status: 'idle' }
