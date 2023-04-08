import get from 'lodash/get';
import { sanitizeFetchType } from 'react-admin';
import { LbProviderGetter } from '../helpers';
import { getError } from '../utilities';

export const getDataProvider = (opts: { baseUrl: string }) => {
  const dataProviderHelper = LbProviderGetter(opts);

  return (type: string, resource: string, params: any): Promise<any> => {
    const fetchType = sanitizeFetchType(type);
    const fetcher = get(dataProviderHelper, fetchType);
    if (!fetcher) {
      throw getError({ message: '[dataProvider] Invalid fetcher to send request' });
    }

    return fetcher?.(resource, params);
  };
};
