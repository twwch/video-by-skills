import React, { createContext, useContext } from 'react';
import type { Language } from '../config/content';

const LanguageContext = createContext<Language>('zh');

export const LanguageProvider: React.FC<{
  language: Language;
  children: React.ReactNode;
}> = ({ language, children }) => (
  <LanguageContext.Provider value={language}>{children}</LanguageContext.Provider>
);

export const useLanguage = () => useContext(LanguageContext);
