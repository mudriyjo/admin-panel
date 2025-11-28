import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import apiClient from '@/lib/api-client'
import type { AuthState, User, AuthTokens, LoginCredentials } from '@/types/auth'
import type { ApiResponse } from '@/types/api'
import { STORAGE_KEYS, TOKEN_REFRESH_BUFFER } from '@/lib/constants'

// Temporary email for OTP verification
let tempEmail = ''

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,

      setAuth: (user: User, tokens: AuthTokens) => {
        set({
          user,
          tokens,
          isAuthenticated: true,
        })
      },

      login: async (credentials: LoginCredentials) => {
        try {
          // Store email temporarily for OTP verification
          tempEmail = credentials.email

          // Make login request
          const response = await apiClient.post<ApiResponse<{ requiresOTP: boolean }>>(
            '/auth/login',
            credentials
          )

          if (!response.data.data.requiresOTP) {
            throw new Error('Invalid response from server')
          }

          // Login successful, OTP sent to email
          // The actual authentication will happen in verifyOTP
        } catch (error) {
          tempEmail = ''
          throw error
        }
      },

      verifyOTP: async (otp: string) => {
        try {
          const response = await apiClient.post<ApiResponse<{ user: User; tokens: AuthTokens }>>(
            '/auth/verify-otp',
            {
              email: tempEmail,
              otp,
            }
          )

          const { user, tokens } = response.data.data

          // Set authentication state
          set({
            user,
            tokens,
            isAuthenticated: true,
          })

          // Clear temporary email
          tempEmail = ''
        } catch (error) {
          throw error
        }
      },

      refreshAccessToken: async () => {
        const { tokens } = get()
        if (!tokens?.refreshToken) {
          throw new Error('No refresh token available')
        }

        try {
          const response = await apiClient.post<ApiResponse<{ tokens: AuthTokens }>>(
            '/auth/refresh',
            {
              refreshToken: tokens.refreshToken,
            }
          )

          const newTokens = response.data.data.tokens

          set((state) => ({
            tokens: newTokens,
            user: state.user,
            isAuthenticated: true,
          }))
        } catch (error) {
          // If refresh fails, logout
          get().logout()
          throw error
        }
      },

      logout: () => {
        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
        })
        tempEmail = ''
      },
    }),
    {
      name: STORAGE_KEYS.AUTH_STATE,
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

// Helper function to check if token needs refresh
export const shouldRefreshToken = (tokens: AuthTokens | null): boolean => {
  if (!tokens?.accessToken) return false

  try {
    // Decode JWT token (simple base64 decode of payload)
    const payload = JSON.parse(atob(tokens.accessToken.split('.')[1]))
    const expiresAt = payload.exp * 1000 // Convert to milliseconds
    const now = Date.now()

    // Refresh if token expires in less than TOKEN_REFRESH_BUFFER (3 minutes)
    return expiresAt - now < TOKEN_REFRESH_BUFFER
  } catch (error) {
    console.error('Failed to decode token:', error)
    return false
  }
}
