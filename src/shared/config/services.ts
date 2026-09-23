export const SERVICE_IDS = ['web', 'mobile', 'telegram'] as const

export type ServiceId = (typeof SERVICE_IDS)[number]
