import { AuthProvider } from 'react-admin';
import { IDataProvider } from '../common';
import { AuthService } from '../services';
import { getError } from '../utilities';
import { App } from '../common/constants';

const authService = AuthService.getInstance();

export const AuthProviderGetter = (opts: { dataProvider: IDataProvider; authPath: string }): AuthProvider => {
  const { dataProvider, authPath } = opts;

  if (!dataProvider) {
    throw getError({ message: '[AuthProviderGetter] Invalid data provider to init auth provider!' });
  }

  return {
    // -------------------------------------------------------------
    // LOGIN
    // -------------------------------------------------------------
    login: (params: any) => {
      return new Promise((resolve, reject) => {
        dataProvider(App.DEFAULT_FETCH_METHOD, authPath, {
          method: 'post',
          body: {
            identifier: {
              scheme: 'username',
              value: params.username,
            },
            credential: {
              scheme: 'basic',
              value: params.password,
            },
          },
        })
          .then((rs) => {
            const { token } = rs.data;
            authService.saveAuthToken(token);
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
    checkAuth: async () => {
      const token = authService.getAuthToken();
      if (!token?.value) {
        return Promise.reject({ redirectTo: 'login' });
      }

      return dataProvider(App.DEFAULT_FETCH_METHOD, 'auth/who-am-i', { method: 'GET' }).then((rs) => {
        if (!rs?.data?.userId) {
          return Promise.reject({ redirectTo: 'login' });
        }

        return Promise.resolve();
      });
    },
    // -------------------------------------------------------------
    // LOGOUT
    // -------------------------------------------------------------
    logout: () =>
      new Promise((resolve) => {
        authService.cleanUp();
        resolve();
      }),
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
