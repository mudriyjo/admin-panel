import * as React from 'react'
import { cn } from '@/lib/utils'
import './avatar.css'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg'
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, fallback, size = 'md', className, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false)

    const displayFallback = !src || imageError

    return (
      <div
        ref={ref}
        className={cn('avatar', `avatar-${size}`, className)}
        {...props}
      >
        {displayFallback ? (
          <span className="avatar-fallback">{fallback || '?'}</span>
        ) : (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="avatar-image"
            onError={() => setImageError(true)}
          />
        )}
      </div>
    )
  }
)
Avatar.displayName = 'Avatar'

export { Avatar }
