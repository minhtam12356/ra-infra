export class App {
  static readonly TIME_OFFSET = '+07:00';
  static readonly DEFAULT_LOCALE = 'en.UTF-8';
  static readonly SECRET = 'application.secret';
}

export class Authentication {
  // Jwt
  static readonly TYPE_BASIC = 'Basic';
  static readonly TYPE_BEARER = 'Bearer';

  // Strategy
  static readonly STRATEGY_BASIC = 'basic';
  static readonly STRATEGY_JWT = 'jwt';
}

export class LocalStorageKeys {
  static readonly KEY_AUTH_TOKEN_VALUE = '@app/auth/token/value';
  static readonly KEY_AUTH_TOKEN_TYPE = '@app/auth/token/type';

  static readonly KEY_AUTH_TOKEN = '@app/auth/token';
  static readonly KEY_AUTH_IDENTITY = '@app/auth/identity';
  static readonly KEY_AUTH_PERMISSION = '@app/auth/permission';
}
