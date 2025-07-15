import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, FileText, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Candidates",
      value: "1,234",
      description: "+20.1% from last month",
      icon: Users,
    },
    {
      title: "Active Rounds",
      value: "23",
      description: "8 scheduled today",
      icon: Calendar,
    },
    {
      title: "Questions Bank",
      value: "456",
      description: "Across 12 domains",
      icon: FileText,
    },
    {
      title: "Success Rate",
      value: "68%",
      description: "+5% from last month",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
