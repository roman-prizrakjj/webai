import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';

type Language = 'ru' | 'en' | 'ka';
type TranslationKey = string;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  availableLanguages: Language[];
}

const defaultLanguage: Language = 'ru';
const availableLanguages: Language[] = ['ru', 'en', 'ka'];

// Создаем контекст с начальными значениями
const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key: TranslationKey) => key,
  availableLanguages
});

// Языковой словарь
const translations: Record<Language, Record<TranslationKey, string>> = {
  ru: {
    // Шапка
    'time': 'ВРЕМЯ',
    
    // Основной экран
    'premium_auto': 'ПРЕМИУМ АВТО СЕРВИС',
    'we_integrate': 'Мы интегрируем',
    'experience': 'опыт',
    'technology': 'технологии',
    'and': 'и',
    'brand_identity': 'индивидуальность бренда',
    'company_intro': 'CARS N QUOTES — ваш надежный партнер в мире лизинга и автоподбора.',
    'company_description': 'Мы предлагаем гибкий лизинг, консультации 24/7 и инновационную систему подбора авто, которая учитывает каждое ваше пожелание. С нами вы получаете идеальный автомобиль без лишних забот.',
    'ask_in_chat': 'Спросить в чате',
    
    // Статистика
    'years_experience': 'лет опыта',
    'clients': 'клиентов',
    'satisfaction': 'удовлетворенность',
    'satisfied_customers': 'Довольные клиенты',
    
    // Чат
    'online_assistant': 'ОНЛАЙН ПОМОЩНИК',
    'online_chat': 'Онлайн Чат',
    'welcome': 'Добро пожаловать в CARS N QUOTES! Чем я могу вам помочь сегодня?',
    'typing_message': 'Введите ваше сообщение...',
    'send': 'Отправить',
    'auto_reply': 'Спасибо за ваше сообщение. Наши специалисты свяжутся с вами в ближайшее время. Если у вас есть дополнительные вопросы, не стесняйтесь задавать.',
    
    // Футер
    'all_rights_reserved': 'Все права защищены',
  },
  
  en: {
    // Header
    'time': 'TIME',
    
    // Main screen
    'premium_auto': 'PREMIUM AUTO SERVICE',
    'we_integrate': 'We integrate',
    'experience': 'experience',
    'technology': 'technology',
    'and': 'and',
    'brand_identity': 'brand identity',
    'company_intro': 'CARS N QUOTES — your reliable partner in the world of leasing and car selection.',
    'company_description': 'We offer flexible leasing, 24/7 consultations, and an innovative car selection system that takes into account your every wish. With us, you get the perfect car without unnecessary worries.',
    'ask_in_chat': 'Ask in chat',
    
    // Statistics
    'years_experience': 'years of experience',
    'clients': 'clients',
    'satisfaction': 'satisfaction',
    'satisfied_customers': 'Satisfied customers',
    
    // Chat
    'online_assistant': 'ONLINE ASSISTANT',
    'online_chat': 'Online Chat',
    'welcome': 'Welcome to CARS N QUOTES! How can I help you today?',
    'typing_message': 'Type your message...',
    'send': 'Send',
    'auto_reply': 'Thank you for your message. Our specialists will contact you soon. If you have any additional questions, feel free to ask.',
    
    // Footer
    'all_rights_reserved': 'All rights reserved',
  },
  
  ka: {
    // ქუდი
    'time': 'დრო',
    
    // ძირითადი ეკრანი
    'premium_auto': 'პრემიუმ ავტო სერვისი',
    'we_integrate': 'ჩვენ ვაერთიანებთ',
    'experience': 'გამოცდილებას',
    'technology': 'ტექნოლოგიებს',
    'and': 'და',
    'brand_identity': 'ბრენდის იდენტობას',
    'company_intro': 'CARS N QUOTES — თქვენი საიმედო პარტნიორი ლიზინგისა და ავტომობილის შერჩევის სამყაროში.',
    'company_description': 'ჩვენ გთავაზობთ მოქნილ ლიზინგს, 24/7 კონსულტაციებს და ავტომობილის შერჩევის ინოვაციურ სისტემას, რომელიც ითვალისწინებს თქვენს ყველა სურვილს. ჩვენთან ერთად, თქვენ იღებთ სრულყოფილ ავტომობილს ზედმეტი საზრუნავის გარეშე.',
    'ask_in_chat': 'ჩატში კითხვა',
    
    // სტატისტიკა
    'years_experience': 'წლის გამოცდილება',
    'clients': 'კლიენტები',
    'satisfaction': 'კმაყოფილება',
    'satisfied_customers': 'კმაყოფილი მომხმარებლები',
    
    // ჩატი
    'online_assistant': 'ონლაინ ასისტენტი',
    'online_chat': 'ონლაინ ჩატი',
    'welcome': 'კეთილი იყოს თქვენი მობრძანება CARS N QUOTES-ში! როგორ შემიძლია დაგეხმაროთ დღეს?',
    'typing_message': 'შეიყვანეთ თქვენი შეტყობინება...',
    'send': 'გაგზავნა',
    'auto_reply': 'გმადლობთ თქვენი შეტყობინებისთვის. ჩვენი სპეციალისტები მალე დაგიკავშირდებიან. თუ გაქვთ დამატებითი კითხვები, ნუ მოგერიდებათ დასვით.',
    
    // ქვედა კოლონტიტული
    'all_rights_reserved': 'ყველა უფლება დაცულია',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

// Провайдер, который предоставляет язык и функции для смены языка
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Используем функцию инициализации useState для избежания повторного чтения из localStorage
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const savedLanguage = localStorage.getItem('language') as Language;
      // Проверяем, что сохраненный язык есть в списке доступных языков
      return availableLanguages.includes(savedLanguage) 
        ? savedLanguage 
        : defaultLanguage;
    } catch (e) {
      // В случае ошибки с localStorage (e.g. в приватном режиме или при отсутствии разрешений)
      console.warn('Failed to get language from localStorage:', e);
      return defaultLanguage;
    }
  });

  // Мемоизируем функцию для изменения языка
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('language', lang);
    } catch (e) {
      console.warn('Failed to save language to localStorage:', e);
    }
  }, []);

  // Мемоизируем функцию для получения перевода по ключу
  const t = useCallback((key: TranslationKey): string => {
    const translation = translations[language]?.[key];
    if (!translation) {
      console.warn(`Translation missing for key "${key}" in language "${language}"`);
      return key;
    }
    return translation;
  }, [language]);

  // Создаем мемоизированное значение контекста для предотвращения ненужных ререндеров
  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    t,
    availableLanguages
  }), [language, setLanguage, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Хук для использования языкового контекста
export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext; 