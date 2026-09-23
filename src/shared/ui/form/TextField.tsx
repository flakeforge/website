'use client'

import { type FC, type ReactNode } from 'react'

import { Field } from '@base-ui/react/field'

import { cn } from '@lib/cn'

import {
  FIELD_CONTROL_CLASS,
  FIELD_DESCRIPTION_CLASS,
  FIELD_ERROR_CLASS,
  FIELD_LABEL_CLASS,
} from './field-styles'

type TextFieldProps = {
  name: string
  label: string
  description?: string
  type?: 'email' | 'text'
  autoComplete?: string
  required?: boolean
  maxLength?: number
  multiline?: boolean
  rows?: number
  errors?: {
    valueMissing?: string
    typeMismatch?: string
    tooLong?: string
  }
  className?: string
  children?: ReactNode
}

export const TextField: FC<TextFieldProps> = ({
  name,
  label,
  description,
  type = 'text',
  autoComplete,
  required,
  maxLength,
  multiline,
  rows = 5,
  errors,
  className,
}) => (
  <Field.Root className={cn('flex flex-col gap-2', className)} name={name}>
    <Field.Label className={FIELD_LABEL_CLASS}>{label}</Field.Label>
    {multiline ? (
      <Field.Control
        className={cn(FIELD_CONTROL_CLASS, 'resize-y')}
        maxLength={maxLength}
        render={<textarea rows={rows} />}
        required={required}
      />
    ) : (
      <Field.Control
        autoComplete={autoComplete}
        className={FIELD_CONTROL_CLASS}
        maxLength={maxLength}
        required={required}
        type={type}
      />
    )}
    {description ? (
      <Field.Description className={FIELD_DESCRIPTION_CLASS}>{description}</Field.Description>
    ) : null}
    {errors?.valueMissing ? (
      <Field.Error className={FIELD_ERROR_CLASS} match="valueMissing">
        {errors.valueMissing}
      </Field.Error>
    ) : null}
    {errors?.typeMismatch ? (
      <Field.Error className={FIELD_ERROR_CLASS} match="typeMismatch">
        {errors.typeMismatch}
      </Field.Error>
    ) : null}
    {errors?.tooLong ? (
      <Field.Error className={FIELD_ERROR_CLASS} match="tooLong">
        {errors.tooLong}
      </Field.Error>
    ) : null}
    <Field.Error className={FIELD_ERROR_CLASS} match="customError" />
  </Field.Root>
)

TextField.displayName = 'TextField'
