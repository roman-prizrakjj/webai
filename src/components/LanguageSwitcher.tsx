import React, { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

// Используем memo для предотвращения ненужных ререндеров
const LanguageSwitcher: React.FC = memo(() => {
  const { language, setLanguage, availableLanguages } = useLanguage();

  // Оптимизируем обработчик переключения языка
  const handleLanguageChange = useCallback((lang: string) => {
    setLanguage(lang as 'ru' | 'en' | 'ka');
  }, [setLanguage]);

  // Стили для кнопок в виде констант для предотвращения создания объектов при каждом рендере
  const buttonBaseClass = "px-2 py-0.5 rounded text-sm font-medium transition-colors";
  const buttonActiveClass = "bg-accent-secondary/20 text-accent-secondary border border-accent-secondary/30";
  const buttonInactiveClass = "text-text-secondary hover:text-text-primary bg-dark-secondary/10 border border-dark-border/10";

  // Анимация кнопок
  const buttonAnimation = {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  };

  return (
    <div className="flex items-center space-x-2">
      {availableLanguages.map((lang) => (
        <motion.button
          key={lang}
          {...buttonAnimation}
          onClick={() => handleLanguageChange(lang)}
          className={`${buttonBaseClass} ${
            language === lang ? buttonActiveClass : buttonInactiveClass
          }`}
          aria-label={`Switch language to ${lang}`}
          aria-pressed={language === lang}
        >
          {lang.toUpperCase()}
        </motion.button>
      ))}
    </div>
  );
});

// Добавляем displayName для удобства отладки
LanguageSwitcher.displayName = 'LanguageSwitcher';

export default LanguageSwitcher; 