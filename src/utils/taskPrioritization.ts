import { Task } from '../types/task';

export function calculateTaskScore(task: Task): number {
  const now = new Date();
  const deadlineScore = task.deadline
    ? Math.max(0, 100 - (task.deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    : 50;

  const priorityScores = {
    high: 100,
    medium: 60,
    low: 30,
  };

  const priorityScore = priorityScores[task.priority];
  
  return (deadlineScore * 0.6) + (priorityScore * 0.4);
}

export function suggestTaskOrder(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => calculateTaskScore(b) - calculateTaskScore(a));
}

export function generateTaskInsights(tasks: Task[]): string {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const urgentTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length;
  
  return `You have ${totalTasks - completedTasks} pending tasks, ${urgentTasks} of which are urgent. ` +
    `You've completed ${completedTasks} tasks so far.`;
}