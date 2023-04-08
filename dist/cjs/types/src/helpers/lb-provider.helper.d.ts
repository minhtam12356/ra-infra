import { IParam } from '../common';
export declare const GET_LIST = "GET_LIST";
export declare const GET_ONE = "GET_ONE";
export declare const GET_MANY = "GET_MANY";
export declare const GET_MANY_REFERENCE = "GET_MANY_REFERENCE";
export declare const CREATE = "CREATE";
export declare const UPDATE = "UPDATE";
export declare const UPDATE_MANY = "UPDATE_MANY";
export declare const DELETE = "DELETE";
export declare const DELETE_MANY = "DELETE_MANY";
export declare const SEND = "SEND";
export declare const LbProviderGetter: (opts: {
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
