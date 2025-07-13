import React, { useEffect } from 'react';
import Chatbot from './Chatbot';
import ChatButton from './ChatButton';
import BriLowIntro from './BriLowIntro';
import { useChatbot } from '../context/ChatbotContext';

const GlobalChatbot: React.FC = () => {
  const { isChatbotOpen, isIntroVisible, openChatbot, closeChatbot, hideIntro } = useChatbot();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Open chatbot with Ctrl/Cmd + K
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        if (isChatbotOpen) {
          closeChatbot();
        } else {
          openChatbot();
        }
      }
      
      // Close chatbot with Escape
      if (event.key === 'Escape' && isChatbotOpen) {
        closeChatbot();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isChatbotOpen, openChatbot, closeChatbot]);

  return (
    <>
      <ChatButton onClick={openChatbot} />
      <Chatbot isOpen={isChatbotOpen} onClose={closeChatbot} />
      <BriLowIntro isVisible={isIntroVisible} onClose={hideIntro} />
    </>
  );
};

export default GlobalChatbot; 