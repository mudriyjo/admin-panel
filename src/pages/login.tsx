import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth-store'
import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { LinkButton } from '@/components/ui/link-button'
import { Divider } from '@/components/ui/divider'
import { AuthLayout } from '@/components/layouts/auth-layout'
import { loginSchema, type LoginFormData } from '@/lib/validation'
import { ROUTES } from '@/lib/constants'
import type { ApiError } from '@/types/api'
import './login.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({})
  const [apiError, setApiError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear field error when user types
    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
    // Clear API error when user types
    if (apiError) {
      setApiError('')
    }
  }

  const validate = (): boolean => {
    try {
      loginSchema.parse(formData)
      setErrors({})
      return true
    } catch (error: any) {
      const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {}
      error.errors?.forEach((err: any) => {
        const field = err.path[0] as keyof LoginFormData
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
      await login(formData)
      // Navigate to OTP page on success
      navigate(ROUTES.OTP)
    } catch (error) {
      const apiErr = error as ApiError
      setApiError(apiErr.message || 'Username or password is not correct')
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = formData.email.trim() !== '' && formData.password.trim() !== '' && Object.keys(errors).length === 0

  return (
    <AuthLayout
      title="Login to your account"
      description="Enter your email below to login to your account"
      brandName="Acme Inc."
    >
      <Form onSubmit={handleSubmit} error={apiError}>
        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="m@example.com"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          error={errors.email}
        />

        <FormField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
          error={errors.password}
          labelAction={
            <LinkButton type="button" variant="primary" className="forgot-password-link">
              Forgot your password?
            </LinkButton>
          }
        />

        <Button type="submit" className="btn-full" isLoading={isLoading} loadingText="Logging in..." disabled={!isFormValid}>
          Login
        </Button>

        <Divider text="Or continue with" />

        <Button type="button" variant="outline" className="btn-full" disabled={isLoading}>
          <svg className="github-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          Login with GitHub
        </Button>

        <div className="signup-text">
          Don't have an account?{' '}
          <LinkButton type="button" variant="primary" className="signup-link">
            Sign up
          </LinkButton>
        </div>
      </Form>
    </AuthLayout>
  )
}
