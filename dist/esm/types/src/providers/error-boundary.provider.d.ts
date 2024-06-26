import React from 'react';
export interface ErrorBoundaryProps {
    endPoint?: string;
    environment?: string;
    apiKey: string;
    secretKey: string;
    projectId: number;
    children: React.ReactNode;
}
export declare class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
    dataProvider: any;
    baseUrl: string;
    constructor(props: ErrorBoundaryProps);
    componentDidCatch(error: Error): void;
    render(): React.ReactNode;
}
