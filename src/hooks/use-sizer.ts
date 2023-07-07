import React from 'react';
import isEmpty from 'lodash/isEmpty';

export const useSizer = (props: { componentRef?: any; componentId?: string }): { width: number; height: number } => {
  const component = React.useRef<any>();
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  const resizeListener = React.useCallback(() => {
    const rect = component?.current?.getBoundingClientRect() || { width: 0, height: 0 };
    setSize({ width: rect.width, height: rect.height });
  }, []);

  React.useEffect(() => {
    const { componentId, componentRef } = props;
    component.current = componentRef?.current;
    if (componentId && componentId !== null && !isEmpty(componentId)) {
      component.current = document.getElementById(componentId);
    }

    window.addEventListener('resize', resizeListener);

    const rect = component?.current?.getBoundingClientRect() || { width: 0, height: 0 };
    setSize({ width: rect.width, height: rect.height });
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [props, resizeListener]);

  return size;
};
