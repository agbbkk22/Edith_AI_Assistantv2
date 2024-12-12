import React from 'react';
import { BrainCircuit, Calendar } from 'lucide-react';

interface HeaderProps {
  onCalendarClick: () => void;
}

export function Header({ onCalendarClick }: HeaderProps) {
  return (
    <div className="bg-blue-600 p-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BrainCircuit size={24} />
          <h1 className="text-xl font-semibold">EDITH</h1>
        </div>
        <button
          onClick={onCalendarClick}
          className="p-2 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
        >
          <Calendar size={20} />
          <span className="text-sm">Calendar</span>
        </button>
      </div>
      <p className="text-blue-100 text-sm mt-1">Your Intelligent Business Assistant</p>
    </div>
  );
}