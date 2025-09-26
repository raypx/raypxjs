"use client";

import { admin } from "@raypx/auth/client";
import { useAuth } from "@raypx/auth/core";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@raypx/ui/components/alert-dialog";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@raypx/ui/components/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@raypx/ui/components/dropdown-menu";
import { Input } from "@raypx/ui/components/input";
import { Label } from "@raypx/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@raypx/ui/components/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@raypx/ui/components/table";
import { Textarea } from "@raypx/ui/components/textarea";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  AlertTriangle,
  Ban,
  CheckCircle,
  LogOut,
  MoreHorizontal,
  Search,
  Shield,
  UserCheck,
  User as UserIcon,
  Users,
  UserX,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  username?: string;
  role?: "user" | "moderator" | "admin" | "superadmin";
  banned: boolean;
  banReason?: string;
  banExpires?: string;
  createdAt: string;
  updatedAt: string;
  image?: string;
};

type UserRole = "user" | "moderator" | "admin" | "superadmin";
type UserStatus = "all" | "active" | "banned";
type FilterState = "all" | UserRole;

type UserStats = {
  totalUsers: number;
  activeUsers: number;
  bannedUsers: number;
  recentUsers: number;
};

type UsersResponse = {
  data: User[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
    limit: number;
    offset: number;
  };
};

// API functions
const fetchUsers = async (params: {
  limit?: number;
  offset?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  role?: string;
  status?: string;
}): Promise<UsersResponse> => {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      query.set(key, value.toString());
    }
  }

  const response = await fetch(`/api/v1/users?${query}`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

const fetchUserStats = async (): Promise<{ data: UserStats }> => {
  const response = await fetch("/api/v1/users/stats");
  if (!response.ok) {
    throw new Error("Failed to fetch user stats");
  }
  return response.json();
};

const banUser = async (
  id: string,
  data: {
    banReason: string;
    banExpires?: string;
  }
) => {
  const response = await fetch(`/api/v1/users/${id}/ban`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to ban user");
  }
  return response.json();
};

const unbanUser = async (id: string) => {
  const response = await fetch(`/api/v1/users/${id}/unban`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to unban user");
  }
  return response.json();
};

const changeUserRole = async (id: string, role: string) => {
  const response = await fetch(`/api/v1/users/${id}/role`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role }),
  });
  if (!response.ok) {
    throw new Error("Failed to change user role");
  }
  return response.json();
};

const startImpersonation = async (targetUserId: string) => {
  const response = await admin.impersonateUser({
    userId: targetUserId,
  });
  if (!response.data) {
    throw new Error("Failed to start impersonation");
  }
  return response;
};

