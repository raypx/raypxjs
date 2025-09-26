import { Badge } from "@raypx/ui/components/badge";
import { Button } from "@raypx/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@raypx/ui/components/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@raypx/ui/components/select";
import {
  Activity,
  BarChart3,
  Clock,
  Download,
  Monitor,
  Smartphone,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

export default function AnalyticsPage() {
  const metrics = [
    {
      title: "Total Visits",
      value: "89,234",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: Users,
      description: "vs last month",
    },
    {
      title: "Page Views",
      value: "234,567",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: Activity,
      description: "vs last month",
    },
    {
      title: "Avg. Session",
      value: "2m 34s",
      change: "+5.3%",
      changeType: "positive" as const,
      icon: Clock,
      description: "vs last month",
    },
    {
      title: "Bounce Rate",
      value: "23.4%",
      change: "-2.1%",
      changeType: "negative" as const,
      icon: TrendingDown,
      description: "vs last month",
    },
  ];

  const topPages = [
    {
      page: "/dashboard",
      views: 12_456,
      change: "+15.2%",
      changeType: "positive" as const,
    },
    {
      page: "/users",
      views: 8234,
      change: "+8.7%",
      changeType: "positive" as const,
    },
    {
      page: "/analytics",
      views: 6789,
      change: "+12.3%",
      changeType: "positive" as const,
    },
    {
      page: "/settings",
      views: 4567,
      change: "-2.1%",
      changeType: "negative" as const,
    },
    {
      page: "/help",
      views: 3234,
      change: "+5.6%",
      changeType: "positive" as const,
    },
  ];

  const deviceStats = [
    { device: "Desktop", percentage: 65, icon: Monitor, color: "bg-blue-500" },
    {
      device: "Mobile",
      percentage: 28,
      icon: Smartphone,
      color: "bg-green-500",
    },
    { device: "Tablet", percentage: 7, icon: Monitor, color: "bg-purple-500" },
  ];

  const trafficSources = [
    { source: "Direct", percentage: 45, change: "+12.3%" },
    { source: "Organic Search", percentage: 32, change: "+8.7%" },
    { source: "Social Media", percentage: 15, change: "+23.1%" },
    { source: "Referral", percentage: 8, change: "-2.1%" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track your application's performance and user behavior.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="7d">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-medium text-sm">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl">{metric.value}</div>
              <div className="flex items-center space-x-2">
                {metric.changeType === "positive" ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                <span
                  className={`text-xs ${
                    metric.changeType === "positive" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {metric.change}
                </span>
                <span className="text-muted-foreground text-xs">{metric.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Main Chart */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
            <CardDescription>Daily page views and unique visitors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-80 items-center justify-center rounded-lg bg-muted/50">
              <div className="text-center">
                <BarChart3 className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                <p className="mb-2 font-medium text-lg text-muted-foreground">Traffic Chart</p>
                <p className="text-muted-foreground text-sm">
                  Interactive chart showing daily traffic patterns
                </p>
                <p className="mt-2 text-muted-foreground text-xs">
                  Chart component will be integrated here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Device Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Device Distribution</CardTitle>
            <CardDescription>Traffic by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deviceStats.map((device) => (
                <div className="flex items-center justify-between" key={device.device}>
                  <div className="flex items-center space-x-3">
                    <device.icon className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium text-sm">{device.device}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-24 rounded-full bg-muted">
                      <div
                        className={`h-2 rounded-full ${device.color}`}
                        style={{ width: `${device.percentage}%` }}
                      />
                    </div>
                    <span className="w-12 text-right font-medium text-sm">
                      {device.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your visitors come from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSources.map((source) => (
                <div className="flex items-center justify-between" key={source.source}>
                  <span className="font-medium text-sm">{source.source}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground text-sm">{source.percentage}%</span>
                    <Badge
                      className="text-xs"
                      variant={source.change.startsWith("+") ? "default" : "secondary"}
                    >
                      {source.change}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages */}
      <Card>
        <CardHeader>
          <CardTitle>Top Pages</CardTitle>
          <CardDescription>Most visited pages in your application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div
                className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                key={page.page}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted font-medium text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{page.page}</p>
                    <p className="text-muted-foreground text-xs">
                      {page.views.toLocaleString()} views
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    className="text-xs"
                    variant={page.changeType === "positive" ? "default" : "secondary"}
                  >
                    {page.change}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Real-time Activity</CardTitle>
          <CardDescription>Live user activity and events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center rounded-lg bg-muted/50">
            <div className="text-center">
              <Activity className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">Real-time activity feed</p>
              <p className="text-muted-foreground text-xs">Live updates and user actions</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
