import React from 'react';
export interface ErrorBoundaryConfig {
    endPoint?: string;
    environment?: string;
    apiKey: string;
    secretKey: string;
    projectId: number;
    children: React.ReactNode;
}
export interface ErrorBoundaryProps {
    config: ErrorBoundaryConfig;
}
export declare const ErrorBoundary: React.FC<ErrorBoundaryProps>;
