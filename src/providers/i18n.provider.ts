import polyglotI18nProvider from 'ra-i18n-polyglot';

const [language] = (navigator?.language || 'ko-KR').split('-');

export const getI18nProvider = (opts: { i18n: Record<string | symbol, any> }) => {
  const { i18n: i18nSources } = opts;

  return polyglotI18nProvider(
    (locale) => {
      return i18nSources?.[locale];
    },
    language,
    {
      allowMissing: true,
      onMissingKey: (key: string, _: any, __: any) => key,
    },
  );
};
