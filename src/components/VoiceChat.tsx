import React, { useState, useEffect, useCallback } from 'react';
import { Mic, MicOff, Volume2, VolumeX, AlertCircle } from 'lucide-react';

interface VoiceChatProps {
  onMessage: (message: string) => void;
  isProcessing: boolean;
}

export function VoiceChat({ onMessage, isProcessing }: VoiceChatProps) {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  
  // Check for microphone permission
  const checkMicrophonePermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setHasPermission(true);
      setError(null);
    } catch (err) {
      setHasPermission(false);
      setError('Microphone access denied. Please enable microphone access in your browser settings.');
    }
  }, []);

  // Initialize speech recognition
  const recognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser.');
      return null;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    return recognition;
  }, []);

  // Initialize speech synthesis
  const synth = window.speechSynthesis;

  const startListening = useCallback(async () => {
    if (!hasPermission) {
      await checkMicrophonePermission();
      return;
    }

    const recognizer = recognition();
    if (!recognizer) return;

    setIsListening(true);
    setTranscript('');
    setError(null);

    recognizer.onresult = (event) => {
      const current = event.resultIndex;
      const result = event.results[current];
      const transcriptText = result[0].transcript;
      
      if (result.isFinal) {
        setTranscript(transcriptText);
        onMessage(transcriptText);
        recognizer.stop();
        setIsListening(false);
      }
    };

    recognizer.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      switch (event.error) {
        case 'not-allowed':
          setError('Microphone access denied. Please enable microphone access.');
          setHasPermission(false);
          break;
        case 'network':
          setError('Network error. Please check your connection.');
          break;
        default:
          setError('An error occurred with speech recognition.');
      }
    };

    try {
      await recognizer.start();
    } catch (err) {
      setError('Failed to start speech recognition. Please try again.');
      setIsListening(false);
    }
  }, [recognition, onMessage, hasPermission, checkMicrophonePermission]);

  const stopListening = useCallback(() => {
    const recognizer = recognition();
    if (recognizer) {
      recognizer.stop();
    }
    setIsListening(false);
  }, [recognition]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      synth.cancel();
    }
  };

  // Check permission on mount
  useEffect(() => {
    checkMicrophonePermission();
  }, [checkMicrophonePermission]);

  // Speak the response
  useEffect(() => {
    if (!isMuted && !isProcessing && !isListening && transcript) {
      const utterance = new SpeechSynthesisUtterance(transcript);
      utterance.rate = 1;
      utterance.pitch = 1;
      synth.speak(utterance);
    }
  }, [transcript, isMuted, isProcessing, isListening]);

  return (
    <div className="fixed bottom-4 left-4 flex items-center gap-2">
      <button
        onClick={isListening ? stopListening : startListening}
        disabled={isProcessing || hasPermission === false}
        className={`
          p-3 rounded-full shadow-lg flex items-center justify-center
          ${isListening 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-blue-500 hover:bg-blue-600'}
          ${(isProcessing || hasPermission === false) ? 'opacity-50 cursor-not-allowed' : ''}
          transition-colors
        `}
        title={hasPermission === false ? 'Microphone access required' : 'Start/Stop voice input'}
      >
        {isListening ? (
          <MicOff size={24} className="text-white" />
        ) : (
          <Mic size={24} className="text-white" />
        )}
      </button>

      <button
        onClick={toggleMute}
        className={`
          p-3 rounded-full shadow-lg
          ${isMuted ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}
          transition-colors
        `}
        title={isMuted ? 'Unmute voice responses' : 'Mute voice responses'}
      >
        {isMuted ? (
          <VolumeX size={24} className="text-white" />
        ) : (
          <Volume2 size={24} className="text-white" />
        )}
      </button>

      {error && (
        <div className="bg-red-50 text-red-700 rounded-lg shadow-lg p-3 ml-2 flex items-center gap-2">
          <AlertCircle size={16} />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {isListening && !error && (
        <div className="bg-white rounded-lg shadow-lg p-3 ml-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-600">Listening...</span>
          </div>
        </div>
      )}
    </div>
  );
}