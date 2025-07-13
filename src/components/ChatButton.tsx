import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <div className="relative group">
      <motion.button
        onClick={onClick}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-500/30 z-40 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        title="Open BriLow (Ctrl+K)"
      >
        <MessageCircle size={24} />
      </motion.button>
      
      {/* Tooltip */}
      <div className="fixed bottom-20 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
        <div className="bg-surface-900 dark:bg-surface-100 text-white dark:text-surface-900 text-xs px-2 py-1 rounded shadow-lg">
          BriLow
          <div className="text-xs opacity-75">Ctrl+K</div>
        </div>
      </div>
    </div>
  );
};

export default ChatButton; 