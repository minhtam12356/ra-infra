import { AuthProvider } from 'react-admin';
import { IDataProvider } from '../common';
export declare const AuthProviderGetter: (opts: {
    dataProvider: IDataProvider;
    authPath: string;
    checkAuth?: () => Promise<void>;
}) => AuthProvider;
