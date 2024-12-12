export interface MeetingNote {
  id: string;
  meetingId: string;
  content: string;
  type: 'key-point' | 'action-item' | 'decision' | 'summary';
  timestamp: Date;
  assignee?: string;
  dueDate?: Date;
}

export interface MeetingTranscript {
  id: string;
  meetingId: string;
  speakerId: string;
  content: string;
  timestamp: Date;
}

export interface MeetingNotesState {
  isRecording: boolean;
  currentMeetingId: string | null;
  transcripts: MeetingTranscript[];
  notes: MeetingNote[];
}