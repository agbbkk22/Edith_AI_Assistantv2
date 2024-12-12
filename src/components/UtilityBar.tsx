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

interface UtilityBarProps {
  onTaskClick: () => void;
  onCalendarClick: () => void;
  onEmailClick: () => void;
  onInsightsClick: () => void;
}

export function UtilityBar({ 
  onTaskClick, 
  onCalendarClick, 
  onEmailClick,
  onInsightsClick 
}: UtilityBarProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
      <div className="grid grid-cols-4 gap-4">
        {/* Task Management */}
        <button
          onClick={onTaskClick}
          className="flex flex-col items-center p-4 rounded-lg hover:bg-blue-50 transition-colors group"
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
          onClick={onCalendarClick}
          className="flex flex-col items-center p-4 rounded-lg hover:bg-blue-50 transition-colors group"
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
          onClick={onEmailClick}
          className="flex flex-col items-center p-4 rounded-lg hover:bg-blue-50 transition-colors group"
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
          onClick={onInsightsClick}
          className="flex flex-col items-center p-4 rounded-lg hover:bg-blue-50 transition-colors group"
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