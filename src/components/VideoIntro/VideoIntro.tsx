import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoIntroProps {
  onComplete: () => void;
}

const VideoIntro: React.FC<VideoIntroProps> = ({ onComplete }) => {
  const [isVideoComplete, setIsVideoComplete] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Начинаем затухание через 1 секунду
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
      
      // Полностью скрываем интро через 1 секунду после начала затухания
      setTimeout(() => {
        setIsVideoComplete(true);
        onComplete();
      }, 1000);
    }, 1000);
    
    // Очистка таймера при размонтировании
    return () => {
      clearTimeout(fadeTimer);
    };
  }, [onComplete]);

  // Стили для затухания видео
  const videoStyle = {
    opacity: isFadingOut ? 0 : 1,
    transition: 'opacity 1s ease-out'
  };

  return (
    <AnimatePresence>
      {!isVideoComplete && (
        <motion.div 
          className="fixed inset-0 bg-dark-primary z-50 flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl w-full relative">
            <video 
              ref={videoRef}
              className="w-full h-auto"
              src="/images/car.mp4" 
              autoPlay 
              muted 
              playsInline
              preload="auto"
              style={videoStyle}
            />
            <motion.div 
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: isFadingOut ? 0 : 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-accent-secondary text-2xl font-semibold text-center tracking-wider">
                CARS N QUOTES
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoIntro; 