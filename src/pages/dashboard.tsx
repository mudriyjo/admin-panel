import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Main Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <svg
              className="h-4 w-4 text-muted-foreground"
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
            <div className="text-2xl font-bold">2,345</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <svg
              className="h-4 w-4 text-muted-foreground"
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
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+12.5% from last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <svg
              className="h-4 w-4 text-muted-foreground"
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
            <div className="text-2xl font-bold">$45,231</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credits Usage</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">149,758</div>
            <p className="text-xs text-muted-foreground">Last year usage</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Card */}
      <Card>
        <CardHeader>
          <CardTitle>Credits Usage Last Year</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            {/* Placeholder for chart - you can integrate a charting library like recharts */}
            <div className="flex h-full items-center justify-center rounded-lg bg-muted/50">
              <p className="text-muted-foreground">Chart visualization area</p>
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 text-left text-sm font-medium text-muted-foreground">
                    EMAIL ADDRESS
                  </th>
                  <th className="pb-2 text-left text-sm font-medium text-muted-foreground">
                    PROVIDER
                  </th>
                  <th className="pb-2 text-left text-sm font-medium text-muted-foreground">
                    CREATED
                  </th>
                  <th className="pb-2 text-left text-sm font-medium text-muted-foreground">
                    LAST SIGN IN
                  </th>
                  <th className="pb-2 text-left text-sm font-medium text-muted-foreground">
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
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-3 text-sm">{user.email}</td>
                    <td className="py-3 text-sm text-muted-foreground">{user.provider}</td>
                    <td className="py-3 text-sm text-muted-foreground">{user.created}</td>
                    <td className="py-3 text-sm text-muted-foreground">{user.lastSignIn}</td>
                    <td className="py-3 text-sm text-muted-foreground">{user.uid}</td>
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
