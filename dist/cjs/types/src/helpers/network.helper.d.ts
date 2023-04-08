interface IRequestOptions {
    url: string;
    method?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options';
    params?: object;
    body?: object;
    configs?: object;
}
export declare class NetworkHelper {
    private name;
    constructor(opts: {
        name: string;
        logger?: any;
    });
    getProtocol(url: string): "http" | "https";
    send(opts: IRequestOptions, logger?: any): Promise<Response>;
    get(opts: IRequestOptions): Promise<Response>;
    post(opts: IRequestOptions): Promise<Response>;
    put(opts: IRequestOptions): Promise<Response>;
    patch(opts: IRequestOptions): Promise<Response>;
    delete(opts: IRequestOptions): Promise<Response>;
}
export {};
