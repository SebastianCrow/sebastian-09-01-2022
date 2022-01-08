import translationsEn from './en.json';
import { getLanguageCode } from '../shared/utils/browser.util';

type SUPPORTED_LOCALE = 'en';
export const DEFAULT_LOCALE: SUPPORTED_LOCALE = 'en';

export const CURRENT_LOCALE = getLanguageCode();

const allTranslations: Record<SUPPORTED_LOCALE, Record<string, string>> = {
  en: translationsEn,
};

// TODO: Think of a nice key nesting with typings
export const translations =
  allTranslations[CURRENT_LOCALE as SUPPORTED_LOCALE] ??
  allTranslations[DEFAULT_LOCALE];
