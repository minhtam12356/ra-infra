import React from 'react';
import { ApplicationContext, IApplication } from '../common';
import { Logger } from '../helpers';
import { Application } from './Application';

// -------------------------------------------------------------------------------
export const ApplicationWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const logger = React.useMemo(() => Logger.getInstance(), []);

  return (
    <React.Suspense fallback={<span>Loading...!</span>}>
      <ApplicationContext.Provider
        value={{
          logger,
        }}>
        {children}
      </ApplicationContext.Provider>
    </React.Suspense>
  );
};

// -------------------------------------------------------------------------------
export const MainApplication: React.FC<IApplication> = (props) => {
  return (
    <ApplicationWrapper>
      <Application {...props} />
    </ApplicationWrapper>
  );
};
