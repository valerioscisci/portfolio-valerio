import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import it from './it';
import en from './en';

const i18nResources = {
  it: {
    translation: it,
  },
  en: {
    translation: en,
  },
};

export type I18NLang = keyof typeof i18nResources;

i18next
  .use({
    type: 'languageDetector',
    init: () => {},
    detect: () => 'it',
    cacheUserLanguage: (language: string) => {},
  })
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: i18nResources,
    debug: false,
    react: {
      useSuspense: true,
    },
  });

export const i18n = i18next;
