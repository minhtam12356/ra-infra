import polyglotI18nProvider from 'ra-i18n-polyglot';

type TListLanguage = {
  locale: string;
  name: string;
};

const [language] = (navigator?.language || 'en-US').split('-');

export const getI18nProvider = (opts: { i18n: Record<string | symbol, any>; listLanguages?: TListLanguage[] }) => {
  const { i18n: i18nSources, listLanguages } = opts;

  return polyglotI18nProvider(
    (locale) => {
      return i18nSources?.[locale];
    },
    language,
    listLanguages?.length
      ? listLanguages
      : {
          allowMissing: true,
          onMissingKey: (key: string, _: any, __: any) => key,
        },
  );
};
