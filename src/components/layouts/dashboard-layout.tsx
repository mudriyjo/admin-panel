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
import './dashboard-layout.css'

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
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${isExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
        {/* Logo and Brand */}
        <div className="sidebar-header">
          {isExpanded ? (
            <div className="brand-container">
              <div className="brand-logo">
                <span className="brand-logo-text">HA</span>
              </div>
              <span className="brand-name">Horizon AI</span>
              <span className="brand-badge">FREE</span>
            </div>
          ) : (
            <div className="brand-logo">
              <span className="brand-logo-text">HA</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="nav-container">
          {/* Hamburger menu item */}
          <button
            onClick={toggleSidebar}
            className={`nav-item nav-item-default ${isExpanded ? '' : 'nav-item-centered'}`}
          >
            <Menu className="nav-icon" />
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
                className={`nav-item ${
                  isActive ? 'nav-item-active' : 'nav-item-default'
                } ${isExpanded ? '' : 'nav-item-centered'}`}
              >
                <Icon className="nav-icon" />
                {isExpanded && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User profile and logout */}
        <div className="sidebar-footer">
          <button
            onClick={handleLogout}
            className={`logout-button ${isExpanded ? '' : 'logout-button-centered'}`}
          >
            <LogOut className="nav-icon" />
            {isExpanded && <span>Logout</span>}
          </button>

          {isExpanded && user && (
            <div className="user-profile">
              <div className="user-avatar">
                {user.email.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <p className="user-name">{user.name || 'User'}</p>
                <p className="user-email">{user.email}</p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="main-content-wrapper">
        {/* Header */}
        <header className="header">
          <div className="breadcrumb">
            <span className="breadcrumb-text">Pages</span>
            <span className="breadcrumb-text">/</span>
            <span className="breadcrumb-current">
              {navItems.find((item) => item.path === location.pathname)?.label || 'Dashboard'}
            </span>
          </div>

          <div className="header-actions">
            <button className="header-button">
              <svg className="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>
            <button className="header-button">
              <svg className="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <button className="header-button">
              <svg className="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </button>
            <div className="header-avatar">
              AP
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="main-content">{children}</main>
      </div>
    </div>
  )
}
