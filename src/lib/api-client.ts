import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { API_BASE_URL } from './constants'
import type { ApiError } from '@/types/api'

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable sending cookies for CSRF protection
})

// Request interceptor - add auth token to requests
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get auth state from localStorage
    const authState = localStorage.getItem('auth-state')
    if (authState) {
      try {
        const { state } = JSON.parse(authState)
        if (state?.tokens?.accessToken) {
          config.headers.Authorization = `Bearer ${state.tokens.accessToken}`
        }
      } catch (error) {
        console.error('Failed to parse auth state:', error)
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    // Handle network errors
    if (!error.response) {
      return Promise.reject({
        message: 'Network error. Please check your connection.',
        code: 'NETWORK_ERROR',
      } as ApiError)
    }

    // Handle API errors
    const apiError: ApiError = {
      message: error.response.data?.message || 'An unexpected error occurred',
      code: error.response.data?.code,
      status: error.response.status,
    }

    // Handle 401 Unauthorized - token expired or invalid
    if (error.response.status === 401) {
      // Clear auth state and redirect to login
      localStorage.removeItem('auth-state')
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login'
      }
    }

    return Promise.reject(apiError)
  }
)

export default apiClient
