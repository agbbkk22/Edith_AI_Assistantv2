import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  onClose: () => void;
}

export function CalendarHeader({ onClose }: CalendarHeaderProps) {
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-blue-600 text-white p-4 flex items-center justify-between rounded-t-xl">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold">{currentMonth}</h2>
        <div className="flex gap-2">
          <button className="p-1 hover:bg-blue-700 rounded">
            <ChevronLeft size={20} />
          </button>
          <button className="p-1 hover:bg-blue-700 rounded">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <button onClick={onClose} className="p-1 hover:bg-blue-700 rounded">
        <X size={20} />
      </button>
    </div>
  );
}