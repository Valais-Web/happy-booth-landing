import { useState, useEffect } from 'react';

type TranslationValue = string | TranslationValue[] | { [key: string]: TranslationValue };
type TranslationData = { [key: string]: TranslationValue };

const useTranslation = () => {
  const [translations, setTranslations] = useState<TranslationData>({});
  const [language, setLanguage] = useState<string>('fr');
  const [isLoading, setIsLoading] = useState(true);

  // Detect language from URL
  useEffect(() => {
    const detectLanguage = () => {
      const path = window.location.pathname;
      if (path.startsWith('/en')) {
        return 'en';
      }
      return 'fr';
    };

    const detectedLang = detectLanguage();
    setLanguage(detectedLang);
    loadTranslations(detectedLang);
  }, []);

  // Load translation file
  const loadTranslations = async (lang: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/locales/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${lang}`);
      }
      const data = await response.json();
      setTranslations(data);
    } catch (error) {
      console.error('Error loading translations:', error);
      // Fallback to French if English fails
      if (lang === 'en') {
        try {
          const fallbackResponse = await fetch('/locales/fr.json');
          const fallbackData = await fallbackResponse.json();
          setTranslations(fallbackData);
          setLanguage('fr');
        } catch (fallbackError) {
          console.error('Error loading fallback translations:', fallbackError);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        console.warn(`Translation key "${key}" not found for language "${language}"`);
        return key; // Return key as fallback
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  // Get array of translations (for FAQ items, features, etc.)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- callers cast items to their own shapes
  const tArray = (key: string): any[] => {
    const keys = key.split('.');
    let value: unknown = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        console.warn(`Translation array key "${key}" not found for language "${language}"`);
        return [];
      }
    }
    
    return Array.isArray(value) ? value : [];
  };

  return {
    t,
    tArray,
    language,
    isLoading,
    setLanguage: (newLang: string) => {
      setLanguage(newLang);
      loadTranslations(newLang);
    }
  };
};

export default useTranslation;