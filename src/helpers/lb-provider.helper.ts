import { getError, int, NetworkHelper } from '@tanphat199/utilities';
import isEmpty from 'lodash/isEmpty';
import set from 'lodash/set';
import { IParam, IRequestProps, TRequestMethod } from '../common';
import { Logger } from './logger.helper';

export const GET_LIST = 'GET_LIST';
export const GET_ONE = 'GET_ONE';
export const GET_MANY = 'GET_MANY';
export const GET_MANY_REFERENCE = 'GET_MANY_REFERENCE';
export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';
export const UPDATE_MANY = 'UPDATE_MANY';
export const DELETE = 'DELETE';
export const DELETE_MANY = 'DELETE_MANY';
export const SEND = 'SEND';

// -------------------------------------------------------------
const getRequestProps = (params: IParam) => {
  const { bodyType: type, body, file, query } = params;
  const rs: IRequestProps = { headers: {}, body: null, query };

  switch (type) {
    case 'form': {
      rs.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
      const formData = new FormData();

      for (const key in body) {
        if (!params.body[key]) {
          continue;
        }
        formData.append(key, body[key]);
      }
      rs.body = formData;
      break;
    }
    case 'file': {
      rs.headers = { 'Content-Type': 'multipart/form-data' };
      const formData = new FormData();

      formData.append('files', file);
      rs.body = formData;
      break;
    }
    default: {
      rs.headers = { 'Content-Type': 'application/json' };
      rs.body = body;
      break;
    }
  }

  return rs;
};

// -------------------------------------------------------------
const convertResponse = (opts: { response: any; type: string; params: any }) => {
  const { response, type, params } = opts;
  const { headers, data } = response;

  switch (type) {
    case GET_LIST:
    case GET_MANY_REFERENCE: {
      /* if (!headers['content-range'] || !headers['Content-Range']) {
        throw getError({
          message:
            'Missing "Content-Range" header in the HTTP Response. The REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. In case CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?',
        });
      } */

      return {
        data,
        total: int(headers['content-range']?.split('/')?.pop()) ?? data.length,
      };
    }
    case CREATE: {
      let rs: any = { id: data?.id };

      switch (params?.type) {
        case 'file': {
          rs = { ...rs, files: data };
          break;
        }
        default: {
          rs = { ...data, id: data.id };
          break;
        }
      }

      return { data: rs };
    }
    case DELETE: {
      return {
        data: { ...data, id: params.id },
      };
    }
    default: {
      return { data };
    }
  }
};

// -------------------------------------------------------------
const getRequestUrl = (opts: { baseUrl?: string; paths: Array<string> }) => {
  let baseUrl = opts?.baseUrl;
  const paths = opts?.paths ?? [];

  if (!baseUrl || isEmpty(baseUrl)) {
    throw getError({
      statusCode: 500,
      message: '[getRequestUrl] Invalid configuration for third party request base url!',
    });
  }

  if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.slice(0, -1); // Remove / at the end
  }

  const joined = paths
    .map((path: string) => {
      if (!path.startsWith('/')) {
        path = `/${path}`; // Add / to the start of url path
      }

      return path;
    })
    .join('');

  return `${baseUrl}${joined}`;
};

// -------------------------------------------------------------
// PROPS
// -------------------------------------------------------------
const networkService = new NetworkHelper({
  name: 'APPLICATION_NETWORK_SERVICE',
  requestConfigs: {
    withCredentials: true,
    timeout: 60 * 1000,
    validateStatus: (status: number) => {
      return status < 500;
    },
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  },
  logger: Logger.getInstance(),
});

