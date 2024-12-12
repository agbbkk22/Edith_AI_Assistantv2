import React from 'react';
import { MeetingNote } from '../../types/meetingNotes';
import { Mic, MicOff, BookOpen, CheckSquare, Flag, FileText } from 'lucide-react';

interface MeetingNotesProps {
  isRecording: boolean;
  notes: MeetingNote[];
  onStartRecording: () => void;
  onStopRecording: () => void;
  onUpdateNote: (noteId: string, updates: Partial<MeetingNote>) => void;
}

export function MeetingNotes({
  isRecording,
  notes,
  onStartRecording,
  onStopRecording,
  onUpdateNote,
}: MeetingNotesProps) {
  const getNoteIcon = (type: MeetingNote['type']) => {
    switch (type) {
      case 'key-point':
        return <Flag size={16} className="text-blue-500" />;
      case 'action-item':
        return <CheckSquare size={16} className="text-green-500" />;
      case 'decision':
        return <BookOpen size={16} className="text-purple-500" />;
      case 'summary':
        return <FileText size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Meeting Notes</h2>
        <button
          onClick={isRecording ? onStopRecording : onStartRecording}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg
            ${isRecording
              ? 'bg-red-100 text-red-700 hover:bg-red-200'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }
          `}
        >
          {isRecording ? (
            <>
              <MicOff size={20} />
              Stop Recording
            </>
          ) : (
            <>
              <Mic size={20} />
              Start Recording
            </>
          )}
        </button>
      </div>

      {isRecording && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
          <Mic className="animate-pulse" size={20} />
          <span>Recording in progress...</span>
        </div>
      )}

      <div className="space-y-4">
        {notes.map(note => (
          <div
            key={note.id}
            className="p-3 border rounded-lg hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              {getNoteIcon(note.type)}
              <span className="text-sm font-medium capitalize">
                {note.type.replace('-', ' ')}
              </span>
              <time className="text-xs text-gray-500 ml-auto">
                {note.timestamp.toLocaleTimeString()}
              </time>
            </div>
            <p className="text-gray-700">{note.content}</p>
            {note.type === 'action-item' && (
              <div className="mt-2 flex gap-4">
                <input
                  type="text"
                  value={note.assignee ?? ''}
                  onChange={(e) => onUpdateNote(note.id, { assignee: e.target.value })}
                  placeholder="Assign to..."
                  className="text-sm px-2 py-1 border rounded"
                />
                <input
                  type="date"
                  value={note.dueDate?.toISOString().split('T')[0] ?? ''}
                  onChange={(e) => onUpdateNote(note.id, { 
                    dueDate: e.target.value ? new Date(e.target.value) : undefined 
                  })}
                  className="text-sm px-2 py-1 border rounded"
                />
              </div>
            )}
          </div>
        ))}

        {notes.length === 0 && !isRecording && (
          <p className="text-center text-gray-500 py-4">
            No notes yet. Start recording to capture meeting content.
          </p>
        )}
      </div>
    </div>
  );
}