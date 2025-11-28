// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'

// Token expiry buffer (3 minutes in milliseconds)
export const TOKEN_REFRESH_BUFFER = 3 * 60 * 1000

// Routes
export const ROUTES = {
  LOGIN: '/login',
  OTP: '/otp',
  DASHBOARD: '/dashboard',
  NOT_FOUND: '/404',
} as const

// Storage keys
export const STORAGE_KEYS = {
  AUTH_STATE: 'auth-state',
} as const
