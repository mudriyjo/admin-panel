import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'
import './dashboard.css'

export default function DashboardPage() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Main Dashboard</h1>
        <p className="dashboard-subtitle">Welcome to your admin panel</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <Card>
          <CardHeader className="stat-header no-spacing">
            <CardTitle className="stat-title">Total Users</CardTitle>
            <svg
              className="stat-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="stat-value">2,345</div>
            <p className="stat-change">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="stat-header no-spacing">
            <CardTitle className="stat-title">Active Sessions</CardTitle>
            <svg
              className="stat-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="stat-value">573</div>
            <p className="stat-change">+12.5% from last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="stat-header no-spacing">
            <CardTitle className="stat-title">Revenue</CardTitle>
            <svg
              className="stat-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="stat-value">$45,231</div>
            <p className="stat-change">+8.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="stat-header no-spacing">
            <CardTitle className="stat-title">Credits Usage</CardTitle>
            <TrendingUp className="stat-icon" />
          </CardHeader>
          <CardContent>
            <div className="stat-value">149,758</div>
            <p className="stat-change">Last year usage</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Card */}
      <Card>
        <CardHeader>
          <CardTitle>Credits Usage Last Year</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="chart-container">
            {/* Placeholder for chart - you can integrate a charting library like recharts */}
            <div className="chart-placeholder">
              <p className="chart-placeholder-text">Chart visualization area</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <table className="users-table">
              <thead>
                <tr className="table-header-row">
                  <th className="table-header-cell">
                    EMAIL ADDRESS
                  </th>
                  <th className="table-header-cell">
                    PROVIDER
                  </th>
                  <th className="table-header-cell">
                    CREATED
                  </th>
                  <th className="table-header-cell">
                    LAST SIGN IN
                  </th>
                  <th className="table-header-cell">
                    USER UID
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    email: 'hello@horizon-ui.com',
                    provider: 'Google',
                    created: '06 Nov, 2023 11:33',
                    lastSignIn: '06 Nov, 2023 11:33',
                    uid: 'f3f42fc419-ce32-49fc-92df...',
                  },
                  {
                    email: 'thomas@gmail.com',
                    provider: 'Google',
                    created: '06 Nov, 2023 11:29',
                    lastSignIn: '06 Nov, 2023 11:29',
                    uid: 'f3f42fc419-ce32-49fc-92df...',
                  },
                  {
                    email: 'markwilliam@hotmail.com',
                    provider: 'Email',
                    created: '06 Nov, 2023 11:21',
                    lastSignIn: '06 Nov, 2023 11:21',
                    uid: 'f3f42fc419-ce32-49fc-92df...',
                  },
                ].map((user, index) => (
                  <tr key={index} className="table-body-row">
                    <td className="table-cell">{user.email}</td>
                    <td className="table-cell-muted">{user.provider}</td>
                    <td className="table-cell-muted">{user.created}</td>
                    <td className="table-cell-muted">{user.lastSignIn}</td>
                    <td className="table-cell-muted">{user.uid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
