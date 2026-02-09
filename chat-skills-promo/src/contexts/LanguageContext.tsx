import React, {createContext, useContext} from 'react';
import type {Language} from '../config/i18n';

const LanguageContext = createContext<Language>('zh');

export const LanguageProvider: React.FC<{
  language: Language;
  children: React.ReactNode;
}> = ({language, children}) => (
  <LanguageContext.Provider value={language}>{children}</LanguageContext.Provider>
);

export const useLanguage = (): Language => useContext(LanguageContext);
