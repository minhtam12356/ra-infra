export declare const getDataProvider: (opts: {
    baseUrl: string;
    authPath: string;
}) => (type: string, resource: string, params: any) => Promise<any>;
