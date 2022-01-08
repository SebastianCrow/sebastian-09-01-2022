export const getLanguageCode = (): string => {
  return navigator.language.split(/[-_]/)[0]; // language without region code
};
