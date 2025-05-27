import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Trophy } from 'lucide-react';

interface User {
  name: string;
  role: 'learner' | 'teacher' | 'ta' | 'admin';
  league: 'bronze' | 'silver' | 'gold' | 'ruby' | 'sapphire';
  points: number;
}

interface HeaderProps {
  user?: User;
  onRoleChange: (role: User['role']) => void;
}

export const Header = ({ user, onRoleChange }: HeaderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  const mockUser: User = {
    name: 'Alex Johnson',
    role: 'learner',
    league: 'gold',
    points: 2450
  };

  const currentUser = user || mockUser;

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

  const getRoleDisplay = (role: string) => {
    const roles = {
      learner: 'Student',
      teacher: 'Teacher',
      ta: 'Teaching Assistant',
      admin: 'Administrator'
    };
    return roles[role as keyof typeof roles];
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-primary">EduQuest</h1>
          <Badge variant="outline" className="text-accent border-accent">
            Learning Platform
          </Badge>
        </div>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">{currentUser.points}</span>
                <Badge className={`${getLeagueColor(currentUser.league)} text-white text-xs`}>
                  {currentUser.league.toUpperCase()}
                </Badge>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback>{currentUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <div className="text-sm font-medium">{currentUser.name}</div>
                      <div className="text-xs text-gray-500">{getRoleDisplay(currentUser.role)}</div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => onRoleChange('learner')}>
                    Switch to Student View
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onRoleChange('teacher')}>
                    Switch to Teacher View
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onRoleChange('ta')}>
                    Switch to TA View
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onRoleChange('admin')}>
                    Switch to Admin View
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline">Login</Button>
              <Button className="bg-primary hover:bg-primary/90">Sign Up</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
