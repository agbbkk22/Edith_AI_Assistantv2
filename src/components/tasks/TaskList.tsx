import React from 'react';
import { Task } from '../../types/task';
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';
import { suggestTaskOrder } from '../../utils/taskPrioritization';

interface TaskListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export function TaskList({ tasks, onTaskClick }: TaskListProps) {
  const orderedTasks = suggestTaskOrder(tasks);

  const getPriorityIcon = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return <AlertCircle size={16} className="text-red-500" />;
      case 'medium':
        return <Clock size={16} className="text-yellow-500" />;
      case 'low':
        return <Clock size={16} className="text-blue-500" />;
    }
  };

  return (
    <div className="space-y-2">
      {orderedTasks.map(task => (
        <div
          key={task.id}
          onClick={() => onTaskClick(task)}
          className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          {task.status === 'completed' ? (
            <CheckCircle2 size={20} className="text-green-500" />
          ) : (
            <Circle size={20} className="text-gray-400" />
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{task.title}</h3>
              {getPriorityIcon(task.priority)}
            </div>
            {task.deadline && (
              <p className="text-sm text-gray-500">
                Due: {task.deadline.toLocaleDateString()}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            {task.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}