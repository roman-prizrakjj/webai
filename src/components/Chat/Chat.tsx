import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'system';
  timestamp: Date;
}

const Chat: React.FC = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatSectionRef = useRef<HTMLDivElement>(null);

  // Инициализация начального сообщения при загрузке или смене языка
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: t('welcome'),
        sender: 'system',
        timestamp: new Date()
      }
    ]);
  }, [language, t]);

  // Автоматическая прокрутка вниз при новых сообщениях
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Фокус на поле ввода при загрузке
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Добавление сообщения пользователя
      const userMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages([...messages, userMessage]);
      setInputValue('');
      
      // Имитация набора текста оператором
      setIsTyping(true);
      
      // Имитация ответа системы
      setTimeout(() => {
        setIsTyping(false);
        const systemMessage: Message = {
          id: messages.length + 2,
          text: t('auto_reply'),
          sender: 'system',
          timestamp: new Date()
        };
        
        setMessages(prevMessages => [...prevMessages, systemMessage]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Форматирование времени
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section id="chat-section" className="py-10 relative">
      <div className="container mx-auto px-6 relative z-20">
        <div className="flex flex-col md:items-center md:justify-center">
          <div ref={chatSectionRef} id="chat-container" className="max-w-5xl w-full mx-auto">
            <motion.h3 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="caption-text text-text-secondary mb-4"
            >
              {t('online_assistant')}
            </motion.h3>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="border-2 border-accent-secondary/30 rounded-lg shadow-lg shadow-accent-primary/5 overflow-hidden"
              style={{
                background: 'linear-gradient(to bottom, rgba(26, 27, 30, 0.7), rgba(18, 19, 22, 0.95))',
                boxShadow: '0 10px 30px rgba(3, 218, 198, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Заголовок чата */}
              <div className="backdrop-blur-md bg-dark-secondary/30 border-b border-accent-secondary/20 p-5 flex items-center justify-between">
                <div>
                  <h2 className="heading-md text-text-primary font-light">{t('online_chat')}</h2>
                </div>
                <div className="flex items-center">
                  <span className="flex h-3 w-3 relative mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-secondary"></span>
                  </span>
                  <span className="text-xs text-accent-secondary uppercase tracking-widest font-medium">Live</span>
                </div>
              </div>
              
              {/* Содержимое чата */}
              <div 
                className="bg-dark-primary/30 backdrop-blur-md min-h-[550px] max-h-[650px] overflow-y-auto p-6"
                style={{
                  backgroundImage: 'radial-gradient(circle at top right, rgba(55, 0, 179, 0.03), transparent 70%), radial-gradient(circle at bottom left, rgba(3, 218, 198, 0.03), transparent 70%)'
                }}
              >
                <div className="space-y-8">
                  {messages.map((message, index) => (
                    <motion.div 
                      key={message.id}
                      initial={{ opacity: 0, y: 20, x: message.sender === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] ${
                          message.sender === 'user' 
                            ? 'bg-accent-primary/15 border border-accent-primary/30 shadow-sm shadow-accent-primary/5' 
                            : 'bg-dark-secondary/20 border border-dark-border/20 shadow-sm shadow-dark-border/5'
                        } p-5 rounded-lg`}
                      >
                        <p className="text-text-primary font-light">{message.text}</p>
                        <div className="text-xs text-text-secondary mt-2 flex justify-end items-center">
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="max-w-[80%] bg-dark-secondary/20 border border-dark-border/20 shadow-sm p-5 rounded-lg">
                        <div className="flex space-x-2">
                          <span className="w-2 h-2 bg-accent-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-2 h-2 bg-accent-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-2 h-2 bg-accent-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* Ввод сообщения */}
              <div className="backdrop-blur-md bg-dark-secondary/30 p-5 border-t border-accent-secondary/20 flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('typing_message')}
                  className="flex-grow bg-dark-primary/40 text-text-primary py-4 px-5 border border-dark-border/20 rounded-md outline-none focus:border-accent-secondary/50 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  className="ml-3 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 border border-accent-secondary/50 text-accent-secondary hover:bg-accent-secondary/10 px-6 py-4 rounded-md transition-colors font-light tracking-wider uppercase text-sm"
                >
                  {t('send')}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat; 