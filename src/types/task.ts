export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  deadline?: Date;
  createdAt: Date;
  tags: string[];
  estimatedMinutes?: number;
}

export interface TaskState {
  tasks: Task[];
  isTaskModalOpen: boolean;
  selectedTask: Task | null;
}