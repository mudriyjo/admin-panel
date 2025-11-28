import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth-store'
import {
  Menu,
  Home,
  MessageSquare,
  FileText,
  Image,
  Mic,
  Users,
  Settings,
  History,
  Shield,
  LogOut,
} from 'lucide-react'
import { ROUTES } from '@/lib/constants'

interface DashboardLayoutProps {
  children: React.ReactNode
}

interface NavItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  path: string
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Main Dashboard', path: ROUTES.DASHBOARD },
  { icon: MessageSquare, label: 'AI Chat UI', path: '/chat' },
  { icon: FileText, label: 'AI Text Generator', path: '/text-generator' },
  { icon: Image, label: 'AI Image Generator', path: '/image-generator' },
  { icon: Mic, label: 'AI Text to Speech', path: '/text-to-speech' },
  { icon: Users, label: 'Users List', path: '/users' },
  { icon: Settings, label: 'Profile Settings', path: '/settings' },
  { icon: History, label: 'History', path: '/history' },
  { icon: Shield, label: 'Authentication', path: '/authentication' },
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const { logout, user } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate(ROUTES.LOGIN)
  }

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={`flex flex-col border-r bg-card transition-all duration-300 ${
          isExpanded ? 'w-64' : 'w-16'
        }`}
      >
        {/* Logo and Brand */}
        <div className="flex h-16 items-center border-b px-4">
          {isExpanded ? (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <span className="text-sm font-bold text-primary-foreground">HA</span>
              </div>
              <span className="text-lg font-semibold">Horizon AI</span>
              <span className="ml-1 rounded bg-secondary px-1.5 py-0.5 text-xs font-medium">FREE</span>
            </div>
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <span className="text-sm font-bold text-primary-foreground">HA</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-2">
          {/* Hamburger menu item */}
          <button
            onClick={toggleSidebar}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
              isExpanded ? '' : 'justify-center'
            }`}
          >
            <Menu className="h-5 w-5 shrink-0" />
            {isExpanded && <span>Toggle Menu</span>}
          </button>

          {/* Navigation items */}
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                } ${isExpanded ? '' : 'justify-center'}`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {isExpanded && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User profile and logout */}
        <div className="border-t p-2">
          <button
            onClick={handleLogout}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground ${
              isExpanded ? '' : 'justify-center'
            }`}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {isExpanded && <span>Logout</span>}
          </button>

          {isExpanded && user && (
            <div className="mt-2 flex items-center gap-2 rounded-md bg-secondary p-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {user.email.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">{user.name || 'User'}</p>
                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-card px-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Pages</span>
            <span className="text-sm text-muted-foreground">/</span>
            <span className="text-sm font-medium">
              {navItems.find((item) => item.path === location.pathname)?.label || 'Dashboard'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-muted-foreground hover:text-foreground">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>
            <button className="text-muted-foreground hover:text-foreground">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <button className="text-muted-foreground hover:text-foreground">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              AP
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-secondary/30 p-6">{children}</main>
      </div>
    </div>
  )
}
