import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ChatbotContextType {
  isChatbotOpen: boolean;
  isIntroVisible: boolean;
  openChatbot: () => void;
  closeChatbot: () => void;
  toggleChatbot: () => void;
  showIntro: () => void;
  hideIntro: () => void;
  resetIntro: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};

interface ChatbotProviderProps {
  children: ReactNode;
}

export const ChatbotProvider: React.FC<ChatbotProviderProps> = ({ children }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isIntroVisible, setIsIntroVisible] = useState(false);

  // Check if user has seen the intro before
  useEffect(() => {
    // For testing, you can comment out this localStorage check
    const hasSeenIntro = localStorage.getItem('briLowIntroSeen');
    
    // Show intro if user hasn't seen it, or for testing purposes
    if (!hasSeenIntro) {
      console.log('BriLow: Showing intro popup (first time user)');
      const timer = setTimeout(() => {
        setIsIntroVisible(true);
      }, 1500); // Reduced delay for better UX
      return () => clearTimeout(timer);
    } else {
      console.log('BriLow: User has seen intro before');
    }
  }, []);

  const openChatbot = () => setIsChatbotOpen(true);
  const closeChatbot = () => setIsChatbotOpen(false);
  const toggleChatbot = () => setIsChatbotOpen(!isChatbotOpen);
  
  const showIntro = () => {
    console.log('BriLow: Manually showing intro');
    setIsIntroVisible(true);
  };
  
  const hideIntro = () => {
    console.log('BriLow: Hiding intro');
    setIsIntroVisible(false);
    localStorage.setItem('briLowIntroSeen', 'true');
  };

  const resetIntro = () => {
    console.log('BriLow: Resetting intro (for testing)');
    localStorage.removeItem('briLowIntroSeen');
    setIsIntroVisible(true);
  };

  const value = {
    isChatbotOpen,
    isIntroVisible,
    openChatbot,
    closeChatbot,
    toggleChatbot,
    showIntro,
    hideIntro,
    resetIntro,
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
};

// Global function for testing - you can call this in browser console
if (typeof window !== 'undefined') {
  (window as any).resetBriLowIntro = () => {
    localStorage.removeItem('briLowIntroSeen');
    console.log('BriLow intro reset! Refresh the page to see the popup.');
  };
  
  (window as any).showBriLowIntro = () => {
    localStorage.removeItem('briLowIntroSeen');
    window.location.reload();
  };
} 