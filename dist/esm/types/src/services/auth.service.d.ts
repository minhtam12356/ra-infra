export declare class AuthService {
    private static instance;
    static getInstance(): AuthService;
    getSr(user: any): string;
    getUser(): any;
    getRoles: () => Set<unknown>;
    getAuthToken(): any;
    saveAuthToken(opts: {
        value: string;
        type: string;
    }): void;
    cleanUp(): void;
}
