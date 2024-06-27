import React, { useEffect, useMemo } from 'react';
import { encrypt } from '../utilities';
import { getDataProvider } from './data.provider';
import { App } from '../common/constants';

const crashReportBaseUrl = 'http://170.187.198.24:1198/v1/api/';
const regexFilterUrl = /http[^\n]*/;

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

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ config, children }) => {
  const { endPoint = crashReportBaseUrl, environment = '', apiKey, secretKey, projectId } = config;
  const dataProvider = useMemo(() => {
    return getDataProvider({ baseUrl: endPoint, authPath: '' });
  }, [endPoint, getDataProvider]);

  useEffect(() => {
    window.addEventListener('error', ({ error }) => {
      const matches = error?.stack?.match(regexFilterUrl);
      const parts = matches?.[0].split(':') ?? [];

      const filename = `${parts[0]}:${parts[1]}:${parts[2]}`;

      const lineno = parts[3];
      const colno = parts[4];

      const signature = encrypt(apiKey, secretKey);

      const configPayload = {
        appVersion: '',
        appType: 'uncaughtError',
        type: 'Error',
        environment,
        device: {
          language: window.navigator.language,
          userAgent: window.navigator.userAgent,
          title: window.document.title,
          referrer: window.origin,
          url: window.origin,
        },
        sdk: {
          platform: '',
          version: '',
        },
        actions: [],
        details: {
          name: error.name,
          message: error.message,
          filename,
          lineno,
          colno,
          stack: error.stack,
        },
        metadata: {},
        extra: {},
        projectId,
        signature,
      };

      dataProvider(App.DEFAULT_FETCH_METHOD, endPoint, {
        method: 'POST',
        body: configPayload,
      });
    });
  }, []);

  return children;
};
