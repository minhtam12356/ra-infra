import isEmpty from 'lodash/isEmpty';
import React from 'react';
import { Admin, AdminProps, CustomRoutes, Resource, ResourceProps } from 'react-admin';
import { Route } from 'react-router-dom';
import { ApplicationContext, IApplication } from '../common';
import { getAuthProvider, getDataProvider, getI18nProvider } from '../providers';

type TRoute = {
  path: string;
  element: React.ReactNode;
};

export const Application: React.FC<IApplication> = (props: IApplication) => {
  const { resources, routesCustom, ...restProps } = props;

  const { logger } = React.useContext(ApplicationContext);

  const adminProps = React.useMemo(() => {
    const { urls, i18n = {}, ...rest } = restProps;

    const { base: baseUrl, auth = 'login' } = urls;
    const rs: AdminProps = { i18nProvider: getI18nProvider({ i18n }), ...rest };

    if (baseUrl && !isEmpty(baseUrl)) {
      const dataProvider = getDataProvider({ baseUrl, authPath: auth });
      rs.dataProvider = dataProvider;
      rs.authProvider = getAuthProvider({ dataProvider, authPath: auth });
    }

    return rs;
  }, [restProps, getI18nProvider, getAuthProvider, getDataProvider]);

  React.useEffect(() => {
    logger.info('Mounted RA application | Admin props', adminProps);

    return () => {
      logger.info('Unmount RA application: ', adminProps);
    };
  }, [logger, adminProps]);

  return (
    <Admin {...adminProps}>
      {resources?.map((resource: ResourceProps) => {
        return <Resource key={resource.name} {...resource} />;
      })}

      {routesCustom?.length && (
        <CustomRoutes>
          {routesCustom.map((route: TRoute) => {
            return <Route key={route.path} {...route} />;
          })}
        </CustomRoutes>
      )}
    </Admin>
  );
};
