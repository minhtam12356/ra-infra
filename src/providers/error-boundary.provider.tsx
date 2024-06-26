import React from 'react';
import { encrypt } from '../utilities';
import { getDataProvider } from './data.provider';
import { App } from '../common/constants';

const crashReportBaseUrl = 'http://170.187.198.24:1198/v1/api/';

export interface ErrorBoundaryProps {
  endPoint?: string;
  environment?: string;
  apiKey: string;
  secretKey: string;
  projectId: number;
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  dataProvider: any;
  baseUrl: string;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.baseUrl = props.endPoint ?? crashReportBaseUrl;
    this.dataProvider = getDataProvider({ baseUrl: this.baseUrl, authPath: '' });
  }

  componentDidCatch(error: Error) {
    const { apiKey, secretKey, environment = '', projectId } = this.props;
    const regex = /http[^\n]*/;
    const matches = error?.stack?.match(regex);
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

    this.dataProvider(App.DEFAULT_FETCH_METHOD, this.baseUrl, {
      method: 'POST',
      body: configPayload,
    });
  }

  render() {
    const { children } = this.props;
    return children;
  }
}
