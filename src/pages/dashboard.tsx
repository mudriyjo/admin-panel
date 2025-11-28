import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatCard } from '@/components/ui/stat-card'
import { Table, type TableColumn } from '@/components/ui/table'
import { TrendingUp, Users, Zap, DollarSign } from 'lucide-react'
import './dashboard.css'

interface UserData {
  email: string
  provider: string
  created: string
  lastSignIn: string
  uid: string
}

export default function DashboardPage() {
  const usersData: UserData[] = [
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
  ]

  const userColumns: TableColumn<UserData>[] = [
    {
      header: 'EMAIL ADDRESS',
      accessor: 'email',
    },
    {
      header: 'PROVIDER',
      accessor: 'provider',
      className: 'table-cell-muted',
    },
    {
      header: 'CREATED',
      accessor: 'created',
      className: 'table-cell-muted',
    },
    {
      header: 'LAST SIGN IN',
      accessor: 'lastSignIn',
      className: 'table-cell-muted',
    },
    {
      header: 'USER UID',
      accessor: 'uid',
      className: 'table-cell-muted',
    },
  ]

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Main Dashboard</h1>
        <p className="dashboard-subtitle">Welcome to your admin panel</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Users"
          value="2,345"
          description="+20.1% from last month"
          trend="up"
          icon={<Users />}
        />

        <StatCard
          title="Active Sessions"
          value="573"
          description="+12.5% from last hour"
          trend="up"
          icon={<Zap />}
        />

        <StatCard
          title="Revenue"
          value="$45,231"
          description="+8.2% from last month"
          trend="up"
          icon={<DollarSign />}
        />

        <StatCard
          title="Credits Usage"
          value="149,758"
          description="Last year usage"
          trend="neutral"
          icon={<TrendingUp />}
        />
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
          <Table columns={userColumns} data={usersData} />
        </CardContent>
      </Card>
    </div>
  )
}
