import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth-store'
import { ROUTES } from '@/lib/constants'

interface PublicRouteProps {
  children: React.ReactNode
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (isAuthenticated) {
    // Redirect to dashboard if already authenticated
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return <>{children}</>
}
