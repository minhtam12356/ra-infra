import React from 'react';
export interface ErrorBoundaryConfig {
    endPoint?: string;
    environment?: string;
    apiKey: string;
    secretKey: string;
    projectId: number;
}
export interface ErrorBoundaryProps {
    config: ErrorBoundaryConfig;
    children: React.ReactNode;
}
export declare const ErrorBoundary: React.FC<ErrorBoundaryProps>;
