import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/30 p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Oops, it looks like the page you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate(ROUTES.DASHBOARD)} className="mt-8">
          Go to Homepage
        </Button>
      </div>
    </div>
  )
}
