import {FONTS} from './typography';

export type Language = 'zh' | 'en';

/** Inline bilingual helper — pick Chinese or English value based on language */
export function L<T>(lang: Language, zh: T, en: T): T {
  return lang === 'zh' ? zh : en;
}

/** Return the appropriate font family for the given language and role */
export function fontFor(lang: Language, role: 'heading' | 'body'): string {
  if (lang === 'en') {
    return role === 'heading' ? FONTS.heading : FONTS.body;
  }
  return FONTS.cn;
}
