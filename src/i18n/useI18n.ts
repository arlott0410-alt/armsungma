import { useEffect, useMemo, useState } from 'react';
import en from './en.json';
import lo from './lo.json';

const dictionaries = { en, lo } as const;
const storageKey = 'armsungma-lang';

type Language = keyof typeof dictionaries;

type Dictionary = typeof en;

const isLanguage = (value: string): value is Language => value in dictionaries;

const getStoredLanguage = (): Language => {
  if (typeof window === 'undefined') {
    return 'lo';
  }
  const saved = window.localStorage.getItem(storageKey);
  if (saved && isLanguage(saved)) {
    return saved;
  }
  return 'lo';
};

const getValueByPath = (obj: Dictionary, path: string): string => {
  const value = path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
  return typeof value === 'string' ? value : path;
};

export const useI18n = () => {
  const [language, setLanguage] = useState<Language>(() => getStoredLanguage());

  useEffect(() => {
    window.localStorage.setItem(storageKey, language);
    document.documentElement.lang = language === 'lo' ? 'lo' : 'en';
  }, [language]);

  const dictionary = useMemo(() => dictionaries[language], [language]);

  const t = (path: string) => getValueByPath(dictionary, path);

  return { language, setLanguage, dictionary, t };
};
