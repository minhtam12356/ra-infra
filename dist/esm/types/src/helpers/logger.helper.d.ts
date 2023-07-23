export declare class Logger {
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
