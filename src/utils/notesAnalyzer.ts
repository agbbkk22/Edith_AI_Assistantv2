import { MeetingTranscript, MeetingNote } from '../types/meetingNotes';

function extractActionItems(transcript: string): Partial<MeetingNote>[] {
  // In a real implementation, this would use NLP to identify action items
  const actionItems: Partial<MeetingNote>[] = [];
  const actionPhrases = ['need to', 'will do', 'should', 'must', 'going to'];
  
  const sentences = transcript.split(/[.!?]+/);
  sentences.forEach(sentence => {
    const hasActionPhrase = actionPhrases.some(phrase => 
      sentence.toLowerCase().includes(phrase)
    );
    
    if (hasActionPhrase) {
      actionItems.push({
        content: sentence.trim(),
        type: 'action-item',
      });
    }
  });

  return actionItems;
}

function extractKeyPoints(transcript: string): Partial<MeetingNote>[] {
  // In a real implementation, this would use NLP to identify key points
  const keyPoints: Partial<MeetingNote>[] = [];
  const keyPhrases = ['important', 'key', 'critical', 'main point', 'highlight'];
  
  const sentences = transcript.split(/[.!?]+/);
  sentences.forEach(sentence => {
    const hasKeyPhrase = keyPhrases.some(phrase => 
      sentence.toLowerCase().includes(phrase)
    );
    
    if (hasKeyPhrase) {
      keyPoints.push({
        content: sentence.trim(),
        type: 'key-point',
      });
    }
  });

  return keyPoints;
}

function extractDecisions(transcript: string): Partial<MeetingNote>[] {
  // In a real implementation, this would use NLP to identify decisions
  const decisions: Partial<MeetingNote>[] = [];
  const decisionPhrases = ['decided', 'agreed', 'concluded', 'resolved'];
  
  const sentences = transcript.split(/[.!?]+/);
  sentences.forEach(sentence => {
    const hasDecisionPhrase = decisionPhrases.some(phrase => 
      sentence.toLowerCase().includes(phrase)
    );
    
    if (hasDecisionPhrase) {
      decisions.push({
        content: sentence.trim(),
        type: 'decision',
      });
    }
  });

  return decisions;
}

function generateSummary(transcript: string): Partial<MeetingNote> {
  // In a real implementation, this would use NLP to generate a coherent summary
  return {
    content: `Meeting discussed various topics including ${
      transcript.slice(0, 100)}...`,
    type: 'summary',
  };
}

export function analyzeTranscript(transcripts: MeetingTranscript[]): MeetingNote[] {
  const fullTranscript = transcripts
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
    .map(t => t.content)
    .join(' ');

  const notes: MeetingNote[] = [];
  const timestamp = new Date();
  const meetingId = transcripts[0]?.meetingId ?? '';

  // Extract different types of notes
  const actionItems = extractActionItems(fullTranscript);
  const keyPoints = extractKeyPoints(fullTranscript);
  const decisions = extractDecisions(fullTranscript);
  const summary = generateSummary(fullTranscript);

  // Combine all notes with proper metadata
  [...actionItems, ...keyPoints, ...decisions, summary].forEach((note, index) => {
    notes.push({
      id: `${meetingId}-note-${index}`,
      meetingId,
      content: note.content,
      type: note.type,
      timestamp,
      assignee: note.assignee,
      dueDate: note.dueDate,
    } as MeetingNote);
  });

  return notes;
}