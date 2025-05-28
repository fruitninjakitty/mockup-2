
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { X, CheckCircle, Lock, BookOpen, FileText, Code } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  type: 'lesson' | 'quiz' | 'project';
  completed: boolean;
  locked: boolean;
}

interface LessonSidebarProps {
  modules: Module[];
  currentModuleIndex: number;
  onModuleSelect: (index: number) => void;
  onClose: () => void;
}

export const LessonSidebar = ({ modules, currentModuleIndex, onModuleSelect, onClose }: LessonSidebarProps) => {
  const completedCount = modules.filter(m => m.completed).length;
  const progress = (completedCount / modules.length) * 100;

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'lesson':
        return BookOpen;
      case 'quiz':
        return FileText;
      case 'project':
        return Code;
      default:
        return BookOpen;
    }
  };

  const getModuleIconColor = (module: Module, isActive: boolean) => {
    if (module.completed) return 'text-green-600';
    if (module.locked) return 'text-gray-400';
    if (isActive) return 'text-primary';
    return 'text-gray-600';
  };

  return (
    <div className="w-80 bg-white border-r h-screen overflow-y-auto">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Course Modules</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{completedCount}/{modules.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="p-4 space-y-2">
        {modules.map((module, index) => {
          const Icon = getModuleIcon(module.type);
          const isActive = index === currentModuleIndex;
          const isClickable = !module.locked;

          return (
            <div
              key={module.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                isActive 
                  ? 'bg-primary/10 border-primary' 
                  : isClickable 
                    ? 'hover:bg-gray-50 border-gray-200' 
                    : 'border-gray-200 cursor-not-allowed opacity-60'
              }`}
              onClick={() => isClickable && onModuleSelect(index)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {module.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : module.locked ? (
                    <Lock className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Icon className={`w-5 h-5 ${getModuleIconColor(module, isActive)}`} />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className={`text-sm font-medium truncate ${
                      isActive ? 'text-primary' : 'text-gray-900'
                    }`}>
                      {module.title}
                    </h4>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={module.type === 'quiz' ? 'secondary' : 'outline'} 
                      className="text-xs"
                    >
                      {module.type}
                    </Badge>
                    
                    {module.completed && (
                      <span className="text-xs text-green-600">Completed</span>
                    )}
                    
                    {module.locked && (
                      <span className="text-xs text-gray-400">Locked</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
