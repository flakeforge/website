import { z } from 'zod'

import { SERVICE_IDS } from '@config/services'

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD')
  .transform(value => new Date(`${value}T00:00:00Z`))

export const postFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: isoDate,
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
})

export const projectFrontmatterSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  year: z.number().int(),
  order: z.number().int(),
  kind: z.enum(['open-source', 'client']),
  status: z.enum(['live', 'in-progress', 'early']),
  services: z.array(z.enum(SERVICE_IDS)).min(1),
  stack: z.array(z.string()).default([]),
  cover: z.string().optional(),
  license: z.string().optional(),
  repository: z.url().optional(),
  website: z.url().optional(),
})

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>
