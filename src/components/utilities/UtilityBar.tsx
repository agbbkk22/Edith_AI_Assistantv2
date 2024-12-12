import React from 'react';
import { 
  CheckSquare, 
  Calendar, 
  Mail,
  BrainCircuit,
  MessageSquare,
  Clock,
  ListTodo,
  Users,
  BarChart2
} from 'lucide-react';
import { UtilityPanelType } from '../../hooks/useUtilities';

interface UtilityBarProps {
  onUtilityClick: (panel: UtilityPanelType) => void;
  activePanel: UtilityPanelType;
}

export function UtilityBar({ onUtilityClick, activePanel }: UtilityBarProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
      <div className="grid grid-cols-4 gap-4">
        {/* Task Management */}
        <button
          onClick={() => onUtilityClick('tasks')}
          className={`
            flex flex-col items-center p-4 rounded-lg transition-colors group
            ${activePanel === 'tasks' ? 'bg-blue-50' : 'hover:bg-gray-50'}
          `}
        >
          <div className="flex items-center gap-2 mb-2">
            <CheckSquare className="text-blue-600" size={24} />
            <ListTodo className="text-blue-600" size={24} />
          </div>
          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
            Task Management
          </span>
          <span className="text-xs text-gray-500 text-center mt-1">
            Organize and prioritize tasks
          </span>
        </button>

        {/* Meeting & Schedule */}
        <button
          onClick={() => onUtilityClick('calendar')}
          className={`
            flex flex-col items-center p-4 rounded-lg transition-colors group
            ${activePanel === 'calendar' ? 'bg-blue-50' : 'hover:bg-gray-50'}
          `}
        >
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="text-blue-600" size={24} />
            <Users className="text-blue-600" size={24} />
          </div>
          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
            Meetings & Schedule
          </span>
          <span className="text-xs text-gray-500 text-center mt-1">
            Manage calendar and meetings
          </span>
        </button>

        {/* Email & Communication */}
        <button
          onClick={() => onUtilityClick('email')}
          className={`
            flex flex-col items-center p-4 rounded-lg transition-colors group
            ${activePanel === 'email' ? 'bg-blue-50' : 'hover:bg-gray-50'}
          `}
        >
          <div className="flex items-center gap-2 mb-2">
            <Mail className="text-blue-600" size={24} />
            <MessageSquare className="text-blue-600" size={24} />
          </div>
          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
            Email & Communication
          </span>
          <span className="text-xs text-gray-500 text-center mt-1">
            Handle emails and messages
          </span>
        </button>

        {/* Insights & Analytics */}
        <button
          onClick={() => onUtilityClick('insights')}
          className={`
            flex flex-col items-center p-4 rounded-lg transition-colors group
            ${activePanel === 'insights' ? 'bg-blue-50' : 'hover:bg-gray-50'}
          `}
        >
          <div className="flex items-center gap-2 mb-2">
            <BarChart2 className="text-blue-600" size={24} />
            <BrainCircuit className="text-blue-600" size={24} />
          </div>
          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
            Insights & Analytics
          </span>
          <span className="text-xs text-gray-500 text-center mt-1">
            View performance metrics
          </span>
        </button>
      </div>
    </div>
  );
}