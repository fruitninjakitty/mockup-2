import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle } from 'lucide-react';
import { LessonSidebar } from './LessonSidebar';
import { QuizView } from './QuizView';

interface Module {
  id: string;
  title: string;
  type: 'lesson' | 'quiz' | 'project';
  completed: boolean;
  locked: boolean;
  content?: string;
  videoUrl?: string;
  quiz?: any;
}

interface LessonViewProps {
  courseTitle: string;
  modules: Module[];
  initialModuleIndex?: number;
  onBack: () => void;
}

export const LessonView = ({ courseTitle, modules, initialModuleIndex = 0, onBack }: LessonViewProps) => {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(initialModuleIndex);
  const [showSidebar, setShowSidebar] = useState(true);
  
  const currentModule = modules[currentModuleIndex];
  const progress = (modules.filter(m => m.completed).length / modules.length) * 100;

  const handleNextModule = () => {
    if (currentModuleIndex < modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
    }
  };

  const handlePreviousModule = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
    }
  };

  const handleModuleSelect = (index: number) => {
    setCurrentModuleIndex(index);
  };

  const markAsComplete = () => {
    // In a real app, this would update the backend
    console.log('Marking module as complete:', currentModule.id);
  };

  const renderModuleContent = () => {
    if (currentModule.type === 'quiz') {
      return (
        <QuizView
          quizData={{
            question: "What is a variable in programming?",
            options: [
              "A container for storing data values",
              "A type of loop",
              "A function that returns nothing",
              "A way to import libraries"
            ],
            correctAnswer: 0,
            explanation: "A variable is a container for storing data values. It can hold different types of data like numbers, strings, or booleans."
          }}
          onComplete={markAsComplete}
        />
      );
    }

    return (
      <div className="space-y-6">
        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold mb-4">{currentModule.title}</h2>
          
          {currentModule.videoUrl && (
            <div className="aspect-video bg-gray-900 rounded-lg mb-6 flex items-center justify-center">
              <div className="text-white text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm opacity-75">Video content would load here</p>
              </div>
            </div>
          )}

          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              Welcome to this lesson on <strong>{currentModule.title}</strong>. In this module, you'll learn 
              fundamental concepts that will build the foundation for your programming journey.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6">Key Concepts</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Understanding the basic syntax and structure</li>
              <li>Practical examples and use cases</li>
              <li>Common mistakes to avoid</li>
              <li>Best practices for implementation</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6">Example</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <code className="text-sm">
                {currentModule.title === 'Variables' && `
let message = "Hello, World!";
let count = 42;
let isActive = true;
                `}
                {currentModule.title === 'Loops' && `
for (let i = 0; i < 5; i++) {
  console.log("Iteration: " + i);
}
                `}
                {currentModule.title === 'Functions' && `
function greet(name) {
  return "Hello, " + name + "!";
}
                `}
              </code>
            </div>

            <p>
              Practice these concepts in the exercises below and don't hesitate to experiment 
              with the code examples. Learning by doing is the best way to master programming!
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t">
          <Button 
            variant="outline" 
            onClick={markAsComplete}
            className="flex items-center space-x-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Mark as Complete</span>
          </Button>
          
          <div className="text-sm text-gray-500">
            Estimated time: 15 minutes
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      {showSidebar && (
        <LessonSidebar
          modules={modules}
          currentModuleIndex={currentModuleIndex}
          onModuleSelect={handleModuleSelect}
          onClose={() => setShowSidebar(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Map</span>
              </Button>
              
              {!showSidebar && (
                <Button variant="outline" onClick={() => setShowSidebar(true)}>
                  Show Modules
                </Button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium">{courseTitle}</div>
                <div className="text-xs text-gray-500">
                  Module {currentModuleIndex + 1} of {modules.length}
                </div>
              </div>
              <div className="w-32">
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Badge variant={currentModule.type === 'quiz' ? 'secondary' : 'default'}>
                  {currentModule.type.toUpperCase()}
                </Badge>
                {currentModule.completed && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Completed
                  </Badge>
                )}
              </div>
            </div>

            <Card>
              <CardContent className="p-8">
                {renderModuleContent()}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                onClick={handlePreviousModule}
                disabled={currentModuleIndex === 0}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              <Button 
                onClick={handleNextModule}
                disabled={currentModuleIndex === modules.length - 1}
                className="flex items-center space-x-2"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
