import { useState } from 'react';
import { Task, TaskState } from '../types/task';

export function useTasks() {
  const [taskState, setTaskState] = useState<TaskState>({
    tasks: [],
    isTaskModalOpen: false,
    selectedTask: null,
  });

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTaskState(prev => ({
      ...prev,
      tasks: [...prev.tasks, newTask],
    }));
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTaskState(prev => ({
      ...prev,
      tasks: prev.tasks.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      ),
    }));
  };

  const deleteTask = (taskId: string) => {
    setTaskState(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => task.id !== taskId),
    }));
  };

  const toggleTaskModal = (task?: Task) => {
    setTaskState(prev => ({
      ...prev,
      isTaskModalOpen: !prev.isTaskModalOpen,
      selectedTask: task ?? null,
    }));
  };

  return {
    taskState,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskModal,
  };
}