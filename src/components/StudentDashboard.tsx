import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CourseMap } from './CourseMap';
import { Trophy } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  progress: number;
  modules: any[];
  lastAccessed: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  earned: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export const StudentDashboard = () => {
  const courses: Course[] = [
    {
      id: '1',
      title: 'Introduction to Computer Science',
      progress: 75,
      modules: [
        { id: '1', title: 'Variables', x: 20, y: 20, completed: true, locked: false, type: 'lesson' },
        { id: '2', title: 'Loops', x: 40, y: 30, completed: true, locked: false, type: 'lesson' },
        { id: '3', title: 'Functions', x: 60, y: 25, completed: true, locked: false, type: 'quiz' },
        { id: '4', title: 'Arrays', x: 80, y: 40, completed: false, locked: false, type: 'lesson' },
        { id: '5', title: 'Final Project', x: 90, y: 60, completed: false, locked: true, type: 'project' }
      ],
      lastAccessed: '2 hours ago'
    },
    {
      id: '2',
      title: 'Data Structures & Algorithms',
      progress: 30,
      modules: [
        { id: '1', title: 'Big O', x: 15, y: 25, completed: true, locked: false, type: 'lesson' },
        { id: '2', title: 'Stacks', x: 35, y: 35, completed: false, locked: false, type: 'lesson' },
        { id: '3', title: 'Queues', x: 55, y: 30, completed: false, locked: true, type: 'quiz' }
      ],
      lastAccessed: '1 day ago'
    }
  ];

  const achievements: Achievement[] = [
    { id: '1', title: 'First Steps', description: 'Complete your first module', earned: true, rarity: 'common' },
    { id: '2', title: 'Quiz Master', description: 'Score 100% on 5 quizzes', earned: true, rarity: 'rare' },
    { id: '3', title: 'Speed Runner', description: 'Complete a course in under a week', earned: false, rarity: 'epic' },
    { id: '4', title: 'Perfectionist', description: 'Achieve 100% in all modules', earned: false, rarity: 'legendary' }
  ];

  const friends = [
    { name: 'Sarah Chen', progress: 85, league: 'sapphire' },
    { name: 'Mike Rodriguez', progress: 70, league: 'gold' },
    { name: 'Emma Thompson', progress: 92, league: 'ruby' }
  ];

  const getLeagueColor = (league: string) => {
    const colors = {
      bronze: 'text-leagues-bronze',
      silver: 'text-leagues-silver',
      gold: 'text-leagues-gold',
      ruby: 'text-leagues-ruby',
      sapphire: 'text-leagues-sapphire'
    };
    return colors[league as keyof typeof colors] || 'text-gray-500';
  };

  const getRarityColor = (rarity: string) => {
    const colors = {
      common: 'border-gray-300 text-gray-600',
      rare: 'border-blue-300 text-blue-600',
      epic: 'border-purple-300 text-purple-600',
      legendary: 'border-yellow-300 text-yellow-600'
    };
    return colors[rarity as keyof typeof colors] || 'border-gray-300 text-gray-600';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-accent text-white rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Alex!</h1>
        <p className="text-lg opacity-90">Ready to continue your learning journey?</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Your Courses</CardTitle>
              <CardDescription>Continue where you left off</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{course.title}</h3>
                      <p className="text-sm text-gray-500">Last accessed: {course.lastAccessed}</p>
                    </div>
                    <Badge variant="outline" className="text-primary border-primary">
                      {course.progress}% Complete
                    </Badge>
                  </div>
                  <Progress value={course.progress} className="mb-3" />
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Continue Learning
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Course Map Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Course Map - Introduction to Computer Science</CardTitle>
              <CardDescription>Navigate through your learning path</CardDescription>
            </CardHeader>
            <CardContent>
              <CourseMap
                courseTitle="Introduction to Computer Science"
                modules={courses[0].modules}
                playerPosition={{ x: 65, y: 35 }}
                onModuleClick={(module) => console.log('Module clicked:', module)}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-3 border rounded-lg ${getRarityColor(achievement.rarity)} ${
                    achievement.earned ? 'bg-green-50' : 'opacity-50'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">{achievement.earned ? '🏆' : '🔒'}</span>
                    <span className="font-medium text-sm">{achievement.title}</span>
                  </div>
                  <p className="text-xs text-gray-600">{achievement.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Friends Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Friends' Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {friends.map((friend, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium text-sm">{friend.name}</div>
                    <div className={`text-xs font-semibold ${getLeagueColor(friend.league)}`}>
                      {friend.league.toUpperCase()} LEAGUE
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{friend.progress}%</div>
                    <Progress value={friend.progress} className="w-16 h-2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
