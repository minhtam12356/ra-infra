import { decrypt } from '@tanphat199/utilities';
import { LocalStorageKeys } from '../common';

export class AuthService {
  private static instance: AuthService;

  constructor() { }

  static getInstance(): AuthService {
    if (!this.instance) {
      this.instance = new AuthService();
    }

    return this.instance;
  }

  // ------------------------------------------------------------------------------------
  getSr(user: any) {
    const { id = 0, username = '', email = '', status = '' } = user;
    return `${id}_${username}@@${email}_${status}@mT5h`;
  }

  // ------------------------------------------------------------------------------------
  getUser() {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.KEY_AUTH_IDENTITY) || '{}');
  }

  // ------------------------------------------------------------------------------------
  getRoles = () => {
    const roles = JSON.parse(localStorage.getItem(LocalStorageKeys.KEY_AUTH_PERMISSION) || '[]');
    return new Set(roles);
  };

  // ------------------------------------------------------------------------------------
  getToken() {
    try {
      const user = this.getUser();
      const sr = this.getSr(user);

      const encryptedToken = localStorage.getItem(LocalStorageKeys.KEY_AUTH_TOKEN) ?? '';
      const de = decrypt(encryptedToken, sr);
      return JSON.parse(de);
    } catch (e) {
      return null;
    }
  }

  // ------------------------------------------------------------------------------------
  getAuthorizationToken() { }
}
