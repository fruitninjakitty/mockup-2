
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { ModuleNode } from './ModuleNode';

interface Module {
  id: string;
  title: string;
  type: 'lesson' | 'quiz' | 'project' | 'achievement';
  completed: boolean;
  locked: boolean;
  position: { x: number; y: number };
}

interface LearningMapProps {
  courseTitle: string;
  modules: Module[];
  currentModuleId?: string;
  onModuleClick: (moduleId: string) => void;
  onBack: () => void;
}

export const LearningMap = ({ 
  courseTitle, 
  modules, 
  currentModuleId, 
  onModuleClick, 
  onBack 
}: LearningMapProps) => {
  const [zoom, setZoom] = useState(1);

  const completedModules = modules.filter(m => m.completed).length;
  const progressPercentage = (completedModules / modules.length) * 100;

  const handleZoomIn = () => setZoom(Math.min(zoom + 0.2, 2));
  const handleZoomOut = () => setZoom(Math.max(zoom - 0.2, 0.5));
  const handleResetZoom = () => setZoom(1);

  // Create paths between connected modules
  const renderConnections = () => {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        {modules.map((module, index) => {
          const nextModule = modules[index + 1];
          if (!nextModule) return null;
          
          const isCompleted = module.completed;
          
          return (
            <line
              key={`connection-${module.id}-${nextModule.id}`}
              x1={`${module.position.x}%`}
              y1={`${module.position.y}%`}
              x2={`${nextModule.position.x}%`}
              y2={`${nextModule.position.y}%`}
              stroke={isCompleted ? "#10b981" : "#d1d5db"}
              strokeWidth="3"
              strokeDasharray={isCompleted ? "0" : "8,4"}
            />
          );
        })}
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Dashboard</span>
                </Button>
                <div>
                  <CardTitle className="text-2xl">{courseTitle}</CardTitle>
                  <p className="text-gray-600 mt-1">Learning Path</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-gray-600">Progress</div>
                  <div className="text-lg font-semibold">{completedModules}/{modules.length} modules</div>
                </div>
                <div className="w-32">
                  <Progress value={progressPercentage} className="h-3" />
                </div>
                <Badge variant="outline" className="text-primary border-primary">
                  {Math.round(progressPercentage)}% Complete
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Learning Map */}
        <Card>
          <CardContent className="p-0">
            <div className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-lg overflow-hidden" style={{ height: '600px' }}>
              {/* Zoom Controls */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
                <Button size="sm" variant="outline" onClick={handleZoomIn} className="bg-white">
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleZoomOut} className="bg-white">
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleResetZoom} className="bg-white">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>

              {/* Map Content */}
              <div 
                className="relative w-full h-full transition-transform duration-300"
                style={{ transform: `scale(${zoom})` }}
              >
                {/* Connection Lines */}
                {renderConnections()}
                
                {/* Module Nodes */}
                <div className="relative w-full h-full" style={{ zIndex: 2 }}>
                  {modules.map((module) => (
                    <ModuleNode
                      key={module.id}
                      module={{
                        ...module,
                        current: module.id === currentModuleId
                      }}
                      position={module.position}
                      onClick={() => !module.locked && onModuleClick(module.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-semibold mb-3">Legend</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span>Completed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full ring-2 ring-blue-200"></div>
                    <span>Current</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                    <span>Locked</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
