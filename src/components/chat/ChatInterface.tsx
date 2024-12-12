import React from 'react';
import { Message } from '../../types';
import { ChatMessage } from '../ChatMessage';
import { ChatInput } from '../ChatInput';
import { VoiceChat } from '../VoiceChat';
import { SuggestedQueries } from '../SuggestedQueries';
import { MessageSquare } from 'lucide-react';

interface ChatInterfaceProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  isProcessingVoice: boolean;
}

export function ChatInterface({
  messages,
  isTyping,
  onSendMessage,
  isProcessingVoice,
}: ChatInterfaceProps) {
  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-200px)]">
      <div className="bg-white p-4 border-b">
        <div className="flex items-center gap-2">
          <MessageSquare className="text-blue-600" size={24} />
          <h2 className="text-lg font-semibold">EDITH Assistant</h2>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          How can I help you today? Type your message or use voice input to communicate.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <SuggestedQueries onSelectQuery={onSendMessage} />
          </div>
        )}

        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200" />
          </div>
        )}
      </div>

      <div className="border-t">
        <ChatInput onSendMessage={onSendMessage} />
      </div>

      <VoiceChat 
        onMessage={onSendMessage}
        isProcessing={isProcessingVoice}
      />
    </div>
  );
}