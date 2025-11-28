import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth-store'
import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { LinkButton } from '@/components/ui/link-button'
import { AuthLayout } from '@/components/layouts/auth-layout'
import { otpSchema, type OTPFormData } from '@/lib/validation'
import { ROUTES } from '@/lib/constants'
import type { ApiError } from '@/types/api'
import './otp.css'

export default function OTPPage() {
  const navigate = useNavigate()
  const verifyOTP = useAuthStore((state) => state.verifyOTP)

  const [formData, setFormData] = useState<OTPFormData>({
    otp: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof OTPFormData, string>>>({})
  const [apiError, setApiError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    // Only allow numbers and limit to 8 characters
    const sanitizedValue = value.replace(/\D/g, '').slice(0, 8)
    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }))

    // Clear field error when user types
    if (errors[name as keyof OTPFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
    // Clear API error when user types
    if (apiError) {
      setApiError('')
    }
  }

  const validate = (): boolean => {
    try {
      otpSchema.parse(formData)
      setErrors({})
      return true
    } catch (error: any) {
      const fieldErrors: Partial<Record<keyof OTPFormData, string>> = {}
      error.errors?.forEach((err: any) => {
        const field = err.path[0] as keyof OTPFormData
        fieldErrors[field] = err.message
      })
      setErrors(fieldErrors)
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApiError('')

    if (!validate()) {
      return
    }

    setIsLoading(true)
    try {
      await verifyOTP(formData.otp)
      // Navigate to dashboard on success
      navigate(ROUTES.DASHBOARD)
    } catch (error) {
      const apiErr = error as ApiError
      setApiError(apiErr.message || 'OTP is not correct')
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = formData.otp.length === 8 && Object.keys(errors).length === 0

  return (
    <AuthLayout
      title="Verify your account"
      description="Enter the 8-digit verification code we sent to your email"
      brandName="Acme Inc."
    >
      <Form onSubmit={handleSubmit} error={apiError}>
        <FormField
          label="Verification Code"
          name="otp"
          type="text"
          placeholder="12345678"
          value={formData.otp}
          onChange={handleChange}
          disabled={isLoading}
          maxLength={8}
          className="otp-input-field"
          autoComplete="off"
          error={errors.otp}
        />

        <Button type="submit" className="btn-full" isLoading={isLoading} loadingText="Verifying..." disabled={!isFormValid}>
          Verify
        </Button>

        <div className="resend-text">
          Didn't receive the code?{' '}
          <LinkButton type="button" variant="primary" disabled={isLoading}>
            Resend
          </LinkButton>
        </div>

        <div className="resend-text">
          <LinkButton
            type="button"
            variant="muted"
            onClick={() => navigate(ROUTES.LOGIN)}
            disabled={isLoading}
          >
            ← Back to login
          </LinkButton>
        </div>
      </Form>
    </AuthLayout>
  )
}
