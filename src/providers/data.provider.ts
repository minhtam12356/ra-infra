import get from 'lodash/get';
import { sanitizeFetchType } from 'react-admin';
import { LbProviderGetter } from '../helpers';
import { getError } from '../utilities';
import { AuthService } from '../services';
import { Authentication } from '../common';

const getAuthHeader = () => {
  const authService = AuthService.getInstance();
  const authToken = authService.getAuthToken();
  if (!authToken?.value) {
    throw getError({ message: '[dataProvider][getAuthHeader] Invalid auth token to fetch!', statusCode: 401 });
  }
  return `${Authentication.TYPE_BEARER} ${authToken.value}`;
};

export const getDataProvider = (opts: { baseUrl: string; authPath: string }) => {
  const dataProviderHelper = LbProviderGetter(opts);
  const NO_AUTH_PATHS = new Set([opts.authPath]);

  return (type: string, resource: string, params: any): Promise<any> => {
    const fetchType = sanitizeFetchType(type);
    const fetcher = get(dataProviderHelper, fetchType);
    if (!fetcher) {
      throw getError({ message: '[dataProvider] Invalid fetcher to send request' });
    }

    if (NO_AUTH_PATHS.has(resource)) {
      return fetcher?.(resource, params);
    }

    const fetchParams = { ...(params ?? {}) };
    if (!fetchParams.headers) {
      fetchParams.headers = {};
    }

    fetchParams.headers['Authorization'] = getAuthHeader();
    return fetcher?.(resource, params);
  };
};
