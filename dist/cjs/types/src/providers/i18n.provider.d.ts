type TListLanguage = {
    locale: string;
    name: string;
};
export declare const getI18nProvider: (opts: {
    i18n: Record<string | symbol, any>;
    listLanguages?: TListLanguage[];
}) => import("ra-core").I18nProvider;
export {};
