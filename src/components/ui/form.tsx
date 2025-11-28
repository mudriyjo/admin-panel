import * as React from 'react'
import { Label } from '@/components/ui/label'
import { Input, type InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import './form.css'

// Form wrapper component
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  error?: string
  children: React.ReactNode
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ error, children, className, ...props }, ref) => {
    return (
      <form ref={ref} className={cn('form', className)} {...props}>
        {error && (
          <div className="form-error-message">
            {error}
          </div>
        )}
        {children}
      </form>
    )
  }
)
Form.displayName = 'Form'

// Form field component
export interface FormFieldProps extends InputProps {
  label: string
  error?: string
  helperText?: string
  labelAction?: React.ReactNode
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, helperText, labelAction, className, id, ...props }, ref) => {
    const inputId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`

    return (
      <div className="form-field">
        <div className={cn('form-field-header', labelAction && 'form-field-row')}>
          <Label htmlFor={inputId}>{label}</Label>
          {labelAction}
        </div>
        <Input
          id={inputId}
          ref={ref}
          className={cn(error && 'input-error', className)}
          {...props}
        />
        {error && <p className="form-field-error">{error}</p>}
        {helperText && !error && <p className="form-field-helper">{helperText}</p>}
      </div>
    )
  }
)
FormField.displayName = 'FormField'

export { Form, FormField }
