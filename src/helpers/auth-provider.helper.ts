import { AuthProvider } from 'react-admin';
import { IDataProvider } from '../common';
import { AuthService } from '../services';
import { getError } from '../utilities';
import { App } from '../common/constants';

const authService = AuthService.getInstance();

export const AuthProviderGetter = (opts: {
  dataProvider: IDataProvider;
  authPath: string;
  checkAuth?: () => Promise<void>;
}): AuthProvider => {
  const { dataProvider, authPath } = opts;

  if (!dataProvider) {
    throw getError({ message: '[AuthProviderGetter] Invalid data provider to init auth provider!' });
  }

  return {
    // -------------------------------------------------------------
    // LOGIN
    // -------------------------------------------------------------
    login: (body: any) => {
      return new Promise((resolve, reject) => {
        dataProvider(App.DEFAULT_FETCH_METHOD, authPath, {
          method: 'post',
          body,
        })
          .then((rs) => {
            const { token, userId } = rs.data;
            authService.saveAuthToken(token);
            authService.saveAuthIdentify({ userId });
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
      return (
        opts?.checkAuth?.() ||
        new Promise((resolve, reject) => {
          const token = authService.getAuthToken();
          if (!token?.value) {
            reject({ redirectTo: 'login' });
          }

          dataProvider(App.DEFAULT_FETCH_METHOD, 'auth/who-am-i', { method: 'GET' })
            .then((rs) => {
              if (!rs?.data?.userId) {
                reject({ redirectTo: 'login' });
              }

              resolve();
            })
            .catch((error) => {
              console.error('[checkAuth] Error: ', error);
              // reject({ redirectTo: 'login' });
            });
        })
      );
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
      return new Promise((resolve, reject) => {
        const userIdentity = authService.getUser();
        if (!userIdentity?.userId) {
          reject({ message: '[getIdentity] No userId to get user identity!' });
        }

        dataProvider(App.DEFAULT_FETCH_METHOD, `users/${userIdentity.userId}/profile`, { method: 'GET' })
          .then((rs) => {
            if (!rs?.data) {
              reject({ message: `[getIdentity] Not found any profile according to userId: ${userIdentity.userId}` });
            }

            resolve(rs.data);
          })
          .catch((error: Error) => {
            console.error('[getIdentity] Error: ', error);
            reject({ message: error?.message, error });
          });
      });
    },
    // -------------------------------------------------------------
    // GET_PERMISSIONS
    // -------------------------------------------------------------
    getPermissions: () => Promise.resolve(),
  };
};
