import React from 'react';
import { Logger } from '../helpers';

interface IApplicationContext {
  logger: Logger;
}

export const ApplicationContext = React.createContext<IApplicationContext>({
  logger: Logger.getInstance(),
});
