
import { useState } from "react";
import { 
  Users, 
  MessageSquare, 
  Flag, 
  TrendingUp, 
  BarChart3, 
  Settings,
  Search,
  MoreVertical,
  Shield,
  Ban,
  Trash2,
  CheckCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const stats = [
    {
      title: "Total Users",
      value: "5,234",
      change: "+12%",
      icon: Users,
      color: "text-blue-400"
    },
    {
      title: "Total Questions",
      value: "12,847",
      change: "+8%",
      icon: MessageSquare,
      color: "text-green-400"
    },
    {
      title: "Flagged Content",
      value: "23",
      change: "-15%",
      icon: Flag,
      color: "text-red-400"
    },
    {
      title: "Daily Active Users",
      value: "1,892",
      change: "+5%",
      icon: TrendingUp,
      color: "text-purple-400"
    }
  ];

  const users = [
    {
      id: 1,
      username: "devStudent123",
      email: "dev@example.com",
      reputation: 1250,
      questions: 45,
      answers: 89,
      status: "active",
      joinDate: "2024-01-15"
    },
    {
      id: 2,
      username: "reactExpert99",
      email: "expert@example.com",
      reputation: 5680,
      questions: 12,
      answers: 234,
      status: "active",
      joinDate: "2023-08-22"
    },
    {
      id: 3,
      username: "spamUser456",
      email: "spam@example.com",
      reputation: -50,
      questions: 100,
      answers: 5,
      status: "flagged",
      joinDate: "2024-02-28"
    }
  ];

  const questions = [
    {
      id: 1,
      title: "How to implement authentication in React?",
      author: "devStudent123",
      votes: 15,
      answers: 3,
      views: 1250,
      status: "active",
      createdAt: "2024-01-20"
    },
    {
      id: 2,
      title: "Suspicious content with spam links",
      author: "spamUser456",
      votes: -5,
      answers: 0,
      views: 50,
      status: "flagged",
      createdAt: "2024-01-25"
    }
  ];

  const handleUserAction = (action: string, userId: number) => {
    toast({
      title: `User ${action}`,
      description: `User action "${action}" has been executed successfully.`,
    });
  };

  const handleQuestionAction = (action: string, questionId: number) => {
    toast({
      title: `Question ${action}`,
      description: `Question action "${action}" has been executed successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Admin Dashboard</h1>
          <p className="text-slate-400">Manage users, content, and monitor platform activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-100 mt-1">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl bg-slate-700/50 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-slate-700 rounded-xl p-1">
            <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-blue-600">
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="rounded-lg data-[state=active]:bg-blue-600">
              Users
            </TabsTrigger>
            <TabsTrigger value="questions" className="rounded-lg data-[state=active]:bg-blue-600">
              Questions
            </TabsTrigger>
            <TabsTrigger value="settings" className="rounded-lg data-[state=active]:bg-blue-600">
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-slate-100 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                    Activity Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Questions today</span>
                      <span className="text-slate-100 font-semibold">127</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Answers today</span>
                      <span className="text-slate-100 font-semibold">89</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">New users today</span>
                      <span className="text-slate-100 font-semibold">34</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Flags pending</span>
                      <Badge variant="destructive" className="rounded-lg">
                        23
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-slate-100 flex items-center gap-2">
                    <Flag className="w-5 h-5 text-red-400" />
                    Recent Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-slate-300 text-sm">Spam content reported</p>
                        <p className="text-slate-500 text-xs">Question #1245</p>
                      </div>
                      <Badge variant="destructive" className="text-xs rounded-lg">
                        High
                      </Badge>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-slate-300 text-sm">Inappropriate answer</p>
                        <p className="text-slate-500 text-xs">Answer #5678</p>
                      </div>
                      <Badge variant="secondary" className="text-xs rounded-lg">
                        Medium
                      </Badge>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-slate-300 text-sm">User harassment</p>
                        <p className="text-slate-500 text-xs">User @spamUser456</p>
                      </div>
                      <Badge variant="destructive" className="text-xs rounded-lg">
                        High
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-slate-100">User Management</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        placeholder="Search users..."
                        className="pl-10 bg-slate-700/50 border-slate-600 rounded-xl w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700 hover:bg-slate-700/30">
                      <TableHead className="text-slate-300">User</TableHead>
                      <TableHead className="text-slate-300">Reputation</TableHead>
                      <TableHead className="text-slate-300">Activity</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="border-slate-700 hover:bg-slate-700/30">
                        <TableCell>
                          <div>
                            <p className="text-slate-200 font-medium">{user.username}</p>
                            <p className="text-slate-400 text-sm">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`font-semibold ${
                            user.reputation > 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {user.reputation}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-slate-400">
                            <p>{user.questions} questions</p>
                            <p>{user.answers} answers</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={user.status === 'active' ? 'default' : 'destructive'}
                            className="rounded-lg"
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-slate-800 border-slate-700">
                              <DropdownMenuItem 
                                onClick={() => handleUserAction('view', user.id)}
                                className="hover:bg-slate-700"
                              >
                                <Shield className="mr-2 h-4 w-4" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleUserAction('ban', user.id)}
                                className="hover:bg-slate-700 text-yellow-400"
                              >
                                <Ban className="mr-2 h-4 w-4" />
                                Suspend User
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleUserAction('delete', user.id)}
                                className="hover:bg-slate-700 text-red-400"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Account
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Questions Tab */}
          <TabsContent value="questions" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-slate-100">Content Moderation</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        placeholder="Search questions..."
                        className="pl-10 bg-slate-700/50 border-slate-600 rounded-xl w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700 hover:bg-slate-700/30">
                      <TableHead className="text-slate-300">Question</TableHead>
                      <TableHead className="text-slate-300">Author</TableHead>
                      <TableHead className="text-slate-300">Stats</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {questions.map((question) => (
                      <TableRow key={question.id} className="border-slate-700 hover:bg-slate-700/30">
                        <TableCell>
                          <div className="max-w-xs">
                            <p className="text-slate-200 font-medium truncate">{question.title}</p>
                            <p className="text-slate-500 text-xs">{question.createdAt}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-slate-300">{question.author}</span>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-slate-400">
                            <p>{question.votes} votes</p>
                            <p>{question.answers} answers</p>
                            <p>{question.views} views</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={question.status === 'active' ? 'default' : 'destructive'}
                            className="rounded-lg"
                          >
                            {question.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-slate-800 border-slate-700">
                              <DropdownMenuItem 
                                onClick={() => handleQuestionAction('approve', question.id)}
                                className="hover:bg-slate-700 text-green-400"
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleQuestionAction('flag', question.id)}
                                className="hover:bg-slate-700 text-yellow-400"
                              >
                                <Flag className="mr-2 h-4 w-4" />
                                Flag Content
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleQuestionAction('delete', question.id)}
                                className="hover:bg-slate-700 text-red-400"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-slate-100 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-400" />
                  Platform Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-slate-200 font-medium mb-3">Moderation Settings</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start border-slate-600 hover:bg-slate-700">
                        Configure auto-moderation rules
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-slate-600 hover:bg-slate-700">
                        Manage flagged content thresholds
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-slate-600 hover:bg-slate-700">
                        Set reputation requirements
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-slate-200 font-medium mb-3">Community Settings</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start border-slate-600 hover:bg-slate-700">
                        Configure voting permissions
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-slate-600 hover:bg-slate-700">
                        Manage tags and categories
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-slate-600 hover:bg-slate-700">
                        Set question posting limits
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
