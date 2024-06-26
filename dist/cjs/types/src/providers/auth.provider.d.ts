import { AuthProvider } from 'react-admin';
import { IDataProvider } from '../common/types';
export declare const getAuthProvider: (opts: {
    dataProvider: IDataProvider;
    authPath: string;
    checkAuth?: () => Promise<void>;
}) => AuthProvider;
