import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import './CompanyInfo.css';

const CompanyInfo: React.FC = () => {
  const { t } = useLanguage();
  const textRef = useRef<HTMLHeadingElement>(null);
  const statsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }
    
    statsRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      if (textRef.current) observer.unobserve(textRef.current);
      statsRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const scrollToChat = () => {
    // Получаем элемент чата по id
    const chatSection = document.getElementById('chat-section');
    
    if (chatSection) {
      // Получаем позицию элемента относительно верха документа
      const offsetTop = chatSection.getBoundingClientRect().top + window.scrollY;
      
      // Добавляем плавную прокрутку к чату
      window.scrollTo({
        top: offsetTop - 80, // Вычитаем 80px для отступа сверху (учитываем фиксированный хедер)
        behavior: 'smooth'
      });
      
      // Найдем поле ввода в чате и сфокусируемся на нем
      const chatInput = document.querySelector('#chat-container input');
      if (chatInput && chatInput instanceof HTMLInputElement) {
        setTimeout(() => {
          chatInput.focus();
        }, 800); // Задержка для завершения прокрутки
      }
    }
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden company-info">
      {/* Abstract shapes */}
      <div className="abstract-shape shape-top-right"></div>
      <div className="abstract-shape shape-bottom-left"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 md:w-96 md:h-96 bg-accent-primary/5 rounded-full blur-3xl animate-float"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
          <div className="md:w-3/5">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-2 inline-flex items-center rounded-full px-3 py-1 text-xs backdrop-blur-sm bg-dark-secondary/20 border border-dark-border/10 text-text-secondary"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-accent-secondary mr-2 animate-pulse"></span>
              {t('premium_auto')}
            </motion.div>
            
            <h2 
              ref={textRef} 
              className="text-3xl md:text-5xl lg:text-6xl font-extralight leading-tight md:leading-tight lg:leading-tight mb-8 opacity-0 transition-all duration-1000 translate-y-6"
              style={{ willChange: 'transform, opacity' }}
            >
              <span className="text-text-secondary">{t('we_integrate')} </span>
              <span className="text-text-primary"> {t('experience')}, </span> 
              <span className="text-accent-secondary">{t('technology')} </span>
              <span className="text-text-secondary">{t('and')} </span>
              <span className="text-accent-primary block">{t('brand_identity')}</span>
            </h2>
            
            <p className="text-base md:text-lg text-text-secondary font-light mb-4 max-w-xl">
              {t('company_intro')}
            </p>
            
            <p className="text-base md:text-lg text-text-secondary font-light mb-8 max-w-xl">
              {t('company_description')}
            </p>
            
            <motion.div 
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="inline-flex"
            >
              <button 
                onClick={scrollToChat}
                className="relative group"
                aria-label="Перейти к чату"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary opacity-50 blur rounded-lg transition-all duration-300 group-hover:opacity-100"></div>
                <span className="relative flex items-center space-x-2 bg-dark-primary hover:bg-dark-secondary/50 border border-dark-border/20 px-6 py-3 rounded-lg text-text-primary transition-all duration-300">
                  <span>{t('ask_in_chat')}</span>
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </span>
              </button>
            </motion.div>
          </div>
          
          <div className="md:w-2/5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: '10+', label: 'years_experience', delay: 100 },
                { value: '1000+', label: 'clients', delay: 200 },
                { value: '100%', label: 'satisfaction', delay: 300 }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  ref={el => statsRefs.current[index] = el}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="backdrop-blur-md bg-dark-secondary/20 p-5 text-center border border-dark-border/10 rounded-lg transform transition-all duration-500 stats-item"
                >
                  <div className="text-3xl lg:text-4xl font-light text-text-primary mb-1">{stat.value}</div>
                  <div className="text-xs text-text-secondary uppercase tracking-wide">{t(stat.label)}</div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 backdrop-blur-md bg-dark-secondary/20 border border-dark-border/10 rounded-lg p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-text-secondary">{t('satisfied_customers')}</div>
                <div className="text-sm text-accent-secondary">98%</div>
              </div>
              <div className="w-full bg-dark-accent/30 rounded-full h-1.5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '98%' }}
                  transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                  className="bg-gradient-to-r from-accent-primary to-accent-secondary h-1.5 rounded-full" 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo; 