import { AuthProvider } from 'react-admin';
import { IDataProvider } from '../common/types';
import { AuthProviderGetter } from '../helpers';

export const getAuthProvider = (opts: { dataProvider: IDataProvider }): AuthProvider => {
  const authProvider = AuthProviderGetter(opts);
  return authProvider;
};
