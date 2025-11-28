import * as React from 'react'
import { cn } from '@/lib/utils'
import './divider.css'

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ text, className, ...props }, ref) => {
    if (!text) {
      return <div ref={ref} className={cn('divider-simple', className)} {...props} />
    }

    return (
      <div ref={ref} className={cn('divider-container', className)} {...props}>
        <div className="divider-line">
          <span className="divider-border" />
        </div>
        <div className="divider-text-container">
          <span className="divider-text">{text}</span>
        </div>
      </div>
    )
  }
)
Divider.displayName = 'Divider'

export { Divider }
