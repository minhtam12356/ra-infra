export declare class AuthService {
    private static instance;
    constructor();
    static getInstance(): AuthService;
    getSr(user: any): string;
    getUser(): any;
    getRoles: () => Set<unknown>;
    getToken(): any;
    getAuthorizationToken(): void;
}
