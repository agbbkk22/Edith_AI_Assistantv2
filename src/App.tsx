import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ChatInterface } from './components/chat/ChatInterface';
import { UtilityBar } from './components/utilities/UtilityBar';
import { Header } from './components/layout/Header';
import { useChat } from './hooks/useChat';
import { useVoiceChat } from './hooks/useVoiceChat';
import { useUtilities } from './hooks/useUtilities';
import { UtilityPanel } from './components/utilities/UtilityPanel';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

function App() {
  const { chatState, handleSendMessage } = useChat();
  const { isProcessing, processVoiceMessage } = useVoiceChat();
  const { activePanel, utilityState, handleUtilityClick } = useUtilities();

  const handleMessage = async (message: string) => {
    if (isProcessing) {
      const processedMessage = await processVoiceMessage(message);
      handleSendMessage(processedMessage);
    } else {
      handleSendMessage(message);
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="min-h-screen bg-gray-100">
        <Header onCalendarClick={() => handleUtilityClick('calendar')} />
        <div className="max-w-6xl mx-auto p-4">
          <UtilityBar
            onUtilityClick={handleUtilityClick}
            activePanel={activePanel}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {activePanel && (
              <UtilityPanel
                type={activePanel}
                state={utilityState}
                onClose={() => handleUtilityClick(null)}
              />
            )}

            <div className={`${activePanel ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <ChatInterface
                  messages={chatState.messages}
                  isTyping={chatState.isTyping}
                  onSendMessage={handleMessage}
                  isProcessingVoice={isProcessing}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;