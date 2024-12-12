import React, { useState, useEffect } from 'react';
import { Task, TaskPriority, TaskStatus } from '../../types/task';
import { X } from 'lucide-react';
import { categorizeTask } from '../../utils/taskCategorization';
import { TaskCategorySuggestions } from './TaskCategorySuggestions';
import { CategorySuggestion, TaskCategory } from '../../types/taskCategory';

interface TaskModalProps {
  task?: Task;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id' | 'createdAt'>) => void;
}

export function TaskModal({ task, onClose, onSave }: TaskModalProps) {
  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [priority, setPriority] = useState<TaskPriority>(task?.priority ?? 'medium');
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? 'todo');
  const [deadline, setDeadline] = useState(task?.deadline?.toISOString().split('T')[0] ?? '');
  const [tags, setTags] = useState(task?.tags.join(', ') ?? '');
  const [estimatedMinutes, setEstimatedMinutes] = useState(task?.estimatedMinutes?.toString() ?? '');
  const [suggestions, setSuggestions] = useState<CategorySuggestion[]>([]);

  useEffect(() => {
    if (title || description || tags) {
      const dummyTask: Task = {
        id: '',
        title,
        description,
        priority,
        status,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        createdAt: new Date(),
      };
      setSuggestions(categorizeTask(dummyTask));
    }
  }, [title, description, tags]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      description,
      priority,
      status,
      deadline: deadline ? new Date(deadline) : undefined,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      estimatedMinutes: estimatedMinutes ? parseInt(estimatedMinutes, 10) : undefined,
    });
    onClose();
  };

  const handleCategorySuggestion = (suggestion: CategorySuggestion) => {
    const newTags = new Set([
      ...tags.split(',').map(tag => tag.trim()).filter(Boolean),
      suggestion.category
    ]);
    setTags(Array.from(newTags).join(', '));
    
    // Set deadline based on suggested time slot if no deadline is set
    if (!deadline) {
      const suggestedDate = new Date();
      const preferredDay = suggestion.suggestedTimeSlot.preferredDays[0];
      const currentDay = suggestedDate.getDay();
      const daysToAdd = preferredDay < currentDay ? 
        7 - (currentDay - preferredDay) : 
        preferredDay - currentDay;
      
      suggestedDate.setDate(suggestedDate.getDate() + daysToAdd);
      setDeadline(suggestedDate.toISOString().split('T')[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">
            {task ? 'Edit Task' : 'New Task'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tags</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Comma-separated tags"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {task ? 'Update Task' : 'Create Task'}
            </button>
          </form>

          <div className="border-l pl-4">
            <TaskCategorySuggestions
              suggestions={suggestions}
              onSelectCategory={handleCategorySuggestion}
            />
          </div>
        </div>
      </div>
    </div>
  );
}