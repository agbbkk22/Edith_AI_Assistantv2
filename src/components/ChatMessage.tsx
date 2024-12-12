import React from 'react';
import { MessageSquare, User } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant';
  
  return (
    <div className={`flex gap-3 ${isAssistant ? 'bg-gray-50' : ''} p-4 rounded-lg`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isAssistant ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
      }`}>
        {isAssistant ? <MessageSquare size={18} /> : <User size={18} />}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">
          {isAssistant ? 'EDITH' : 'You'}
        </p>
        <p className="mt-1 text-gray-700">{message.content}</p>
      </div>
      <time className="text-xs text-gray-500">
        {new Date(message.timestamp).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}
      </time>
    </div>
  );
}