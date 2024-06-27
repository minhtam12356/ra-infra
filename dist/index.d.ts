import React$1 from 'react';
import { AuthProvider, AdminProps, ResourceProps, LegacyDataProvider } from 'react-admin';
import * as ra_core from 'ra-core';

declare class Authentication {
    static readonly TYPE_BASIC = "Basic";
    static readonly TYPE_BEARER = "Bearer";
    static readonly STRATEGY_BASIC = "basic";
    static readonly STRATEGY_JWT = "jwt";
}
declare class LocalStorageKeys {
    static readonly KEY_AUTH_TOKEN_VALUE = "@app/auth/token/value";
    static readonly KEY_AUTH_TOKEN_TYPE = "@app/auth/token/type";
    static readonly KEY_AUTH_TOKEN = "@app/auth/token";
    static readonly KEY_AUTH_IDENTITY = "@app/auth/identity";
    static readonly KEY_AUTH_PERMISSION = "@app/auth/permission";
}

declare class Logger {
    private static instance;
    constructor();
    static getInstance(): Logger;
    getTimestamp(): string;
    generateLog(opts: {
        level: 'INFO' | 'WARN' | 'ERROR';
        message: string;
    }): string;
    info(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
}

declare const GET_LIST = "GET_LIST";
declare const GET_ONE = "GET_ONE";
declare const GET_MANY = "GET_MANY";
declare const GET_MANY_REFERENCE = "GET_MANY_REFERENCE";
declare const CREATE = "CREATE";
declare const UPDATE = "UPDATE";
declare const UPDATE_MANY = "UPDATE_MANY";
declare const DELETE = "DELETE";
declare const DELETE_MANY = "DELETE_MANY";
declare const SEND = "SEND";
declare const LbProviderGetter: (opts: {
    baseUrl: string;
}) => {
    getList(resource: string, params: {
        [key: string]: any;
    }): Promise<unknown>;
    getOne(resource: string, params: {
        [key: string]: any;
    }): Promise<unknown>;
    getMany(resource: string, params: {
        [key: string]: any;
    }): Promise<unknown>;
    getManyReference(resource: string, params: {
        [key: string]: any;
    }): Promise<unknown>;
    create(resource: string, params: IParam): Promise<unknown>;
    update(resource: string, params: IParam): Promise<unknown>;
    updateMany(resource: string, params: {
        [key: string]: any;
    }): Promise<unknown>;
    delete(resource: string, params: {
        [key: string]: any;
    }): Promise<unknown>;
    deleteMany(resource: string, params: IParam): Promise<unknown>;
    send(resource: string, params: IParam): Promise<unknown>;
};

declare const AuthProviderGetter: (opts: {
    dataProvider: IDataProvider;
    authPath: string;
    checkAuth?: () => Promise<void>;
}) => AuthProvider;

interface IApplicationContext {
    logger: Logger;
}
declare const ApplicationContext: React$1.Context<IApplicationContext>;

type TRoute = {
    path: string;
    element: React.ReactNode;
};
interface IApplication extends AdminProps {
    urls: {
        base: string;
        auth?: string;
    };
    resources?: ResourceProps[];
    routesCustom?: TRoute[];
    i18n?: Record<string | symbol, any>;
    [key: string | symbol]: any;
}
type TRequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';
interface IRequestProps {
    headers?: {
        [key: string]: string | number;
    };
    body?: any;
    query?: any;
}
interface IParam {
    id?: string | number;
    method?: TRequestMethod;
    bodyType?: string;
    body?: any;
    file?: any;
    query?: {
        [key: string]: string | number;
    };
    headers?: {
        [key: string]: string | number;
    };
}
type IDataProvider = LegacyDataProvider;
type TDataProvider = (type: string, resource: string, params: IParam) => Promise<any>;
interface IDispatchAction<E> {
    type: string;
    payload?: E;
    log?: boolean;
}

declare const getDataProvider: (opts: {
    baseUrl: string;
    authPath: string;
}) => (type: string, resource: string, params: any) => Promise<any>;

type TListLanguage = {
    locale: string;
    name: string;
};
declare const getI18nProvider: (opts: {
    i18n: Record<string | symbol, any>;
    listLanguages?: TListLanguage[];
}) => ra_core.I18nProvider;

declare const getAuthProvider: (opts: {
    dataProvider: IDataProvider;
    authPath: string;
    checkAuth?: () => Promise<void>;
}) => AuthProvider;

interface ErrorBoundaryConfig {
    endPoint?: string;
    environment?: string;
    apiKey: string;
    secretKey: string;
    projectId: number;
    children: React$1.ReactNode;
}
interface ErrorBoundaryProps {
    config: ErrorBoundaryConfig;
}
declare const ErrorBoundary: React$1.FC<ErrorBoundaryProps>;

declare class AuthService {
    private static instance;
    static getInstance(): AuthService;
    getSr(user: any): string;
    getUser(): any;
    getRoles: () => Set<unknown>;
    getAuthToken(): any;
    saveAuthIdentify(opts: {
        userId: number;
        [key: string]: any;
    }): void;
    saveAuthToken(opts: {
        value: string;
        type: string;
    }): void;
    cleanUp(): void;
}

declare const Application: React$1.FC<IApplication>;

declare const ApplicationWrapper: React$1.FC<{
    children: React$1.ReactNode;
}>;
declare const Ra: React$1.FC<IApplication>;

export { Application, ApplicationContext, ApplicationWrapper, AuthProviderGetter, AuthService, Authentication, CREATE, DELETE, DELETE_MANY, ErrorBoundary, ErrorBoundaryConfig, ErrorBoundaryProps, GET_LIST, GET_MANY, GET_MANY_REFERENCE, GET_ONE, IApplication, IDataProvider, IDispatchAction, IParam, IRequestProps, LbProviderGetter, LocalStorageKeys, Logger, Ra, SEND, TDataProvider, TRequestMethod, TRoute, UPDATE, UPDATE_MANY, getAuthProvider, getDataProvider, getI18nProvider };
