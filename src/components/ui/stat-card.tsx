import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import './stat-card.css'

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ title, value, description, icon, trend, className, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn('stat-card', className)} {...props}>
        <CardHeader className="stat-card-header">
          <CardTitle className="stat-card-title">{title}</CardTitle>
          {icon && <div className="stat-card-icon">{icon}</div>}
        </CardHeader>
        <CardContent>
          <div className="stat-card-value">{value}</div>
          {description && (
            <p className={cn('stat-card-description', trend && `stat-card-trend-${trend}`)}>
              {description}
            </p>
          )}
        </CardContent>
      </Card>
    )
  }
)
StatCard.displayName = 'StatCard'

export { StatCard }
