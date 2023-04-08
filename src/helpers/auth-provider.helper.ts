import { AuthProvider } from 'react-admin';
import { IDataProvider } from '../common';
import { AuthService } from '../services';
import { getError } from '../utilities';

const DEFAULT_FETCH_METHOD = 'send';
const authService = AuthService.getInstance();

export const AuthProviderGetter = (opts: { dataProvider: IDataProvider }): AuthProvider => {
  const { dataProvider } = opts;

  if (!dataProvider) {
    throw getError({ message: '[AuthProviderGetter] Invalid data provider to init auth provider!' });
  }

  return {
    // -------------------------------------------------------------
    // LOGIN
    // -------------------------------------------------------------
    login: (params: any) => {
      return new Promise((resolve, reject) => {
        dataProvider(DEFAULT_FETCH_METHOD, 'login', { method: 'post', body: params })
          .then((rs) => {
            resolve(rs);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // -------------------------------------------------------------
    // CHECK_ERROR
    // -------------------------------------------------------------
    checkError: (params: any) => {
      const { status } = params;
      if (status === 401 || status === 403) {
        // authService.cleanUpAuth();
        return Promise.reject({ redirectTo: 'login' });
      }

      return Promise.resolve();
    },
    // -------------------------------------------------------------
    // CHECK_AUTH
    // -------------------------------------------------------------
    checkAuth: () => {
      const token = authService.getToken();
      if (token?.base || token?.jwt) {
        return Promise.resolve();
      }

      // authService.cleanUpAuth();
      return Promise.reject({ redirectTo: 'login' });
    },
    // -------------------------------------------------------------
    // LOGOUT
    // -------------------------------------------------------------
    logout: () => Promise.resolve(),
    // -------------------------------------------------------------
    // GET_IDENTIFIER
    // -------------------------------------------------------------
    getIdentity: () => {
      return Promise.resolve({ id: 0, fullName: 'TEST', username: 'TEST' });
    },
    // -------------------------------------------------------------
    // GET_PERMISSIONS
    // -------------------------------------------------------------
    getPermissions: () => Promise.resolve(),
  };
};
