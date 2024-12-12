import { 
  Task, 
  CalendarEvent, 
  Email,
  ProductivityMetrics,
  DailyBriefing,
  PerformanceInsight,
  BusinessMetrics 
} from '../types';

export function generateProductivityMetrics(
  tasks: Task[],
  events: CalendarEvent[],
  emails: Email[]
): ProductivityMetrics {
  const completedTasks = tasks.filter(t => t.status === 'completed');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  
  const completionTimes = completedTasks
    .filter(t => t.deadline)
    .map(t => t.deadline.getTime() - t.createdAt.getTime());
  
  const averageCompletionTime = completionTimes.length > 0
    ? completionTimes.reduce((a, b) => a + b, 0) / completionTimes.length
    : 0;

  return {
    tasksCompleted: completedTasks.length,
    tasksInProgress: inProgressTasks.length,
    averageTaskCompletionTime: averageCompletionTime / (1000 * 60 * 60), // convert to hours
    meetingsAttended: events.length,
    emailResponseRate: emails.filter(e => e.read).length / emails.length,
    focusTime: calculateFocusTime(events),
  };
}

export function generateDailyBriefing(
  tasks: Task[],
  events: CalendarEvent[],
  emails: Email[]
): DailyBriefing {
  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  return {
    date: now,
    upcomingTasks: tasks
      .filter(t => t.status !== 'completed' && t.deadline && t.deadline <= endOfDay)
      .sort((a, b) => a.deadline!.getTime() - b.deadline!.getTime()),
    upcomingMeetings: events
      .filter(e => e.start >= now && e.start <= endOfDay)
      .sort((a, b) => a.start.getTime() - b.start.getTime()),
    priorityEmails: emails
      .filter(e => !e.read && e.priority === 'high')
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),
    productivityTips: generateProductivityTips(),
    focusAreas: identifyFocusAreas(tasks, events, emails),
  };
}

export function generateBusinessMetrics(
  tasks: Task[],
  events: CalendarEvent[],
  emails: Email[]
): BusinessMetrics {
  const metrics = generateProductivityMetrics(tasks, events, emails);
  const insights = generatePerformanceInsights(metrics);
  
  return {
    insights,
    productivityScore: calculateProductivityScore(metrics),
    timeUtilization: calculateTimeUtilization(events, tasks, emails),
  };
}

function calculateFocusTime(events: CalendarEvent[]): number {
  const workingHours = 8 * 60; // 8 hours in minutes
  const meetingTime = events.reduce((total, event) => {
    const duration = (event.end.getTime() - event.start.getTime()) / (1000 * 60);
    return total + duration;
  }, 0);
  
  return workingHours - meetingTime;
}

function generateProductivityTips(): string[] {
  return [
    'Block out focus time in your calendar for deep work',
    'Use the 2-minute rule: If a task takes less than 2 minutes, do it now',
    'Process emails in batches at scheduled times',
    'Take regular breaks to maintain productivity',
    'Set clear priorities for each day',
  ];
}

function identifyFocusAreas(
  tasks: Task[],
  events: CalendarEvent[],
  emails: Email[]
): string[] {
  const areas: string[] = [];
  
  if (tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length > 3) {
    areas.push('High-priority task backlog');
  }
  
  if (events.length > 6) {
    areas.push('Meeting overload - consider consolidating');
  }
  
  if (emails.filter(e => !e.read).length > 10) {
    areas.push('Email backlog needs attention');
  }
  
  return areas;
}

function generatePerformanceInsights(metrics: ProductivityMetrics): PerformanceInsight[] {
  const insights: PerformanceInsight[] = [];
  
  // Task completion rate
  const taskCompletionRate = metrics.tasksCompleted / (metrics.tasksCompleted + metrics.tasksInProgress);
  insights.push({
    type: taskCompletionRate > 0.7 ? 'success' : 'warning',
    metric: 'Task Completion Rate',
    value: taskCompletionRate * 100,
    trend: taskCompletionRate > 0.7 ? 'up' : 'down',
    percentageChange: 0, // Would compare with historical data
    recommendation: taskCompletionRate < 0.7 
      ? 'Consider breaking down larger tasks into smaller, manageable pieces'
      : undefined,
  });
  
  // Email responsiveness
  insights.push({
    type: metrics.emailResponseRate > 0.8 ? 'success' : 'warning',
    metric: 'Email Response Rate',
    value: metrics.emailResponseRate * 100,
    trend: metrics.emailResponseRate > 0.8 ? 'up' : 'down',
    percentageChange: 0,
    recommendation: metrics.emailResponseRate < 0.8
      ? 'Set aside dedicated time for email responses'
      : undefined,
  });
  
  // Focus time
  const focusTimeHours = metrics.focusTime / 60;
  insights.push({
    type: focusTimeHours >= 4 ? 'success' : 'warning',
    metric: 'Focus Time',
    value: focusTimeHours,
    trend: focusTimeHours >= 4 ? 'up' : 'down',
    percentageChange: 0,
    recommendation: focusTimeHours < 4
      ? 'Block out more time for focused work'
      : undefined,
  });
  
  return insights;
}

function calculateProductivityScore(metrics: ProductivityMetrics): number {
  const weights = {
    taskCompletion: 0.4,
    emailResponse: 0.2,
    focusTime: 0.4,
  };
  
  const taskScore = (metrics.tasksCompleted / (metrics.tasksCompleted + metrics.tasksInProgress)) * 100;
  const emailScore = metrics.emailResponseRate * 100;
  const focusScore = (metrics.focusTime / (8 * 60)) * 100; // Compare to 8-hour workday
  
  return (
    taskScore * weights.taskCompletion +
    emailScore * weights.emailResponse +
    focusScore * weights.focusTime
  );
}

function calculateTimeUtilization(
  events: CalendarEvent[],
  tasks: Task[],
  emails: Email[]
): BusinessMetrics['timeUtilization'] {
  const totalMinutes = 8 * 60; // 8-hour workday
  
  const meetingMinutes = events.reduce((total, event) => {
    const duration = (event.end.getTime() - event.start.getTime()) / (1000 * 60);
    return total + duration;
  }, 0);
  
  const emailMinutes = emails.length * 5; // Estimate 5 minutes per email
  const taskMinutes = tasks.reduce((total, task) => total + (task.estimatedMinutes || 30), 0);
  const focusMinutes = totalMinutes - meetingMinutes - emailMinutes;
  
  return {
    meetings: (meetingMinutes / totalMinutes) * 100,
    tasks: (taskMinutes / totalMinutes) * 100,
    email: (emailMinutes / totalMinutes) * 100,
    focus: (focusMinutes / totalMinutes) * 100,
  };
}