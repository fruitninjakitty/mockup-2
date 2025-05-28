
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
  prerequisites?: string[];
  tier?: number;
}

interface LearningMapProps {
  courseTitle: string;
  modules: Module[];
  currentModuleId?: string;
  onModuleClick: (moduleId: string) => void;
  onBack: () => void;
}

// Algorithm to calculate module positions based on prerequisites and tiers
const calculateModulePositions = (modules: Module[]): Module[] => {
  // Create a copy of modules to avoid mutation
  const modulesWithPositions = [...modules];
  
  // Group modules by tier (level in the learning path)
  const tiers: { [key: number]: Module[] } = {};
  modulesWithPositions.forEach(module => {
    const tier = module.tier || 0;
    if (!tiers[tier]) tiers[tier] = [];
    tiers[tier].push(module);
  });

  const tierKeys = Object.keys(tiers).map(Number).sort((a, b) => a - b);
  const totalTiers = tierKeys.length;

  // Calculate positions for each tier
  tierKeys.forEach((tierNum, tierIndex) => {
    const modulesInTier = tiers[tierNum];
    const tierProgress = tierIndex / Math.max(1, totalTiers - 1);
    
    // X position based on tier progression (left to right)
    const baseX = 10 + (tierProgress * 80);
    
    // Y positions distributed vertically within the tier
    modulesInTier.forEach((module, moduleIndex) => {
      const moduleCount = modulesInTier.length;
      let yPosition;
      
      if (moduleCount === 1) {
        // Single module centered
        yPosition = 50;
      } else {
        // Multiple modules distributed with some randomness for organic feel
        const baseY = 20 + (moduleIndex / (moduleCount - 1)) * 60;
        const randomOffset = (Math.sin(parseInt(module.id) * 13.7) * 10); // Deterministic "randomness"
        yPosition = Math.max(15, Math.min(85, baseY + randomOffset));
      }
      
      // Add some horizontal variation for visual interest
      const xVariation = Math.cos(parseInt(module.id) * 7.3) * 8;
      const finalX = Math.max(5, Math.min(95, baseX + xVariation));
      
      module.position = { x: finalX, y: yPosition };
    });
  });

  return modulesWithPositions;
};

export const LearningMap = ({ 
  courseTitle, 
  modules: initialModules, 
  currentModuleId, 
  onModuleClick, 
  onBack 
}: LearningMapProps) => {
  const [zoom, setZoom] = useState(1);
  
  // Calculate positions using our algorithm
  const modules = calculateModulePositions(initialModules);

  const completedModules = modules.filter(m => m.completed).length;
  const progressPercentage = (completedModules / modules.length) * 100;

  const handleZoomIn = () => setZoom(Math.min(zoom + 0.2, 2));
  const handleZoomOut = () => setZoom(Math.max(zoom - 0.2, 0.5));
  const handleResetZoom = () => setZoom(1);

  // Create paths between connected modules based on prerequisites
  const renderConnections = () => {
    const connections: JSX.Element[] = [];
    
    modules.forEach((module) => {
      if (module.prerequisites) {
        module.prerequisites.forEach((prereqId) => {
          const prereqModule = modules.find(m => m.id === prereqId);
          if (prereqModule) {
            const isPathCompleted = prereqModule.completed;
            const connectionId = `connection-${prereqModule.id}-${module.id}`;
            
            connections.push(
              <line
                key={connectionId}
                x1={`${prereqModule.position.x}%`}
                y1={`${prereqModule.position.y}%`}
                x2={`${module.position.x}%`}
                y2={`${module.position.y}%`}
                stroke={isPathCompleted ? "#10b981" : "#d1d5db"}
                strokeWidth="2"
                strokeDasharray={isPathCompleted ? "0" : "6,3"}
                markerEnd="url(#arrowhead)"
              />
            );
          }
        });
      }
    });

    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="#d1d5db"
            />
          </marker>
        </defs>
        {connections}
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
                  <p className="text-gray-600 mt-1">Learning Path - {modules.length} modules across multiple learning paths</p>
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
            <div className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-lg overflow-hidden" style={{ height: '700px' }}>
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

              {/* Enhanced Legend */}
              <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-semibold mb-3">Legend</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="space-y-2">
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
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-2 bg-green-500"></div>
                      <span>Completed Path</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-2 bg-gray-300 border-dashed border"></div>
                      <span>Locked Path</span>
                    </div>
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
