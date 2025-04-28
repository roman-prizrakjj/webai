import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header/Header';
import CompanyInfo from './components/CompanyInfo/CompanyInfo';
import Chat from './components/Chat/Chat';
import VideoIntro from './components/VideoIntro/VideoIntro';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

// Компонент для основного содержимого приложения
const AppContent: React.FC = () => {
  const { t } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  
  // Обработчики событий с помощью useCallback для оптимизации
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);
  
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);
  
  // Обработчик завершения видеозаставки
  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    // Добавляем задержку для анимации загрузки после завершения интро
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  // Установка обработчиков событий
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleMouseMove, handleScroll]);
  
  // Стили для курсора, следующего за мышью
  const mouseFollowerStyle = useMemo(() => ({
    left: `${mousePosition.x - 64}px`,
    top: `${mousePosition.y - 64}px`,
    opacity: 0.4,
    transition: 'transform 0.2s, left 0.3s ease-out, top 0.3s ease-out',
    transform: `scale(${1 + scrollY * 0.001})`,
  }), [mousePosition.x, mousePosition.y, scrollY]);

  // Варианты анимации для контента
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  
  return (
    <div className="relative min-h-screen bg-dark-primary text-text-primary font-light overflow-hidden">
      {/* Видеозаставка */}
      {showIntro && <VideoIntro onComplete={handleIntroComplete} />}
      
      {/* Background elements */}
      <div className="fixed inset-0 z-0">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-accent-primary/10 rounded-full blur-[150px]" 
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute bottom-[30%] right-[10%] w-[400px] h-[400px] bg-accent-secondary/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, delay: 0.6 }}
          className="absolute bottom-0 left-[30%] w-[600px] h-[600px] bg-dark-accent/10 rounded-full blur-[150px]" 
        />
      </div>
      
      {/* Mouse follower */}
      <motion.div 
        className="hidden md:block fixed w-32 h-32 bg-accent-secondary/20 rounded-full blur-xl pointer-events-none z-10 animate-pulse-slow"
        style={mouseFollowerStyle}
      />
      
      {/* Page content */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div 
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.5 }}
            className="relative z-20 min-h-screen flex flex-col"
          >
            <Header />
            
            <main className="container mx-auto px-4 md:px-6 flex-grow pb-10">
              <div className="grid grid-cols-1 gap-8 md:gap-12">
                <div>
                  <CompanyInfo />
                </div>
                
                <div>
                  <Chat />
                </div>
              </div>
            </main>
            
            <footer className="w-full z-5 bg-dark-primary py-3 border-t border-dark-border/10 mt-auto">
              <div className="container mx-auto px-6">
                <div className="flex items-center space-x-3 justify-center">
                  <div className="w-3 h-3 bg-accent-secondary rounded-full animate-pulse"></div>
                  <p className="text-text-secondary text-xs">
                    © {new Date().getFullYear()} CARS N QUOTES. {t('all_rights_reserved')}.
                  </p>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Основной компонент приложения с провайдером языка
const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App; 