
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Module {
  id: string;
  title: string;
  x: number;
  y: number;
  completed: boolean;
  locked: boolean;
  type: 'lesson' | 'quiz' | 'project' | 'checkpoint';
}

interface CourseMapProps {
  courseTitle: string;
  modules: Module[];
  playerPosition: { x: number; y: number };
  onModuleClick: (module: Module) => void;
}

export const CourseMap = ({ courseTitle, modules, playerPosition, onModuleClick }: CourseMapProps) => {
  const [mapScale, setMapScale] = useState(1);

  const getModuleIcon = (type: string, completed: boolean) => {
    const baseClasses = "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm";
    
    if (completed) {
      return `${baseClasses} bg-primary`;
    }
    
    switch (type) {
      case 'lesson':
        return `${baseClasses} bg-blue-500`;
      case 'quiz':
        return `${baseClasses} bg-accent`;
      case 'project':
        return `${baseClasses} bg-purple-500`;
      case 'checkpoint':
        return `${baseClasses} bg-orange-500`;
      default:
        return `${baseClasses} bg-gray-500`;
    }
  };

  const completedModules = modules.filter(m => m.completed).length;
  const progressPercentage = (completedModules / modules.length) * 100;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{courseTitle}</h2>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{completedModules}/{modules.length} modules</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          <Badge variant="outline" className="text-primary border-primary">
            {Math.round(progressPercentage)}% Complete
          </Badge>
        </div>
      </div>

      <div className="relative bg-white rounded-lg border-2 border-gray-200 h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-100 to-purple-100"
          style={{ transform: `scale(${mapScale})` }}
        >
          {/* Player Position */}
          <div 
            className="absolute w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg z-20 animate-pulse"
            style={{ 
              left: `${playerPosition.x}%`, 
              top: `${playerPosition.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="w-full h-full bg-red-400 rounded-full"></div>
          </div>

          {/* Path connections */}
          <svg className="absolute inset-0 w-full h-full z-0">
            {modules.map((module, index) => {
              const nextModule = modules[index + 1];
              if (!nextModule) return null;
              
              return (
                <line
                  key={`path-${module.id}`}
                  x1={`${module.x}%`}
                  y1={`${module.y}%`}
                  x2={`${nextModule.x}%`}
                  y2={`${nextModule.y}%`}
                  stroke={module.completed ? "#43BC88" : "#E5E7EB"}
                  strokeWidth="3"
                  strokeDasharray={module.completed ? "0" : "5,5"}
                />
              );
            })}
          </svg>

          {/* Modules */}
          {modules.map((module) => (
            <div
              key={module.id}
              className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${module.x}%`, top: `${module.y}%` }}
            >
              <Button
                variant="ghost"
                className="p-0 h-auto hover:scale-110 transition-transform"
                onClick={() => onModuleClick(module)}
                disabled={module.locked}
              >
                <div className="flex flex-col items-center">
                  <div className={getModuleIcon(module.type, module.completed)}>
                    {module.completed ? '✓' : module.id}
                  </div>
                  <span className="text-xs mt-1 text-gray-700 bg-white px-2 py-1 rounded shadow-sm">
                    {module.title}
                  </span>
                  {module.locked && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">🔒</span>
                    </div>
                  )}
                </div>
              </Button>
            </div>
          ))}
        </div>

        {/* Map Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setMapScale(Math.min(mapScale + 0.1, 2))}
            className="bg-white"
          >
            +
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setMapScale(Math.max(mapScale - 0.1, 0.5))}
            className="bg-white"
          >
            -
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span>Lesson</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-accent rounded-full"></div>
          <span>Quiz</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
          <span>Project</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
          <span>Checkpoint</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-primary rounded-full"></div>
          <span>Completed</span>
        </div>
      </div>
    </div>
  );
};
