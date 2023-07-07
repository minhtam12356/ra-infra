export declare class DIContainer {
    private static instance;
    private container;
    constructor();
    static getInstance(): DIContainer;
    get<E>(key: string): E;
    set<E>(key: string, value: E): void;
    registry(): Map<string, any>;
}
