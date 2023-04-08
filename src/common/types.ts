import { AdminProps, LegacyDataProvider, ResourceProps } from 'react-admin';

export interface IApplication extends AdminProps {
  urls: {
    base: string;
    auth?: string;
  };
  resources: ResourceProps[];
  i18n?: Record<string | symbol, any>;

  [key: string | symbol]: any;
}

export type TRequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options';

export interface IRequestProps {
  headers?: { [key: string]: string | number };
  body?: any;
  query?: any;
}

export interface IParam {
  id?: string | number;
  method?: TRequestMethod;
  bodyType?: string;
  body?: any;
  file?: any;
  query?: { [key: string]: string | number };
}

export type IDataProvider = LegacyDataProvider;
