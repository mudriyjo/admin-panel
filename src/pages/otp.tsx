import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { otpSchema, type OTPFormData } from '@/lib/validation'
import { ROUTES } from '@/lib/constants'
import type { ApiError } from '@/types/api'

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
    <div className="flex min-h-screen items-center justify-center bg-secondary/30 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
            <div className="h-6 w-6 rounded-sm bg-primary-foreground" />
          </div>
          <span className="text-xl font-semibold">Acme Inc.</span>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Verify your account</CardTitle>
            <CardDescription>
              Enter the 8-digit verification code we sent to your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  name="otp"
                  type="text"
                  placeholder="12345678"
                  value={formData.otp}
                  onChange={handleChange}
                  disabled={isLoading}
                  maxLength={8}
                  className={errors.otp ? 'border-destructive text-center text-2xl tracking-widest' : 'text-center text-2xl tracking-widest'}
                  autoComplete="off"
                />
                {errors.otp && <p className="text-sm text-destructive">{errors.otp}</p>}
              </div>

              {apiError && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                  {apiError}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={!isFormValid || isLoading}>
                {isLoading ? 'Verifying...' : 'Verify'}
              </Button>

              <div className="text-center text-sm">
                Didn't receive the code?{' '}
                <button
                  type="button"
                  className="font-medium text-primary hover:underline"
                  disabled={isLoading}
                >
                  Resend
                </button>
              </div>

              <div className="text-center text-sm">
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => navigate(ROUTES.LOGIN)}
                  disabled={isLoading}
                >
                  ← Back to login
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
