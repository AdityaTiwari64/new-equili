import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, MessageCircle, X, Sparkles, Zap } from 'lucide-react';
import { useChatbot } from '../context/ChatbotContext';

interface BriLowIntroProps {
  isVisible: boolean;
  onClose: () => void;
}

const BriLowIntro: React.FC<BriLowIntroProps> = ({ isVisible, onClose }) => {
  const { openChatbot } = useChatbot();
  const [currentStep, setCurrentStep] = useState(0);

  const features = [
    {
      icon: Sparkles,
      title: "Smart Assistance",
      description: "Get help with any feature or question about Equilibria"
    },
    {
      icon: Zap,
      title: "Quick Access",
      description: "Use Ctrl+K to open BriLow instantly from anywhere"
    },
    {
      icon: MessageCircle,
      title: "Context Aware",
      description: "BriLow understands which page you're on and provides relevant help"
    }
  ];

  const handleTryNow = () => {
    onClose();
    setTimeout(() => {
      openChatbot();
    }, 300);
  };

  const handleNext = () => {
    if (currentStep < features.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handleSkip = () => {
    onClose();
  };

  useEffect(() => {
    if (isVisible) {
      setCurrentStep(0);
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-surface-800 rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
            >
              <X size={20} className="text-surface-500" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Bot size={32} className="text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-2">
                Meet BriLow
              </h2>
              <p className="text-surface-600 dark:text-surface-400">
                Your AI assistant is here to help!
              </p>
            </div>

            {/* Feature Display */}
            <div className="mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    {React.createElement(features[currentStep].icon, { size: 24, className: "text-primary-500" })}
                  </div>
                  <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-2">
                    {features[currentStep].title}
                  </h3>
                  <p className="text-sm text-surface-600 dark:text-surface-400">
                    {features[currentStep].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mb-6">
              {features.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep
                      ? 'bg-primary-500'
                      : 'bg-surface-300 dark:bg-surface-600'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleSkip}
                className="flex-1 px-4 py-2 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
              >
                Skip
              </button>
              {currentStep === features.length - 1 ? (
                <button
                  onClick={handleTryNow}
                  className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                >
                  Try BriLow Now
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                >
                  Next
                </button>
              )}
            </div>

            {/* Keyboard Shortcut Hint */}
            <div className="mt-4 text-center">
              <p className="text-xs text-surface-500">
                💡 Tip: Press <kbd className="px-2 py-1 bg-surface-200 dark:bg-surface-700 rounded text-xs">Ctrl+K</kbd> anytime to open BriLow
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BriLowIntro; 