import React from 'react';
import { Admin, Resource, ResourceProps } from 'react-admin';
import { ApplicationContext, IApplication } from '../common';
import { getAuthProvider, getDataProvider, getI18nProvider } from '../providers';

export const Application: React.FC<IApplication> = (props: IApplication) => {
  const { resources, ...restProps } = props;

  const { logger } = React.useContext(ApplicationContext);

  const adminProps = React.useMemo(() => {
    const { baseUrl, i18n = {}, ...rest } = restProps;

    const dataProvider = getDataProvider({ baseUrl });
    const i18nProvider = getI18nProvider({ i18n });
    const authProvider = getAuthProvider({ dataProvider });

    return {
      dataProvider,
      i18nProvider,
      authProvider,
      ...rest,
    };
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
