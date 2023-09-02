export declare class AuthService {
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