// -------------------------------------------------------------
// DO_REQUEST
// -------------------------------------------------------------
const doRequest = (
  opts: IRequestProps & {
    baseUrl: string;
    type: string;
    method: TRequestMethod;
    paths: string[];
    params?: { [key: string]: any };
  },
) => {
  const { type, baseUrl, method, paths, headers, body, query, params } = opts;

  if (!baseUrl || isEmpty(baseUrl)) {
    throw getError({ message: '[doRequest] Invalid baseUrl to send request!' });
  }

  const url = getRequestUrl({ baseUrl, paths });
  return new Promise((resolve, reject) => {
    networkService
      .send({ url, method, params: query, body, configs: { headers } })
      .then((response) => {
        const normalized = convertResponse({ response, type, params });
        resolve(normalized);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const LbProviderGetter = (opts: { baseUrl: string }) => ({
  // -------------------------------------------------------------
  // GET_LIST
  // -------------------------------------------------------------
  getList(resource: string, params: { [key: string]: any }) {
    const { pagination, sort, filter: where, ...rest } = params;

    const filter: Record<string, any> = {};

    if (where) {
      set(filter, 'where', where);
    }

    if (sort?.field) {
      set(filter, 'order', `${sort.field} ${sort.order}`);
    }

    const { page = 0, perPage = 0 } = pagination;
    if (perPage >= 0) {
      set(filter, 'limit', perPage);
    }

    if (perPage > 0 && page >= 0) {
      set(filter, 'skip', (page - 1) * perPage);
    }

    for (const key in rest) {
      if (!params[key]) {
        continue;
      }

      set(filter, key, params[key]);
    }

    const paths = [resource];
    const response = doRequest({
      type: GET_LIST,
      baseUrl: opts.baseUrl,
      method: 'get',
      query: { filter },
      paths,
      params,
    });
    return response;
  },
  // -------------------------------------------------------------
  // GET_ONE
  // -------------------------------------------------------------
  getOne(resource: string, params: { [key: string]: any }) {
    const query = {
      filter: params?.filter || {},
    };
    const paths = [resource, params.id];
    const response = doRequest({ type: GET_ONE, baseUrl: opts.baseUrl, method: 'get', query, paths, params });
    return response;
  },
  // -------------------------------------------------------------
  // GET_MANY
  // -------------------------------------------------------------
  getMany(resource: string, params: { [key: string]: any }) {
    const ids = params?.ids?.map((id: string | number) => id) || [];
    const query: Record<string, any> = {
      filter: {},
    };

    if (ids?.length > 0) {
      set(query, 'filter.where', { id: { inq: ids } });
    }

    const paths = [resource];
    const response = doRequest({ type: GET_MANY, baseUrl: opts.baseUrl, method: 'get', query, paths, params });
    return response;
  },
  // -------------------------------------------------------------
  // GET_MANY_REFERENCE
  // -------------------------------------------------------------
  getManyReference(resource: string, params: { [key: string]: any }) {
    const { pagination = {}, sort = {}, where = null, target, id, ...rest } = params;

    const query: Record<string, any> = {
      filter: {},
    };
    if (where) {
      set(query, 'filter.where', where);
    }
    query.where[target] = id;

    if (sort?.field) {
      set(query, 'filter.order', `${sort.field} ${sort.order}`);
    }

    const { page = 0, perPage = 0 } = pagination;
    if (perPage >= 0) {
      set(query, 'filter.limit', perPage);
    }

    if (perPage > 0 && page >= 0) {
      set(query, 'filter.skip', (page - 1) * perPage);
    }

    for (const key in rest) {
      if (!params[key]) {
        continue;
      }

      set(query, `filter.${key}`, params[key]);
    }

    const paths = [resource];
    const response = doRequest({
      type: GET_MANY_REFERENCE,
      baseUrl: opts.baseUrl,
      method: 'get',
      query,
      paths,
      params,
    });
    return response;
  },
  // -------------------------------------------------------------
  // CREATE
  // -------------------------------------------------------------
  create(resource: string, params: IParam) {
    const request = getRequestProps(params);
    const paths = [resource];
    const response = doRequest({ type: CREATE, baseUrl: opts.baseUrl, method: 'post', paths, params, ...request });
    return response;
  },
  // -------------------------------------------------------------
  // UPDATE
  // -------------------------------------------------------------
  update(resource: string, params: IParam) {
    const request = getRequestProps(params);
    const paths = [resource, params?.id ? params.id.toString() : ''];
    const response = doRequest({ type: UPDATE, baseUrl: opts.baseUrl, method: 'patch', paths, params, ...request });
    return response;
  },
  async updateMany(resource: string, params: { [key: string]: any }) {
    const { ids = [], data = {} } = params;

    if (!ids?.length) {
      throw getError({ message: '[updateMany] No IDs to execute update!' });
    }

    const query: Record<string, any> = {
      filter: { where: { id: { inq: ids } } },
    };

    const paths = [resource];
    const response = doRequest({
      type: UPDATE_MANY,
      baseUrl: opts.baseUrl,
      method: 'patch',
      paths,
      params,
      query,
      body: data,
    });
    return response;
  },
  // -------------------------------------------------------------
  // DELETE
  // -------------------------------------------------------------
  delete(resource: string, params: { [key: string]: any }) {
    const paths = [resource, params.id];
    const response = doRequest({ type: DELETE, baseUrl: opts.baseUrl, method: 'delete', paths, params });
    return response;
  },
  // -------------------------------------------------------------
  // DELETE_MANY
  // -------------------------------------------------------------
  deleteMany(resource: string, params: IParam) {
    const request = getRequestProps(params);
    const paths = [resource];
    const response = doRequest({
      type: DELETE_MANY,
      baseUrl: opts.baseUrl,
      method: 'delete',
      paths,
      params,
      ...request,
    });
    return response;
  },
  // -------------------------------------------------------------
  // SEND
  // -------------------------------------------------------------
  send(resource: string, params: IParam) {
    if (!params?.method) {
      throw getError({ message: '[send] Invalid http method to send request!' });
    }

    const { method, ...rest } = params;
    const request = getRequestProps(rest);
    const paths = [resource];
    const response = doRequest({ type: SEND, baseUrl: opts.baseUrl, method, paths, params, ...request });
    return response;
  },
});
