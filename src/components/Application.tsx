import React from 'react';
import { Admin, AdminProps, Resource, ResourceProps } from 'react-admin';
import { ApplicationContext, IApplication } from '../common';
import { getAuthProvider, getDataProvider, getI18nProvider } from '../providers';

export const Application: React.FC<IApplication> = (props: IApplication) => {
  const { resources, ...restProps } = props;

  const { logger } = React.useContext(ApplicationContext);

  const adminProps = React.useMemo(() => {
    const { baseUrl, i18n = {}, ...rest } = restProps;
    const rs: AdminProps = {
      i18nProvider: getI18nProvider({ i18n }),
      ...rest,
    };

    if (baseUrl) {
      const dataProvider = getDataProvider({ baseUrl });
      rs.dataProvider = dataProvider;
      rs.authProvider = getAuthProvider({ dataProvider });
    }

    return rs;
  }, [restProps]);

  React.useEffect(() => {
    logger.info('[Application] Mount main application');

    return () => {
      logger.info('[Application] Unmount main application');
    };
  }, []);

  return (
    <Admin {...adminProps}>
      {resources?.map((resource: ResourceProps) => {
        return <Resource key={resource.name} {...resource} />;
      })}
    </Admin>
  );
};
