import { useState, useCallback } from 'react';
import { MeetingNotesState, MeetingTranscript, MeetingNote } from '../types/meetingNotes';
import { analyzeTranscript } from '../utils/notesAnalyzer';

export function useMeetingNotes() {
  const [notesState, setNotesState] = useState<MeetingNotesState>({
    isRecording: false,
    currentMeetingId: null,
    transcripts: [],
    notes: [],
  });

  const startRecording = useCallback((meetingId: string) => {
    setNotesState(prev => ({
      ...prev,
      isRecording: true,
      currentMeetingId: meetingId,
    }));
  }, []);

  const stopRecording = useCallback(() => {
    setNotesState(prev => {
      const newNotes = analyzeTranscript(prev.transcripts);
      return {
        ...prev,
        isRecording: false,
        currentMeetingId: null,
        notes: [...prev.notes, ...newNotes],
      };
    });
  }, []);

  const addTranscript = useCallback((content: string, speakerId: string) => {
    setNotesState(prev => {
      if (!prev.isRecording || !prev.currentMeetingId) return prev;

      const transcript: MeetingTranscript = {
        id: `transcript-${Date.now()}`,
        meetingId: prev.currentMeetingId,
        speakerId,
        content,
        timestamp: new Date(),
      };

      return {
        ...prev,
        transcripts: [...prev.transcripts, transcript],
      };
    });
  }, []);

  const updateNote = useCallback((noteId: string, updates: Partial<MeetingNote>) => {
    setNotesState(prev => ({
      ...prev,
      notes: prev.notes.map(note =>
        note.id === noteId ? { ...note, ...updates } : note
      ),
    }));
  }, []);

  return {
    notesState,
    startRecording,
    stopRecording,
    addTranscript,
    updateNote,
  };
}