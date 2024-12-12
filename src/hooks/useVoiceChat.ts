import { useState, useCallback } from 'react';

export function useVoiceChat() {
  const [isProcessing, setIsProcessing] = useState(false);

  const processVoiceMessage = useCallback(async (message: string) => {
    setIsProcessing(true);
    // Here you would typically send the message to your AI service
    // For now, we'll just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsProcessing(false);
    return message;
  }, []);

  return {
    isProcessing,
    processVoiceMessage,
  };
}