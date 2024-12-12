import { useState, useRef, useEffect } from 'react';
import { Message, ChatState } from '../types';
import { generateResponse } from '../utils/chat';

export function useChat() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isTyping: false,
  });
  
  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true,
    }));

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(content),
        role: 'assistant',
        timestamp: new Date(),
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isTyping: false,
      }));
    }, 1000);
  };

  return {
    chatState,
    handleSendMessage,
  };
}