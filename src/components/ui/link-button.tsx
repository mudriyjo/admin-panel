import * as React from 'react'
import { cn } from '@/lib/utils'
import './link-button.css'

export interface LinkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'muted'
  asChild?: boolean
}

const LinkButton = React.forwardRef<HTMLButtonElement, LinkButtonProps>(
  ({ variant = 'primary', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn('link-button', `link-button-${variant}`, className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
LinkButton.displayName = 'LinkButton'

export { LinkButton }
