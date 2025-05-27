
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Student {
  id: string;
  name: string;
  progress: number;
  lastActive: string;
  league: string;
  completedAssignments: number;
  totalAssignments: number;
}

interface Course {
  id: string;
  title: string;
  students: number;
  avgProgress: number;
  pendingAssignments: number;
}

export const TeacherDashboard = () => {
  const courses: Course[] = [
    {
      id: '1',
      title: 'Introduction to Computer Science',
      students: 24,
      avgProgress: 68,
      pendingAssignments: 8
    },
    {
      id: '2',
      title: 'Data Structures & Algorithms',
      students: 18,
      avgProgress: 45,
      pendingAssignments: 12
    },
    {
      id: '3',
      title: 'Web Development Fundamentals',
      students: 30,
      avgProgress: 82,
      pendingAssignments: 3
    }
  ];

  const students: Student[] = [
    {
      id: '1',
      name: 'Alex Johnson',
      progress: 75,
      lastActive: '2 hours ago',
      league: 'gold',
      completedAssignments: 8,
      totalAssignments: 10
    },
    {
      id: '2',
      name: 'Sarah Chen',
      progress: 92,
      lastActive: '30 minutes ago',
      league: 'sapphire',
      completedAssignments: 10,
      totalAssignments: 10
    },
    {
      id: '3',
      name: 'Mike Rodriguez',
      progress: 58,
      lastActive: '1 day ago',
      league: 'silver',
      completedAssignments: 6,
      totalAssignments: 10
    },
    {
      id: '4',
      name: 'Emma Thompson',
      progress: 89,
      lastActive: '4 hours ago',
      league: 'ruby',
      completedAssignments: 9,
      totalAssignments: 10
    }
  ];

  const getLeagueColor = (league: string) => {
    const colors = {
      bronze: 'bg-leagues-bronze',
      silver: 'bg-leagues-silver',
      gold: 'bg-leagues-gold',
      ruby: 'bg-leagues-ruby',
      sapphire: 'bg-leagues-sapphire'
    };
    return colors[league as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">Teacher Dashboard</h1>
        <p className="text-lg opacity-90">Monitor student progress and manage your courses</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">72</div>
            <div className="text-sm text-gray-600">Total Students</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-accent">3</div>
            <div className="text-sm text-gray-600">Active Courses</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-500">23</div>
            <div className="text-sm text-gray-600">Pending Reviews</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-500">68%</div>
            <div className="text-sm text-gray-600">Avg. Progress</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">Course Overview</TabsTrigger>
          <TabsTrigger value="students">Student Progress</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Course Cards */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Your Courses</h2>
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>
                      {course.students} students enrolled
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Average Progress</span>
                        <span className="font-medium">{course.avgProgress}%</span>
                      </div>
                      <Progress value={course.avgProgress} />
                      
                      <div className="flex justify-between items-center pt-2">
                        <Badge variant="outline" className="text-orange-600 border-orange-600">
                          {course.pendingAssignments} pending reviews
                        </Badge>
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
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Quick Actions</h2>
              <Card>
                <CardContent className="p-4 space-y-3">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Create New Course
                  </Button>
                  <Button variant="outline" className="w-full">
                    Add Course Module
                  </Button>
                  <Button variant="outline" className="w-full">
                    Create Assignment
                  </Button>
                  <Button variant="outline" className="w-full">
                    Schedule Assessment
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <div className="font-medium">Sarah Chen</div>
                    <div className="text-gray-600">Completed "Functions in Programming"</div>
                    <div className="text-xs text-gray-500">30 minutes ago</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Mike Rodriguez</div>
                    <div className="text-gray-600">Submitted assignment "Data Types"</div>
                    <div className="text-xs text-gray-500">2 hours ago</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Emma Thompson</div>
                    <div className="text-gray-600">Earned "Quiz Master" achievement</div>
                    <div className="text-xs text-gray-500">4 hours ago</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Progress Overview</CardTitle>
              <CardDescription>
                Monitor individual student performance across all courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-gray-600">
                          Last active: {student.lastActive}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">{student.progress}% Complete</div>
                        <div className="text-xs text-gray-600">
                          {student.completedAssignments}/{student.totalAssignments} assignments
                        </div>
                      </div>
                      
                      <Progress value={student.progress} className="w-20" />
                      
                      <Badge className={`${getLeagueColor(student.league)} text-white`}>
                        {student.league.toUpperCase()}
                      </Badge>
                      
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
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
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Course Completion Rate</span>
                    <span className="font-bold text-primary">73%</span>
                  </div>
                  <Progress value={73} />
                  
                  <div className="flex justify-between items-center">
                    <span>Assignment Submission Rate</span>
                    <span className="font-bold text-accent">89%</span>
                  </div>
                  <Progress value={89} />
                  
                  <div className="flex justify-between items-center">
                    <span>Student Engagement</span>
                    <span className="font-bold text-green-600">81%</span>
                  </div>
                  <Progress value={81} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Class Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">4.2</div>
                    <div className="text-sm text-gray-600">Avg. Grade</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">92%</div>
                    <div className="text-sm text-gray-600">Attendance</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">156</div>
                    <div className="text-sm text-gray-600">Total Hours</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">24</div>
                    <div className="text-sm text-gray-600">Active Students</div>
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
