import { Avatar, AvatarFallback, AvatarImage } from "@raypx/ui/components/avatar";
import { Badge } from "@raypx/ui/components/badge";
import { Button } from "@raypx/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@raypx/ui/components/card";
import { Input } from "@raypx/ui/components/input";
import { Calendar, Filter, Mail, MoreHorizontal, Plus, Search, Shield, Users } from "lucide-react";

export default function UsersPage() {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "active",
      lastActive: "2 hours ago",
      avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${Math.random().toString(36).substring(2, 10)}`,
      department: "Engineering",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "User",
      status: "active",
      lastActive: "1 day ago",
      avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${Math.random().toString(36).substring(2, 10)}`,
      department: "Marketing",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      role: "Manager",
      status: "inactive",
      lastActive: "1 week ago",
      avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${Math.random().toString(36).substring(2, 10)}`,
      department: "Sales",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice.brown@example.com",
      role: "User",
      status: "active",
      lastActive: "3 hours ago",
      avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${Math.random().toString(36).substring(2, 10)}`,
      department: "Design",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie.wilson@example.com",
      role: "Admin",
      status: "active",
      lastActive: "30 minutes ago",
      avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${Math.random().toString(36).substring(2, 10)}`,
      department: "Engineering",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800";
      case "Manager":
        return "bg-blue-100 text-blue-800";
      case "User":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage your organization's users and their permissions.
          </p>
        </div>
        <Button className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">2,847</div>
            <p className="text-muted-foreground text-xs">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Active Users</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">2,341</div>
            <p className="text-muted-foreground text-xs">82.2% of total users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">New This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">156</div>
            <p className="text-muted-foreground text-xs">+8.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Admins</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">23</div>
            <p className="text-muted-foreground text-xs">0.8% of total users</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search Users</CardTitle>
          <CardDescription>Find users by name, email, or department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
              <Input className="pl-10" placeholder="Search users..." />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>A list of all users in your organization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                key={user.id}
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage alt={user.name} src={user.avatar} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-sm leading-none">{user.name}</p>
                      <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                      <Badge className={getRoleColor(user.role)} variant="outline">
                        {user.role}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-muted-foreground text-xs">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-3 w-3" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Shield className="h-3 w-3" />
                        <span>{user.department}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Last active: {user.lastActive}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
