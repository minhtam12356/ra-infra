declare const _default: ({
    input: string;
    output: {
        file: string;
        format: string;
        sourcemap: boolean;
    }[];
    plugins: import("rollup").Plugin<any>[];
} | {
    input: string;
    output: {
        file: string;
        format: string;
    }[];
    plugins: import("rollup").Plugin<any>[];
})[];
export default _default;
