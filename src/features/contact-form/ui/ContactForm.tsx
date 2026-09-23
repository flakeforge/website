'use client'

import { type FC, useState } from 'react'

import { BriefForm } from './BriefForm'

export const ContactForm: FC = () => {
  const [attempt, setAttempt] = useState(0)

  return <BriefForm key={attempt} onReset={() => setAttempt(value => value + 1)} />
}

ContactForm.displayName = 'ContactForm'
