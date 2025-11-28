import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth-store'
import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { AuthLayout } from '@/components/layouts/auth-layout'
import { loginSchema, type LoginFormData } from '@/lib/validation'
import { ROUTES } from '@/lib/constants'
import { clearFieldError } from '@/lib/utils'
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
      setErrors((prev) => clearFieldError<LoginFormData>(prev, name as keyof LoginFormData))
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
      description=""
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
          labelAction=""
        />

        <Button type="submit" className="btn-full" isLoading={isLoading} loadingText="Logging in..." disabled={!isFormValid}>
          Login
        </Button>
      </Form>
    </AuthLayout>
  )
}
