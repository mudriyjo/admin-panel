import * as React from 'react'
import { cn } from '@/lib/utils'
import './logo.css'

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string
  size?: 'sm' | 'md' | 'lg'
  showBrand?: boolean
}

const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
  ({ brandName = 'Acme Inc.', size = 'md', showBrand = true, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('logo-container', className)} {...props}>
        <div className={cn('logo-icon', `logo-icon-${size}`)}>
          <div className="logo-icon-inner" />
        </div>
        {showBrand && <span className={cn('logo-brand', `logo-brand-${size}`)}>{brandName}</span>}
      </div>
    )
  }
)
Logo.displayName = 'Logo'

export { Logo }
