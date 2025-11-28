import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants'
import './not-found.css'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">
          Oops, it looks like the page you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate(ROUTES.DASHBOARD)} className="not-found-button">
          Go to Homepage
        </Button>
      </div>
    </div>
  )
}
