'use client'

import { type FC, useActionState } from 'react'

import { Form } from '@base-ui/react/form'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { useLocale, useTranslations } from 'next-intl'

import { SERVICE_IDS } from '@config/services'
import { SITE } from '@config/site'
import { Button } from '@shared/ui'
import { Checkbox, FIELD_LABEL_CLASS, TextField } from '@shared/ui/form'

import { submitBrief } from '../api/submit-brief'
import { BRIEF_FIELDS, BRIEF_LIMITS, type BriefField, INITIAL_BRIEF_STATE } from '../model/brief'
import { BriefSuccess } from './BriefSuccess'

type BriefFormProps = {
  onReset: () => void
}

export const BriefForm: FC<BriefFormProps> = ({ onReset }) => {
  const t = useTranslations('Contact')
  const tServices = useTranslations('Services')
  const locale = useLocale()
  const [state, formAction, pending] = useActionState(submitBrief, INITIAL_BRIEF_STATE)

  if (state.status === 'success') return <BriefSuccess onReset={onReset} />

  const fieldErrors: Partial<Record<BriefField, string>> = {}
  if (state.status === 'invalid') {
    for (const field of BRIEF_FIELDS) {
      const code = state.fields[field]
      if (code) fieldErrors[field] = t(`errors.${code}`)
    }
  }

  const fieldMessages = {
    valueMissing: t('errors.required'),
    typeMismatch: t('errors.email'),
    tooLong: t('errors.tooLong'),
  }

  return (
    <Form action={formAction} className="flex flex-col gap-10" errors={fieldErrors}>
      <input name="locale" type="hidden" value={locale} />

      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          {t('form.honeypot')}
          <input autoComplete="off" name="website" tabIndex={-1} type="text" />
        </label>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <TextField
          required
          autoComplete="name"
          errors={fieldMessages}
          label={t('form.name')}
          maxLength={BRIEF_LIMITS.name}
          name="name"
        />
        <TextField
          required
          autoComplete="email"
          errors={fieldMessages}
          label={t('form.email')}
          maxLength={BRIEF_LIMITS.email}
          name="email"
          type="email"
        />
      </div>

      <TextField
        description={t('form.telegramHint')}
        errors={fieldMessages}
        label={t('form.telegram')}
        maxLength={BRIEF_LIMITS.telegram}
        name="telegram"
      />

      <fieldset className="flex flex-col gap-4">
        <legend className={`${FIELD_LABEL_CLASS} mb-4`}>{t('form.services')}</legend>
        <div className="flex flex-wrap gap-3">
          {SERVICE_IDS.map(id => (
            <label
              key={id}
              className="flex cursor-pointer items-center gap-3 border border-line px-4 py-3 text-fg-muted transition-colors duration-300 select-none hover:border-line-strong hover:text-fg has-[[data-checked]]:border-accent has-[[data-checked]]:text-fg"
            >
              <Checkbox name="services" value={id} />
              {tServices(`${id}.title`)}
            </label>
          ))}
        </div>
      </fieldset>

      <TextField
        multiline
        required
        description={t('form.messageHint')}
        errors={fieldMessages}
        label={t('form.message')}
        maxLength={BRIEF_LIMITS.message}
        name="message"
      />

      {state.status === 'error' ? (
        <p className="border-l-2 border-danger pl-4 text-fg" role="alert">
          {t(`errors.${state.reason}`, { email: SITE.email })}
        </p>
      ) : null}

      <div>
        <Button disabled={pending} icon={<ArrowRightIcon size={18} />} size="lg" type="submit">
          {pending ? t('form.sending') : t('form.submit')}
        </Button>
      </div>
    </Form>
  )
}

BriefForm.displayName = 'BriefForm'
