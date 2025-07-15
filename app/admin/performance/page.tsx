"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, TrendingDown, Users, Award, Clock, Target, Download } from "lucide-react"

// Mock performance data
const overallStats = {
  totalCandidates: 156,
  averageScore: 72.5,
  passRate: 68.2,
  averageTime: 45.3,
  topDomain: "React",
  improvement: 12.5,
}

const domainPerformance = [
  {
    domain: "React",
    candidates: 45,
    averageScore: 78.2,
    passRate: 75.6,
    averageTime: 42.1,
    trend: "up",
    improvement: 8.3,
  },
  {
    domain: "Node.js",
    candidates: 32,
    averageScore: 71.8,
    passRate: 65.6,
    averageTime: 48.7,
    trend: "up",
    improvement: 5.2,
  },
  {
    domain: "Python",
    candidates: 28,
    averageScore: 69.4,
    passRate: 64.3,
    averageTime: 46.2,
    trend: "down",
    improvement: -2.1,
  },
  {
    domain: "Java",
    candidates: 21,
    averageScore: 73.1,
    passRate: 71.4,
    averageTime: 44.8,
    trend: "up",
    improvement: 15.7,
  },
]

const roundPerformance = [
  {
    round: "Technical Screening",
    type: "MCQ",
    candidates: 156,
    averageScore: 76.3,
    passRate: 82.1,
    averageTime: 35.2,
    difficulty: "Easy",
  },
  {
    round: "Coding Challenge",
    type: "Coding",
    candidates: 128,
    averageScore: 68.7,
    passRate: 59.4,
    averageTime: 95.4,
    difficulty: "Medium",
  },
  {
    round: "System Design",
    type: "MCQ",
    candidates: 76,
    averageScore: 71.2,
    passRate: 65.8,
    averageTime: 52.3,
    difficulty: "Hard",
  },
  {
    round: "Final Technical",
    type: "Mixed",
    candidates: 45,
    averageScore: 74.8,
    passRate: 68.9,
    averageTime: 78.6,
    difficulty: "Medium",
  },
]

const topPerformers = [
  {
    name: "Alice Johnson",
    domain: "React",
    totalScore: 94.5,
    roundsCompleted: 4,
    averageTime: 38.2,
    status: "Selected",
  },
  {
    name: "Bob Smith",
    domain: "Node.js",
    totalScore: 91.8,
    roundsCompleted: 4,
    averageTime: 42.1,
    status: "Selected",
  },
  {
    name: "Carol Davis",
    domain: "Python",
    totalScore: 89.3,
    roundsCompleted: 3,
    averageTime: 41.7,
    status: "In Progress",
  },
  {
    name: "David Wilson",
    domain: "Java",
    totalScore: 87.6,
    roundsCompleted: 4,
    averageTime: 39.8,
    status: "Selected",
  },
  {
    name: "Eva Brown",
    domain: "React",
    totalScore: 86.2,
    roundsCompleted: 3,
    averageTime: 44.3,
    status: "In Progress",
  },
]

export default function PerformancePage() {
  const [selectedDomain, setSelectedDomain] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("last-30-days")

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Selected":
        return "default"
      case "In Progress":
        return "secondary"
      case "Rejected":
        return "destructive"
      default:
        return "outline"
    }
  }

  const exportReport = () => {
    // Mock export functionality
    const reportData = {
      generatedAt: new Date().toISOString(),
      period: selectedPeriod,
      domain: selectedDomain,
      overallStats,
      domainPerformance,
      roundPerformance,
      topPerformers,
    }

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `performance_report_${new Date().toISOString().split("T")[0]}.json`
    a.click()
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Performance Analytics</h2>
          <p className="text-muted-foreground">Track candidate performance and interview insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportReport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-7-days">Last 7 days</SelectItem>
            <SelectItem value="last-30-days">Last 30 days</SelectItem>
            <SelectItem value="last-90-days">Last 90 days</SelectItem>
            <SelectItem value="last-year">Last year</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedDomain} onValueChange={setSelectedDomain}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by domain" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Domains</SelectItem>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="nodejs">Node.js</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overall Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalCandidates}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-600" />+{overallStats.improvement}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.averageScore}%</div>
            <Progress value={overallStats.averageScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.passRate}%</div>
            <Progress value={overallStats.passRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.averageTime}m</div>
            <p className="text-xs text-muted-foreground">Per round completion</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="domains" className="space-y-4">
        <TabsList>
          <TabsTrigger value="domains">Domain Performance</TabsTrigger>
          <TabsTrigger value="rounds">Round Performance</TabsTrigger>
          <TabsTrigger value="top-performers">Top Performers</TabsTrigger>
        </TabsList>

        <TabsContent value="domains" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance by Domain</CardTitle>
              <CardDescription>Compare candidate performance across different technology domains</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {domainPerformance.map((domain) => (
                  <div key={domain.domain} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{domain.domain}</h4>
                        <Badge variant="outline">{domain.candidates} candidates</Badge>
                        {domain.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                        <span className={`text-sm ${domain.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                          {domain.improvement > 0 ? "+" : ""}
                          {domain.improvement}%
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Average Score</div>
                        <div className="text-lg font-semibold">{domain.averageScore}%</div>
                        <Progress value={domain.averageScore} className="mt-1" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Pass Rate</div>
                        <div className="text-lg font-semibold">{domain.passRate}%</div>
                        <Progress value={domain.passRate} className="mt-1" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Avg. Time</div>
                        <div className="text-lg font-semibold">{domain.averageTime}m</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rounds" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance by Round</CardTitle>
              <CardDescription>Analyze candidate performance across different interview rounds</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Round Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Candidates</TableHead>
                    <TableHead>Avg. Score</TableHead>
                    <TableHead>Pass Rate</TableHead>
                    <TableHead>Avg. Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roundPerformance.map((round) => (
                    <TableRow key={round.round}>
                      <TableCell className="font-medium">{round.round}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{round.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getDifficultyColor(round.difficulty)}>{round.difficulty}</Badge>
                      </TableCell>
                      <TableCell>{round.candidates}</TableCell>
                      <TableCell>{round.averageScore}%</TableCell>
                      <TableCell>{round.passRate}%</TableCell>
                      <TableCell>{round.averageTime}m</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="top-performers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Candidates</CardTitle>
              <CardDescription>Candidates with highest overall scores and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead>Total Score</TableHead>
                    <TableHead>Rounds</TableHead>
                    <TableHead>Avg. Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topPerformers.map((candidate, index) => (
                    <TableRow key={candidate.name}>
                      <TableCell className="font-medium">#{index + 1}</TableCell>
                      <TableCell>{candidate.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{candidate.domain}</Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{candidate.totalScore}%</TableCell>
                      <TableCell>{candidate.roundsCompleted}/4</TableCell>
                      <TableCell>{candidate.averageTime}m</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(candidate.status)}>{candidate.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
