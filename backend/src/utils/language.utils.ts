import _ from 'lodash';

import { Language } from '../shared/language';

export function resolveLanguage(
  language: Language,
  en: string,
  fr: string,
  de: string,
  it: string,
): string {
  const content = {
    [Language.EN]: en,
    [Language.FR]: fr,
    [Language.DE]: de,
    [Language.IT]: it,
  }[language];

  if (_.isEmpty(content)) {
    return en;
  }

  return content;
}

export function languageFromCodeOrUndefined(
  code: string,
): Language | undefined {
  const normalizedCode = String(code).toLowerCase();

  return Object.values(Language).find(
    (lang) => (lang as string).toLowerCase() === normalizedCode,
  );
}

export function languageFromCode(code: string): Language {
  return languageFromCodeOrUndefined(code) ?? Language.EN;
}
