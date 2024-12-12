import React from 'react';
import { TaskList } from '../../tasks/TaskList';
import { TaskModal } from '../../tasks/TaskModal';

interface TaskPanelProps {
  state: any;
  onClose: () => void;
}

export function TaskPanel({ state, onClose }: TaskPanelProps) {
  return (
    <div className="lg:col-span-1 space-y-4">
      <TaskList
        tasks={state.taskState.tasks}
        onTaskClick={(task) => state.toggleTaskModal(task)}
      />
      {state.taskState.isTaskModalOpen && (
        <TaskModal
          task={state.taskState.selectedTask}
          onClose={() => state.toggleTaskModal()}
          onSave={state.addTask}
        />
      )}
    </div>
  );
}