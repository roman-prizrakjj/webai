import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from '../LanguageSwitcher';

const Header: React.FC = () => {
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }));

  // Обновление времени каждую секунду
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-dark-secondary/20 border-b border-dark-border/10">
      <div className="container mx-auto flex items-center justify-between py-5 px-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          <motion.div 
            className="relative flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
              <span className="text-white">CARS N</span>
              <span className="text-accent-secondary relative">
                <span className="relative z-10">QUOTES</span>
                <span className="absolute inset-0 bg-accent-secondary/10 blur-sm rounded-lg"></span>
              </span>
            </h1>
          </motion.div>
        </motion.div>
        
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center space-x-3"
          >
            <div className="text-text-primary font-mono text-sm bg-dark-secondary/30 px-4 py-1 rounded-md border border-dark-border/20">
              {currentTime}
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header; 