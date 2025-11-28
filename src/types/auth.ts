export interface User {
  id: string
  email: string
  name?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface OTPVerification {
  otp: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface AuthResponse {
  user: User
  tokens: AuthTokens
}

export interface AuthState {
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  verifyOTP: (otp: string) => Promise<void>
  logout: () => void
  refreshAccessToken: () => Promise<void>
  setAuth: (user: User, tokens: AuthTokens) => void
}
