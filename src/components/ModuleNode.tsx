
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Lock, BookOpen, FileText, Code, Trophy } from 'lucide-react';

interface ModuleNodeProps {
  module: {
    id: string;
    title: string;
    type: 'lesson' | 'quiz' | 'project' | 'achievement';
    completed: boolean;
    locked: boolean;
    current?: boolean;
  };
  position: { x: number; y: number };
  onClick: () => void;
}

export const ModuleNode = ({ module, position, onClick }: ModuleNodeProps) => {
  const getModuleIcon = () => {
    switch (module.type) {
      case 'lesson':
        return BookOpen;
      case 'quiz':
        return FileText;
      case 'project':
        return Code;
      case 'achievement':
        return Trophy;
      default:
        return BookOpen;
    }
  };

  const getModuleStyle = () => {
    if (module.completed) {
      return 'bg-green-500 text-white border-green-600';
    }
    if (module.current) {
      return 'bg-blue-500 text-white border-blue-600 ring-4 ring-blue-200';
    }
    if (module.locked) {
      return 'bg-gray-300 text-gray-500 border-gray-400';
    }
    return 'bg-white text-gray-700 border-gray-300 hover:border-gray-400';
  };

  const Icon = getModuleIcon();

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
    >
      <Button
        variant="ghost"
        className="p-0 h-auto"
        onClick={onClick}
        disabled={module.locked}
      >
        <div className="flex flex-col items-center">
          <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all ${getModuleStyle()}`}>
            {module.completed ? (
              <CheckCircle className="w-8 h-8" />
            ) : module.locked ? (
              <Lock className="w-8 h-8" />
            ) : (
              <Icon className="w-8 h-8" />
            )}
          </div>
          
          <div className="mt-2 text-center">
            <div className="text-sm font-medium max-w-20 truncate">
              {module.title}
            </div>
            <Badge 
              variant={module.type === 'achievement' ? 'secondary' : 'outline'} 
              className="text-xs mt-1"
            >
              {module.type}
            </Badge>
          </div>
        </div>
      </Button>
    </div>
  );
};