const endImpersonation = async () => {
  const response = await admin.stopImpersonating();
  if (!response.data) {
    throw new Error("Failed to end impersonation");
  }
  return response;
};

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<UserStatus>("all");
  const [roleFilter, setRoleFilter] = useState<FilterState>("all");
  const router = useRouter();

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const {
    hooks: { useSession },
  } = useAuth();

  const { data: session, refetch } = useSession();

  // Dialog states
  const [isBanDialogOpen, setIsBanDialogOpen] = useState(false);
  const [isUnbanDialogOpen, setIsUnbanDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isImpersonateDialogOpen, setIsImpersonateDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Form states
  const [banForm, setBanForm] = useState({ reason: "", expires: "" });
  const [newRole, setNewRole] = useState("");

  const queryClient = useQueryClient();
  const limit = 15;

  // Queries with proper typing
  const { data: statsData, isLoading: isStatsLoading } = useQuery({
    queryKey: ["user-stats"],
    queryFn: fetchUserStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Remove active impersonations query since better-auth handles this internally

  const queryParams = useMemo(
    () => ({
      limit,
      offset: (currentPage - 1) * limit,
      search: debouncedSearch || undefined,
      status: statusFilter === "all" ? undefined : statusFilter,
      role: roleFilter === "all" ? undefined : roleFilter,
      sortBy: "createdAt" as const,
      sortOrder: "desc" as const,
    }),
    [currentPage, debouncedSearch, statusFilter, roleFilter]
  );

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["users", queryParams],
    queryFn: () => fetchUsers(queryParams),
    placeholderData: keepPreviousData,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Mutations
  const banMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { banReason: string; banExpires?: string } }) =>
      banUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user-stats"] });
      setIsBanDialogOpen(false);
      setBanForm({ reason: "", expires: "" });
      setSelectedUser(null);
    },
    onError: (error) => {
      console.error("Failed to ban user:", error);
    },
  });

  const unbanMutation = useMutation({
    mutationFn: unbanUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user-stats"] });
      setIsUnbanDialogOpen(false);
      setSelectedUser(null);
    },
    onError: (error) => {
      console.error("Failed to unban user:", error);
    },
  });

  const roleChangeMutation = useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) => changeUserRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsRoleDialogOpen(false);
      setNewRole("");
      setSelectedUser(null);
    },
    onError: (error) => {
      console.error("Failed to change user role:", error);
    },
  });

  const impersonateMutation = useMutation({
    mutationFn: ({ userId }: { userId: string }) => startImpersonation(userId),
    onSuccess: () => {
      setIsImpersonateDialogOpen(false);
      setSelectedUser(null);
      // Refresh the page to switch to impersonated user
      router.replace("/");
      refetch();
    },
    onError: (error) => {
      console.error("Failed to start impersonation:", error);
    },
  });

  const endImpersonationMutation = useMutation({
    mutationFn: endImpersonation,
    onSuccess: () => {
      // Refresh the page to return to admin user
      router.replace("/");
      refetch();
    },
    onError: (error) => {
      console.error("Failed to end impersonation:", error);
    },
  });

  const handleBan = useCallback((user: User) => {
    setSelectedUser(user);
    setBanForm({ reason: "", expires: "" }); // Reset form
    setIsBanDialogOpen(true);
  }, []);

  const handleUnban = useCallback((user: User) => {
    setSelectedUser(user);
    setIsUnbanDialogOpen(true);
  }, []);

  const handleRoleChange = useCallback((user: User) => {
    setSelectedUser(user);
    setNewRole(user.role || "");
    setIsRoleDialogOpen(true);
  }, []);

  const handleImpersonate = useCallback((user: User) => {
    setSelectedUser(user);
    setIsImpersonateDialogOpen(true);
  }, []);

  const handleEndImpersonation = () => {
    endImpersonationMutation.mutate();
    router.replace("/");
    refetch();
  };

  const confirmBan = useCallback(() => {
    if (selectedUser && banForm.reason.trim()) {
      banMutation.mutate({
        id: selectedUser.id,
        data: {
          banReason: banForm.reason.trim(),
          banExpires: banForm.expires || undefined,
        },
      });
    }
  }, [selectedUser, banForm, banMutation]);

  const confirmUnban = useCallback(() => {
    if (selectedUser) {
      unbanMutation.mutate(selectedUser.id);
    }
  }, [selectedUser, unbanMutation]);

  const confirmRoleChange = useCallback(() => {
    if (selectedUser && newRole && newRole !== selectedUser.role) {
      roleChangeMutation.mutate({
        id: selectedUser.id,
        role: newRole as UserRole,
      });
    }
  }, [selectedUser, newRole, roleChangeMutation]);

  const confirmImpersonate = useCallback(() => {
    if (selectedUser) {
      impersonateMutation.mutate({
        userId: selectedUser.id,
      });
    }
  }, [selectedUser, impersonateMutation]);

  const getRoleBadgeColor = useCallback((role?: UserRole) => {
    switch (role) {
      case "admin":
      case "superadmin":
        return "bg-red-100 text-red-800";
      case "moderator":
        return "bg-blue-100 text-blue-800";
      case "user":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }, []);

  // Enhanced error handling
  if (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return (
      <div className="space-y-6 p-6">
        <div>
          <h1 className="font-semibold text-2xl">User Management</h1>
          <p className="text-muted-foreground">Manage users, roles, and access permissions</p>
        </div>
        <Card className="border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center py-12">
              <div className="space-y-4 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <h3 className="mb-2 font-medium text-lg text-red-900">Failed to Load Users</h3>
                  <p className="mx-auto mb-4 max-w-md text-red-700 text-sm">{errorMessage}</p>
                </div>
                <div className="flex justify-center gap-3">
                  <Button onClick={() => window.location.reload()} variant="outline">
                    Reload Page
                  </Button>
                  <Button
                    onClick={() => {
                      queryClient.invalidateQueries({ queryKey: ["users"] });
                      queryClient.invalidateQueries({
                        queryKey: ["user-stats"],
                      });
                    }}
                  >
                    Retry
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Stats component with loading state
  const renderStatsSection = (): any => {
    if (isStatsLoading) {
      return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 animate-pulse rounded bg-gray-200" />
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (!statsData?.data) {
      return null;
    }

    const stats = [
      {
        title: "Total Users",
        value: statsData.data.totalUsers,
        icon: Users,
        color: "text-muted-foreground",
        valueColor: "text-gray-900",
      },
      {
        title: "Active Users",
        value: statsData.data.activeUsers,
        icon: UserCheck,
        color: "text-green-600",
        valueColor: "text-green-600",
      },
      {
        title: "Banned Users",
        value: statsData.data.bannedUsers,
        icon: UserX,
        color: "text-red-600",
        valueColor: "text-red-600",
      },
      {
        title: "New Users (30d)",
        value: statsData.data.recentUsers,
        icon: Users,
        color: "text-blue-600",
        valueColor: "text-blue-600",
      },
    ];

    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="font-medium text-sm">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className={`font-bold text-2xl ${stat.valueColor}`}>
                  {stat.value.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="font-semibold text-2xl">User Management</h1>
        <p className="text-muted-foreground">Manage users, roles, and access permissions</p>
      </div>

      {renderStatsSection()}

      {/* Impersonation Status */}
      {session?.user && (session as Record<string, unknown>).impersonatedBy && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-800">
              <Users className="h-5 w-5" />
              <span>Currently Impersonating</span>
            </CardTitle>
            <CardDescription>
              You are viewing the system as {session.user.name} ({session.user.email})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between rounded-lg border bg-white p-3">
              <div className="flex items-center space-x-3">
                <div>
                  <div className="font-medium">{session.user.name}</div>
                  <div className="text-gray-500 text-sm">{session.user.email}</div>
                </div>
                <Badge className="bg-orange-100 text-orange-800" variant="outline">
                  Impersonating
                </Badge>
              </div>
              <Button
                className="text-red-600 hover:text-red-700"
                disabled={endImpersonationMutation.isPending}
                onClick={handleEndImpersonation}
                size="sm"
                variant="outline"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Stop Impersonating
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-muted-foreground" />
          <Input
            className="pl-9"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or username..."
            value={search}
          />
          {search !== debouncedSearch && (
            <div className="-translate-y-1/2 absolute top-1/2 right-3 transform">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            </div>
          )}
        </div>
        <Select
          onValueChange={(value) => setStatusFilter(value as UserStatus)}
          value={statusFilter}
        >
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="banned">Banned</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setRoleFilter(value as FilterState)} value={roleFilter}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="moderator">Moderator</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="superadmin">Super Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            {data?.meta.total || 0} users total
            {isFetching && !isLoading && <span className="ml-2 text-blue-600">• Updating...</span>}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div className="animate-pulse rounded border p-4" key={i}>
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-gray-200" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-1/4 rounded bg-gray-200" />
                      <div className="h-3 w-1/6 rounded bg-gray-200" />
                    </div>
                    <div className="h-6 w-16 rounded bg-gray-200" />
                    <div className="h-6 w-12 rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : data?.data.length === 0 ? (
            <div className="py-12 text-center">
              <UserIcon className="mx-auto mb-4 h-16 w-16 text-muted-foreground opacity-50" />
              <h3 className="mb-2 font-medium text-lg">No users found</h3>
              <p className="mx-auto max-w-sm text-muted-foreground">
                {debouncedSearch || statusFilter !== "all" || roleFilter !== "all"
                  ? "No users match your current filters. Try adjusting your search criteria."
                  : "No users have been created yet."}
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="w-12" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                            {user.image ? (
                              <Image
                                alt={user.name}
                                className="h-8 w-8 rounded-full"
                                src={user.image}
                              />
                            ) : (
                              <span className="font-medium text-sm">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            {user.username && (
                              <div className="text-muted-foreground text-sm">@{user.username}</div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span>{user.email}</span>
                          {user.emailVerified ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRoleBadgeColor(user.role)}>
                          {user.role || "user"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.banned ? (
                          <div>
                            <Badge variant="destructive">Banned</Badge>
                            {user.banExpires && (
                              <div className="mt-1 text-muted-foreground text-xs">
                                Until {format(new Date(user.banExpires), "MMM d, yyyy")}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Badge
                            className="border-green-200 bg-green-50 text-green-700"
                            variant="outline"
                          >
                            Active
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{format(new Date(user.createdAt), "MMM d, yyyy")}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleRoleChange(user)}>
                              <Shield className="mr-2 h-4 w-4" />
                              Change Role
                            </DropdownMenuItem>
                            {!user.banned &&
                              user.role !== "admin" &&
                              user.role !== "superadmin" && (
                                <DropdownMenuItem onClick={() => handleImpersonate(user)}>
                                  <Users className="mr-2 h-4 w-4" />
                                  Impersonate
                                </DropdownMenuItem>
                              )}
                            {user.banned ? (
                              <DropdownMenuItem
                                className="text-green-600"
                                onClick={() => handleUnban(user)}
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Unban User
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleBan(user)}
                              >
                                <Ban className="mr-2 h-4 w-4" />
                                Ban User
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination */}
          {data && data.meta.totalPages > 1 && (
            <div className="mt-4 flex items-center justify-center space-x-2">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                variant="outline"
              >
                Previous
              </Button>
              <span className="text-muted-foreground text-sm">
                Page {data.meta.page} of {data.meta.totalPages}
              </span>
              <Button
                disabled={currentPage === data.meta.totalPages}
                onClick={() => setCurrentPage(Math.min(data.meta.totalPages, currentPage + 1))}
                variant="outline"
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ban User Dialog */}
      <Dialog onOpenChange={setIsBanDialogOpen} open={isBanDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ban User</DialogTitle>
            <DialogDescription>
              Ban "{selectedUser?.name}" from the platform. This will prevent them from accessing
              their account.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="ban-reason">Ban Reason *</Label>
              <Textarea
                id="ban-reason"
                onChange={(e) => setBanForm({ ...banForm, reason: e.target.value })}
                placeholder="Enter reason for ban..."
                required
                value={banForm.reason}
              />
            </div>
            <div>
              <Label htmlFor="ban-expires">Ban Expires (optional)</Label>
              <Input
                id="ban-expires"
                onChange={(e) => setBanForm({ ...banForm, expires: e.target.value })}
                type="datetime-local"
                value={banForm.expires}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsBanDialogOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button
              disabled={banMutation.isPending || !banForm.reason.trim()}
              onClick={confirmBan}
              variant="destructive"
            >
              {banMutation.isPending ? "Banning..." : "Ban User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unban User Dialog */}
      <AlertDialog onOpenChange={setIsUnbanDialogOpen} open={isUnbanDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unban User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to unban "{selectedUser?.name}"? They will regain access to
              their account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={unbanMutation.isPending} onClick={confirmUnban}>
              {unbanMutation.isPending ? "Unbanning..." : "Unban User"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Change Role Dialog */}
      <Dialog onOpenChange={setIsRoleDialogOpen} open={isRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
            <DialogDescription>
              Change the role for "{selectedUser?.name}". This will affect their permissions on the
              platform.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="new-role">New Role</Label>
            <Select onValueChange={setNewRole} value={newRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="superadmin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsRoleDialogOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button disabled={roleChangeMutation.isPending || !newRole} onClick={confirmRoleChange}>
              {roleChangeMutation.isPending ? "Updating..." : "Update Role"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Impersonate User Dialog */}
      <Dialog onOpenChange={setIsImpersonateDialogOpen} open={isImpersonateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Impersonate User</DialogTitle>
            <DialogDescription>
              Temporarily sign in as "{selectedUser?.name}" for support purposes. You will be
              switched to their account in this session.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-600" />
              <div className="text-sm text-yellow-800">
                <div className="font-medium">Important Security Notice</div>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• Use impersonation only for legitimate support purposes</li>
                  <li>• All actions will be logged and audited</li>
                  <li>• End the session as soon as possible</li>
                  <li>• Never access sensitive personal information unnecessarily</li>
                </ul>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsImpersonateDialogOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button
              className="bg-orange-600 hover:bg-orange-700"
              disabled={impersonateMutation.isPending}
              onClick={confirmImpersonate}
            >
              {impersonateMutation.isPending ? "Starting..." : "Start Impersonation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
