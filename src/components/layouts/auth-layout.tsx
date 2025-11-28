import * as React from 'react'
import { Logo } from '@/components/ui/logo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import './auth-layout.css'

export interface AuthLayoutProps {
  title: string
  description: string
  brandName?: string
  children: React.ReactNode
  className?: string
}

const AuthLayout = React.forwardRef<HTMLDivElement, AuthLayoutProps>(
  ({ title, description, brandName, children, className }, ref) => {
    return (
      <div className="auth-container">
        <div ref={ref} className={cn('auth-content', className)}>
          <Logo brandName={brandName} size="md" />

          <Card>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
          </Card>
        </div>
      </div>
    )
  }
)
AuthLayout.displayName = 'AuthLayout'

export { AuthLayout }
