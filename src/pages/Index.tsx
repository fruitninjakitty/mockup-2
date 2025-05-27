

import { useState } from 'react';
import { Header } from '@/components/Header';
import { StudentDashboard } from '@/components/StudentDashboard';
import { TeacherDashboard } from '@/components/TeacherDashboard';
import { AdminDashboard } from '@/components/AdminDashboard';

type UserRole = 'learner' | 'teacher' | 'ta' | 'admin';

const Index = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>('learner');

  const renderDashboard = () => {
    switch (currentRole) {
      case 'learner':
        return <StudentDashboard />;
      case 'teacher':
      case 'ta':
        return <TeacherDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onRoleChange={setCurrentRole}
        user={{
          name: 'Alex Chen',
          role: currentRole,
          league: 'gold',
          points: 2450
        }}
      />
      {renderDashboard()}
    </div>
  );
};

export default Index;

