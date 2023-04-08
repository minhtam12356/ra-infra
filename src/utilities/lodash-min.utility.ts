export const isEmpty = (s: string) => {
  return !s || s?.length === 0;
};

export const get = (obj: any, path: any, defValue?: any) => {
  if (!path) {
    return undefined;
  }

  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  if (!pathArray) {
    return undefined;
  }

  const result = pathArray.reduce((prevObj: any, key: any) => prevObj && prevObj[key], obj);
  return result === undefined ? defValue : result;
};

export const set = (obj: any, path: any, value: any) => {
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);

  pathArray.reduce((acc: any, key: any, i: any) => {
    if (acc[key] === undefined) {
      acc[key] = {};
    }

    if (i === pathArray.length - 1) {
      acc[key] = value;
    }

    return acc[key];
  }, obj);
};

export const round = (num: number, precision: number) => {
  const modifier = 10 ** precision;
  return Math.round(num * modifier) / modifier;
};
