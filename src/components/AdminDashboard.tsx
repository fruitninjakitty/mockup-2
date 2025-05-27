
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface OrganizationStats {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  activeUsers: number;
  completionRate: number;
}

interface Course {
  id: string;
  title: string;
  teacher: string;
  students: number;
  progress: number;
  issues: number;
  plagiarismAlerts: number;
}

interface Teacher {
  id: string;
  name: string;
  email: string;
  courses: number;
  students: number;
  rating: number;
  status: 'active' | 'inactive';
}

export const AdminDashboard = () => {
  const stats: OrganizationStats = {
    totalStudents: 1247,
    totalTeachers: 89,
    totalCourses: 156,
    activeUsers: 892,
    completionRate: 74
  };

  const courses: Course[] = [
    {
      id: '1',
      title: 'Introduction to Computer Science',
      teacher: 'Dr. Sarah Johnson',
      students: 24,
      progress: 68,
      issues: 2,
      plagiarismAlerts: 0
    },
    {
      id: '2',
      title: 'Advanced Mathematics',
      teacher: 'Prof. Michael Chen',
      students: 31,
      progress: 82,
      issues: 0,
      plagiarismAlerts: 1
    },
    {
      id: '3',
      title: 'Data Science Fundamentals',
      teacher: 'Dr. Emily Rodriguez',
      students: 18,
      progress: 45,
      issues: 5,
      plagiarismAlerts: 2
    }
  ];

  const teachers: Teacher[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      courses: 3,
      students: 72,
      rating: 4.8,
      status: 'active'
    },
    {
      id: '2',
      name: 'Prof. Michael Chen',
      email: 'michael.chen@university.edu',
      courses: 2,
      students: 45,
      rating: 4.6,
      status: 'active'
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@university.edu',
      courses: 4,
      students: 89,
      rating: 4.9,
      status: 'active'
    }
  ];

  const getIssueColor = (issues: number) => {
    if (issues === 0) return 'text-green-600 bg-green-50';
    if (issues <= 2) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">Organization Dashboard</h1>
        <p className="text-lg opacity-90">Monitor and manage your educational organization</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{stats.totalStudents.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Students</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-accent">{stats.totalTeachers}</div>
            <div className="text-sm text-gray-600">Teachers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{stats.totalCourses}</div>
            <div className="text-sm text-gray-600">Active Courses</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.activeUsers}</div>
            <div className="text-sm text-gray-600">Active Users</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{stats.completionRate}%</div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Course Management</TabsTrigger>
          <TabsTrigger value="teachers">Teacher Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Current status of the learning platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Server Uptime</span>
                  <Badge className="bg-green-500">99.9%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Database Performance</span>
                  <Badge className="bg-green-500">Excellent</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Active Sessions</span>
                  <span className="font-medium">347</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Pending Issues</span>
                  <Badge variant="outline" className="text-orange-600 border-orange-600">
                    7 items
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Issues requiring attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="font-medium text-red-800">High Plagiarism Alert</div>
                  <div className="text-sm text-red-600">Data Science Fundamentals - 2 cases detected</div>
                  <div className="text-xs text-red-500">30 minutes ago</div>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="font-medium text-yellow-800">Low Engagement</div>
                  <div className="text-sm text-yellow-600">Advanced Mathematics - Below 60% activity</div>
                  <div className="text-xs text-yellow-500">2 hours ago</div>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="font-medium text-blue-800">New Teacher Request</div>
                  <div className="text-sm text-blue-600">Prof. James Wilson - Pending approval</div>
                  <div className="text-xs text-blue-500">1 day ago</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="bg-primary hover:bg-primary/90">
                  Add Teacher
                </Button>
                <Button variant="outline">
                  Create Course
                </Button>
                <Button variant="outline">
                  Bulk Enroll Students
                </Button>
                <Button variant="outline">
                  Generate Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Management</CardTitle>
              <CardDescription>Monitor all courses across the organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{course.title}</h3>
                      <p className="text-sm text-gray-600">Instructor: {course.teacher}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm">{course.students} students</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">Progress:</span>
                          <Progress value={course.progress} className="w-20" />
                          <span className="text-sm font-medium">{course.progress}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getIssueColor(course.issues)}`}>
                          {course.issues} issues
                        </div>
                        {course.plagiarismAlerts > 0 && (
                          <div className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium mt-1">
                            {course.plagiarismAlerts} plagiarism
                          </div>
                        )}
                      </div>
                      
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Manage
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teachers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Management</CardTitle>
              <CardDescription>Manage teaching staff and their performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teachers.map((teacher) => (
                  <div key={teacher.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        {teacher.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold">{teacher.name}</h3>
                        <p className="text-sm text-gray-600">{teacher.email}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm">{teacher.courses} courses</span>
                          <span className="text-sm">{teacher.students} students</span>
                          <div className="flex items-center space-x-1">
                            <span className="text-sm">Rating:</span>
                            <span className="text-sm font-medium text-yellow-600">
                              ⭐ {teacher.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Badge variant={teacher.status === 'active' ? 'default' : 'secondary'}>
                        {teacher.status}
                      </Badge>
                      
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Daily Active Users</span>
                  <span className="font-bold text-primary">892</span>
                </div>
                <Progress value={89} />
                
                <div className="flex justify-between items-center">
                  <span>Course Completion Rate</span>
                  <span className="font-bold text-accent">74%</span>
                </div>
                <Progress value={74} />
                
                <div className="flex justify-between items-center">
                  <span>Teacher Satisfaction</span>
                  <span className="font-bold text-green-600">4.7/5</span>
                </div>
                <Progress value={94} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">156</div>
                    <div className="text-sm text-gray-600">Total Courses</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">89%</div>
                    <div className="text-sm text-gray-600">Retention Rate</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">4.2k</div>
                    <div className="text-sm text-gray-600">Assignments</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">99.9%</div>
                    <div className="text-sm text-gray-600">Uptime</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
