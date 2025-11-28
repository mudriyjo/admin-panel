import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore, shouldRefreshToken } from '@/stores/auth-store'
import { ROUTES } from '@/lib/constants'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation()
  const { isAuthenticated, tokens, refreshAccessToken } = useAuthStore()

  useEffect(() => {
    // Check if token needs refresh
    if (isAuthenticated && shouldRefreshToken(tokens)) {
      refreshAccessToken().catch((error) => {
        console.error('Failed to refresh token:', error)
        // Logout will be called automatically in the store
      })
    }
  }, [isAuthenticated, tokens, refreshAccessToken, location.pathname])

  if (!isAuthenticated) {
    // Redirect to login page while saving the attempted location
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  return <>{children}</>
}
