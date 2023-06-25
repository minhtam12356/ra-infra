export declare class App {
    static readonly TIME_OFFSET = "+07:00";
    static readonly DEFAULT_LOCALE = "en.UTF-8";
    static readonly SECRET = "application.secret";
    static readonly DEFAULT_FETCH_METHOD = "send";
}
export declare class Authentication {
    static readonly TYPE_BASIC = "Basic";
    static readonly TYPE_BEARER = "Bearer";
    static readonly STRATEGY_BASIC = "basic";
    static readonly STRATEGY_JWT = "jwt";
}
export declare class LocalStorageKeys {
    static readonly KEY_AUTH_TOKEN_VALUE = "@app/auth/token/value";
    static readonly KEY_AUTH_TOKEN_TYPE = "@app/auth/token/type";
    static readonly KEY_AUTH_TOKEN = "@app/auth/token";
    static readonly KEY_AUTH_IDENTITY = "@app/auth/identity";
    static readonly KEY_AUTH_PERMISSION = "@app/auth/permission";
}
