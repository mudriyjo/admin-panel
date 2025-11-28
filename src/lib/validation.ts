import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

export const otpSchema = z.object({
  otp: z
    .string()
    .min(1, 'OTP is required')
    .length(8, 'OTP must be exactly 8 characters')
    .regex(/^[0-9]+$/, 'OTP must contain only numbers'),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type OTPFormData = z.infer<typeof otpSchema>
