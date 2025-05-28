import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CourseMap } from './CourseMap';
import { LessonView } from './LessonView';
import { LearningMap } from './LearningMap';
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
  const [currentView, setCurrentView] = useState<'dashboard' | 'lesson' | 'map'>('dashboard');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  const courses: Course[] = [
    {
      id: '1',
      title: 'Introduction to Computer Science',
      progress: 45,
      modules: [
        // Tier 0 - Foundation
        { 
          id: '1', 
          title: 'Programming Basics', 
          completed: true, 
          locked: false, 
          type: 'lesson',
          tier: 0,
          prerequisites: []
        },
        { 
          id: '2', 
          title: 'Variables & Types', 
          completed: true, 
          locked: false, 
          type: 'lesson',
          tier: 0,
          prerequisites: ['1']
        },
        
        // Tier 1 - Control Structures
        { 
          id: '3', 
          title: 'Conditionals', 
          completed: true, 
          locked: false, 
          type: 'lesson',
          tier: 1,
          prerequisites: ['2']
        },
        { 
          id: '4', 
          title: 'Loops', 
          completed: true, 
          locked: false, 
          type: 'lesson',
          tier: 1,
          prerequisites: ['2']
        },
        { 
          id: '5', 
          title: 'Control Flow Quiz', 
          completed: false, 
          locked: false, 
          type: 'quiz',
          tier: 1,
          prerequisites: ['3', '4']
        },
        
        // Tier 2 - Functions & Data
        { 
          id: '6', 
          title: 'Functions', 
          completed: false, 
          locked: false, 
          type: 'lesson',
          tier: 2,
          prerequisites: ['5']
        },
        { 
          id: '7', 
          title: 'Arrays', 
          completed: false, 
          locked: true, 
          type: 'lesson',
          tier: 2,
          prerequisites: ['6']
        },
        { 
          id: '8', 
          title: 'Strings', 
          completed: false, 
          locked: true, 
          type: 'lesson',
          tier: 2,
          prerequisites: ['6']
        },
        { 
          id: '9', 
          title: 'Data Structures Quiz', 
          completed: false, 
          locked: true, 
          type: 'quiz',
          tier: 2,
          prerequisites: ['7', '8']
        },
        
        // Tier 3 - Advanced Concepts
        { 
          id: '10', 
          title: 'Object-Oriented Programming', 
          completed: false, 
          locked: true, 
          type: 'lesson',
          tier: 3,
          prerequisites: ['9']
        },
        { 
          id: '11', 
          title: 'Recursion', 
          completed: false, 
          locked: true, 
          type: 'lesson',
          tier: 3,
          prerequisites: ['9']
        },
        { 
          id: '12', 
          title: 'File I/O', 
          completed: false, 
          locked: true, 
          type: 'lesson',
          tier: 3,
          prerequisites: ['10']
        },
        
        // Tier 4 - Projects & Assessment
        { 
          id: '13', 
          title: 'Mini Project: Calculator', 
          completed: false, 
          locked: true, 
          type: 'project',
          tier: 4,
          prerequisites: ['10', '11']
        },
        { 
          id: '14', 
          title: 'Final Project: Game Development', 
          completed: false, 
          locked: true, 
          type: 'project',
          tier: 4,
          prerequisites: ['12', '13']
        },
        { 
          id: '15', 
          title: 'Final Assessment', 
          completed: false, 
          locked: true, 
          type: 'quiz',
          tier: 4,
          prerequisites: ['14']
        },
        
        // Tier 5 - Achievement
        {
          id: '16',
          title: 'CS Master',
          completed: false,
          locked: true,
          type: 'achievement',
          tier: 5,
          prerequisites: ['15']
        }
      ],
      lastAccessed: '2 hours ago'
    },
    {
      id: '2',
      title: 'Data Structures & Algorithms',
      progress: 25,
      modules: [
        // Tier 0 - Foundation
        { 
          id: '1', 
          title: 'Algorithm Analysis', 
          completed: true, 
          locked: false, 
          type: 'lesson',
          tier: 0,
          prerequisites: []
        },
        { 
          id: '2', 
          title: 'Big O Notation', 
          completed: true, 
          locked: false, 
          type: 'lesson',
          tier: 0,
          prerequisites: ['1']
        },
        
        // Tier 1 - Linear Data Structures
        { 
          id: '3', 
          title: 'Arrays & Lists', 
          completed: false, 
          locked: false, 
          type: 'lesson',
          tier: 1,
          prerequisites: ['2']
        },
        { 
          id: '4', 
          title: 'Stacks', 
          completed: false, 
          locked: true, 
          type: 'lesson',
          tier: 1,
          prerequisites: ['3']
        },
        { 
          id: '5', 
          title: 'Queues', 
          completed: false, 
          locked: true, 
          type: 'lesson',
          tier: 1,
          prerequisites: ['3']
        },
        { 
          id: '6', 
          title: 'Linear Structures Quiz', 
          completed: false, 
          locked: true, 
          type: 'quiz',
          tier: 1,
          prerequisites: ['4', '5']
        },
        
        // Tier 2 - Tree Structures
        { 
          id: '7', 
          title: 'Binary Trees', 
          completed: false, 
          locked: true, 
          type: 'lesson',
          tier: 2,
          prerequisites: ['6']
        },
        { 
          id: '8', 
          title: 'Binary Search Trees', 
          completed: false, 
          locked: true, 
          type: 'lesson',
          tier: 2,
          prerequisites: ['7']
        },
        { 
          id: '9', 
          title: 'Tree Traversal', 
          completed: false, 
          locked: true, 
          type: 'lesson',
          tier: 2,
          prerequisites: ['8']
        },
        
        // Tier 3 - Advanced Structures
        { 
          id: '10', 
          title: 'Hash Tables', 
          completed: false, 
          locked: true, 
          type: 'lesson',
          tier: 3,
          prerequisites: ['9']
        },
        { 
          id: '11', 
          title: 'Graphs', 
          completed: false, 
          locked: true, 
          type: 'lesson',
          tier: 3,
          prerequisites: ['9']
        },
        { 
          id: '12', 
          title: 'Advanced Algorithms', 
          completed: false, 
          locked: true, 
          type: 'lesson',
          tier: 3,
          prerequisites: ['10', '11']
        },
        
        // Tier 4 - Final Assessment
        {
          id: '13',
          title: 'DSA Master',
          completed: false,
          locked: true,
          type: 'achievement',
          tier: 4,
          prerequisites: ['12']
        }
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

  const handleContinueLearning = (course: Course) => {
    setSelectedCourse(course);
    setCurrentView('map');
  };

  const handleModuleClick = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setCurrentView('lesson');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedCourse(null);
    setSelectedModuleId(null);
  };

  const handleBackToMap = () => {
    setCurrentView('map');
    setSelectedModuleId(null);
  };

  if (currentView === 'lesson' && selectedCourse && selectedModuleId) {
    const moduleIndex = selectedCourse.modules.findIndex(m => m.id === selectedModuleId);
    return (
      <LessonView
        courseTitle={selectedCourse.title}
        modules={selectedCourse.modules}
        initialModuleIndex={moduleIndex >= 0 ? moduleIndex : 0}
        onBack={handleBackToMap}
      />
    );
  }

  if (currentView === 'map' && selectedCourse) {
    return (
      <LearningMap
        courseTitle={selectedCourse.title}
        modules={selectedCourse.modules}
        currentModuleId={selectedModuleId || selectedCourse.modules.find(m => !m.completed && !m.locked)?.id}
        onModuleClick={handleModuleClick}
        onBack={handleBackToDashboard}
      />
    );
  }

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
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => handleContinueLearning(course)}
                  >
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
