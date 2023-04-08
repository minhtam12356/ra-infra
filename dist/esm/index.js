import React from 'react';
import CryptoJS from 'crypto-js';
import get from 'lodash/get';
import 'lodash/round';
import isEmpty from 'lodash/isEmpty';
import set from 'lodash/set';
import axios from 'axios';
import { sanitizeFetchType, Admin, Resource } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';

var Authentication = /** @class */ (function () {
    function Authentication() {
    }
    // Jwt
    Authentication.TYPE_BASIC = 'Basic';
    Authentication.TYPE_BEARER = 'Bearer';
    // Strategy
    Authentication.STRATEGY_BASIC = 'basic';
    Authentication.STRATEGY_JWT = 'jwt';
    return Authentication;
}());
var LocalStorageKeys = /** @class */ (function () {
    function LocalStorageKeys() {
    }
    LocalStorageKeys.KEY_AUTH_TOKEN_VALUE = '@app/auth/token/value';
    LocalStorageKeys.KEY_AUTH_TOKEN_TYPE = '@app/auth/token/type';
    LocalStorageKeys.KEY_AUTH_TOKEN = '@app/auth/token';
    LocalStorageKeys.KEY_AUTH_IDENTITY = '@app/auth/identity';
    LocalStorageKeys.KEY_AUTH_PERMISSION = '@app/auth/permission';
    return LocalStorageKeys;
}());

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var decrypt = function (message, secret) {
    return CryptoJS.AES.decrypt(message, secret).toString(CryptoJS.enc.Latin1);
};

var ApplicationError = /** @class */ (function (_super) {
    __extends(ApplicationError, _super);
    function ApplicationError(opts) {
        var _this = this;
        var message = opts.message, messageCode = opts.messageCode, _a = opts.statusCode, statusCode = _a === void 0 ? 400 : _a;
        _this = _super.call(this, message) || this;
        _this.statusCode = statusCode;
        _this.messageCode = messageCode;
        return _this;
    }
    return ApplicationError;
}(Error));
var getError = function (opts) {
    var error = new ApplicationError(opts);
    return error;
};

// -------------------------------------------------------------------------
var int = function (input) {
    var _a;
    if (!input || Number.isNaN(input)) {
        return 0;
    }
    var normalized = (_a = input === null || input === void 0 ? void 0 : input.toString()) === null || _a === void 0 ? void 0 : _a.replace(/,/g, '');
    return Number.parseInt(normalized, 10);
};

var stringify = function (params) {
    var normalizedParams = {};
    for (var key in params) {
        switch (typeof params[key]) {
            case 'number':
            case 'string': {
                normalizedParams[key] = params[key];
                break;
            }
            default: {
                normalizedParams[key] = JSON.stringify(params[key]);
                break;
            }
        }
    }
    var rs = new URLSearchParams(normalizedParams);
    return rs.toString();
};

var applicationLogger = console;
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.getInstance = function () {
        if (!this.instance) {
            this.instance = new Logger();
        }
        return this.instance;
    };
    Logger.prototype.getTimestamp = function () {
        return new Date().toISOString();
    };
    Logger.prototype.generateLog = function (opts) {
        var level = opts.level, message = opts.message;
        var timestamp = this.getTimestamp();
        return "".concat(timestamp, " - [").concat(level, "]\t ").concat(message);
    };
    Logger.prototype.info = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!applicationLogger) {
            throw getError({ message: '[info] Invalid logger instance!' });
        }
        applicationLogger.info.apply(applicationLogger, __spreadArray([this.generateLog({ level: 'INFO', message: message })], args, false));
    };
    Logger.prototype.warn = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!applicationLogger) {
            throw getError({ message: '[error] Invalid logger instance!' });
        }
        applicationLogger.warn.apply(applicationLogger, __spreadArray([this.generateLog({ level: 'WARN', message: message })], args, false));
    };
    Logger.prototype.error = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!applicationLogger) {
            throw getError({ message: '[error] Invalid logger instance!' });
        }
        applicationLogger.error.apply(applicationLogger, __spreadArray([this.generateLog({ level: 'ERROR', message: message })], args, false));
    };
    return Logger;
}());

var HTTP = 'http';
var HTTPS = 'https';
// -------------------------------------------------------------
var NetworkHelper = /** @class */ (function () {
    function NetworkHelper(opts) {
        var _a;
        var name = opts.name, requestConfigs = opts.requestConfigs;
        this.name = name;
        (_a = opts === null || opts === void 0 ? void 0 : opts.logger) === null || _a === void 0 ? void 0 : _a.info('Creating new network request worker instance! Name: %s', this.name);
        // const defaultConfigs = require('axios/lib/defaults/index');
        this.worker = axios.create(__assign({}, requestConfigs));
    }
    NetworkHelper.prototype.getProtocol = function (url) {
        return url.startsWith('http:') ? HTTP : HTTPS;
    };
    // -------------------------------------------------------------
    // SEND REQUEST
    // -------------------------------------------------------------
    NetworkHelper.prototype.send = function (opts, logger) {
        return __awaiter(this, void 0, void 0, function () {
            var t, url, _a, method, params, body, configs, props, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        t = new Date().getTime();
                        url = opts.url, _a = opts.method, method = _a === void 0 ? 'get' : _a, params = opts.params, body = opts.body, configs = opts.configs;
                        props = __assign({ url: url, method: method, params: params, data: body, paramsSerializer: function (p) {
                                return stringify(p);
                            } }, configs);
                        logger === null || logger === void 0 ? void 0 : logger.info('[send] URL: %s | Props: %o', url, props);
                        return [4 /*yield*/, this.worker.request(props)];
                    case 1:
                        response = _b.sent();
                        logger === null || logger === void 0 ? void 0 : logger.info("[network]][send] Took: %s(ms)", new Date().getTime() - t);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // -------------------------------------------------------------
    // GET REQUEST
    // -------------------------------------------------------------
    NetworkHelper.prototype.get = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var url, params, configs, rest, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = opts.url, params = opts.params, configs = opts.configs, rest = __rest(opts, ["url", "params", "configs"]);
                        return [4 /*yield*/, this.send(__assign(__assign({}, rest), { url: url, method: 'get', params: params, configs: configs }))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // -------------------------------------------------------------
    // POST REQUEST
    // -------------------------------------------------------------
    NetworkHelper.prototype.post = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var url, body, configs, rest, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = opts.url, body = opts.body, configs = opts.configs, rest = __rest(opts, ["url", "body", "configs"]);
                        return [4 /*yield*/, this.send(__assign(__assign({}, rest), { url: url, method: 'post', body: body, configs: configs }))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // -------------------------------------------------------------
    NetworkHelper.prototype.put = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var url, body, configs, rest, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = opts.url, body = opts.body, configs = opts.configs, rest = __rest(opts, ["url", "body", "configs"]);
                        return [4 /*yield*/, this.send(__assign(__assign(__assign({}, rest), { url: url, method: 'put', body: body, configs: configs }), rest))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // -------------------------------------------------------------
    NetworkHelper.prototype.patch = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var url, body, configs, rest, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = opts.url, body = opts.body, configs = opts.configs, rest = __rest(opts, ["url", "body", "configs"]);
                        return [4 /*yield*/, this.send(__assign(__assign({}, rest), { url: url, method: 'patch', body: body, configs: configs }))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // -------------------------------------------------------------
    NetworkHelper.prototype.delete = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var url, configs, rest, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = opts.url, configs = opts.configs, rest = __rest(opts, ["url", "configs"]);
                        return [4 /*yield*/, this.send(__assign(__assign({}, rest), { url: url, method: 'delete', configs: configs }))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    return NetworkHelper;
}());

var GET_LIST = 'GET_LIST';
var GET_ONE = 'GET_ONE';
var GET_MANY = 'GET_MANY';
var GET_MANY_REFERENCE = 'GET_MANY_REFERENCE';
var CREATE = 'CREATE';
var UPDATE = 'UPDATE';
var UPDATE_MANY = 'UPDATE_MANY';
var DELETE = 'DELETE';
var DELETE_MANY = 'DELETE_MANY';
var SEND = 'SEND';
// -------------------------------------------------------------
var getRequestProps = function (params) {
    var type = params.bodyType, body = params.body, file = params.file, query = params.query;
    var rs = { headers: {}, body: null, query: query };
    switch (type) {
        case 'form': {
            rs.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
            var formData = new FormData();
            for (var key in body) {
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
            var formData = new FormData();
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
var convertResponse = function (opts) {
    var _a, _b, _c;
    var response = opts.response, type = opts.type, params = opts.params;
    var headers = response.headers, data = response.data;
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
                data: data,
                total: (_c = int((_b = (_a = headers['content-range']) === null || _a === void 0 ? void 0 : _a.split('/')) === null || _b === void 0 ? void 0 : _b.pop())) !== null && _c !== void 0 ? _c : data.length,
            };
        }
        case CREATE: {
            var rs = { id: data === null || data === void 0 ? void 0 : data.id };
            switch (params === null || params === void 0 ? void 0 : params.type) {
                case 'file': {
                    rs = __assign(__assign({}, rs), { files: data });
                    break;
                }
                default: {
                    rs = __assign(__assign({}, data), { id: data.id });
                    break;
                }
            }
            return { data: rs };
        }
        case DELETE: {
            return {
                data: __assign(__assign({}, data), { id: params.id }),
            };
        }
        default: {
            return { data: data };
        }
    }
};
// -------------------------------------------------------------
var getRequestUrl = function (opts) {
    var _a;
    var baseUrl = opts === null || opts === void 0 ? void 0 : opts.baseUrl;
    var paths = (_a = opts === null || opts === void 0 ? void 0 : opts.paths) !== null && _a !== void 0 ? _a : [];
    if (!baseUrl || isEmpty(baseUrl)) {
        throw getError({
            statusCode: 500,
            message: '[getRequestUrl] Invalid configuration for third party request base url!',
        });
    }
    if (baseUrl.endsWith('/')) {
        baseUrl = baseUrl.slice(0, -1); // Remove / at the end
    }
    var joined = paths
        .map(function (path) {
        if (!path.startsWith('/')) {
            path = "/".concat(path); // Add / to the start of url path
        }
        return path;
    })
        .join('');
    return "".concat(baseUrl).concat(joined);
};
// -------------------------------------------------------------
// PROPS
// -------------------------------------------------------------
var networkService = new NetworkHelper({
    name: 'APPLICATION_NETWORK_SERVICE',
    requestConfigs: {
        withCredentials: true,
        timeout: 60 * 1000,
        validateStatus: function (status) {
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
var doRequest = function (opts) {
    var type = opts.type, baseUrl = opts.baseUrl, method = opts.method, paths = opts.paths, headers = opts.headers, body = opts.body, query = opts.query, params = opts.params;
    if (!baseUrl || isEmpty(baseUrl)) {
        throw getError({ message: '[doRequest] Invalid baseUrl to send request!' });
    }
    var url = getRequestUrl({ baseUrl: baseUrl, paths: paths });
    return new Promise(function (resolve, reject) {
        networkService
            .send({ url: url, method: method, params: query, body: body, configs: { headers: headers } })
            .then(function (response) {
            var normalized = convertResponse({ response: response, type: type, params: params });
            resolve(normalized);
        })
            .catch(function (error) {
            reject(error);
        });
    });
};
var LbProviderGetter = function (opts) { return ({
    // -------------------------------------------------------------
    // GET_LIST
    // -------------------------------------------------------------
    getList: function (resource, params) {
        var pagination = params.pagination, sort = params.sort, where = params.filter, rest = __rest(params, ["pagination", "sort", "filter"]);
        var filter = {};
        if (where) {
            set(filter, 'where', where);
        }
        if (sort === null || sort === void 0 ? void 0 : sort.field) {
            set(filter, 'order', "".concat(sort.field, " ").concat(sort.order));
        }
        var _a = pagination.page, page = _a === void 0 ? 0 : _a, _b = pagination.perPage, perPage = _b === void 0 ? 0 : _b;
        if (perPage >= 0) {
            set(filter, 'limit', perPage);
        }
        if (perPage > 0 && page >= 0) {
            set(filter, 'skip', (page - 1) * perPage);
        }
        for (var key in rest) {
            if (!params[key]) {
                continue;
            }
            set(filter, key, params[key]);
        }
        var paths = [resource];
        var response = doRequest({
            type: GET_LIST,
            baseUrl: opts.baseUrl,
            method: 'get',
            query: { filter: filter },
            paths: paths,
            params: params,
        });
        return response;
    },
    // -------------------------------------------------------------
    // GET_ONE
    // -------------------------------------------------------------
    getOne: function (resource, params) {
        var query = {
            filter: (params === null || params === void 0 ? void 0 : params.filter) || {},
        };
        var paths = [resource, params.id];
        var response = doRequest({ type: GET_ONE, baseUrl: opts.baseUrl, method: 'get', query: query, paths: paths, params: params });
        return response;
    },
    // -------------------------------------------------------------
    // GET_MANY
    // -------------------------------------------------------------
    getMany: function (resource, params) {
        var _a;
        var ids = ((_a = params === null || params === void 0 ? void 0 : params.ids) === null || _a === void 0 ? void 0 : _a.map(function (id) { return id; })) || [];
        var query = {
            filter: {},
        };
        if ((ids === null || ids === void 0 ? void 0 : ids.length) > 0) {
            set(query, 'filter.where', { id: { inq: ids } });
        }
        var paths = [resource];
        var response = doRequest({ type: GET_MANY, baseUrl: opts.baseUrl, method: 'get', query: query, paths: paths, params: params });
        return response;
    },
    // -------------------------------------------------------------
    // GET_MANY_REFERENCE
    // -------------------------------------------------------------
    getManyReference: function (resource, params) {
        var _a = params.pagination, pagination = _a === void 0 ? {} : _a, _b = params.sort, sort = _b === void 0 ? {} : _b, _c = params.where, where = _c === void 0 ? null : _c, target = params.target, id = params.id, rest = __rest(params, ["pagination", "sort", "where", "target", "id"]);
        var query = {
            filter: {},
        };
        if (where) {
            set(query, 'filter.where', where);
        }
        query.where[target] = id;
        if (sort === null || sort === void 0 ? void 0 : sort.field) {
            set(query, 'filter.order', "".concat(sort.field, " ").concat(sort.order));
        }
        var _d = pagination.page, page = _d === void 0 ? 0 : _d, _e = pagination.perPage, perPage = _e === void 0 ? 0 : _e;
        if (perPage >= 0) {
            set(query, 'filter.limit', perPage);
        }
        if (perPage > 0 && page >= 0) {
            set(query, 'filter.skip', (page - 1) * perPage);
        }
        for (var key in rest) {
            if (!params[key]) {
                continue;
            }
            set(query, "filter.".concat(key), params[key]);
        }
        var paths = [resource];
        var response = doRequest({
            type: GET_MANY_REFERENCE,
            baseUrl: opts.baseUrl,
            method: 'get',
            query: query,
            paths: paths,
            params: params,
        });
        return response;
    },
    // -------------------------------------------------------------
    // CREATE
    // -------------------------------------------------------------
    create: function (resource, params) {
        var request = getRequestProps(params);
        var paths = [resource];
        var response = doRequest(__assign({ type: CREATE, baseUrl: opts.baseUrl, method: 'post', paths: paths, params: params }, request));
        return response;
    },
    // -------------------------------------------------------------
    // UPDATE
    // -------------------------------------------------------------
    update: function (resource, params) {
        var request = getRequestProps(params);
        var paths = [resource, (params === null || params === void 0 ? void 0 : params.id) ? params.id.toString() : ''];
        var response = doRequest(__assign({ type: UPDATE, baseUrl: opts.baseUrl, method: 'patch', paths: paths, params: params }, request));
        return response;
    },
    updateMany: function (resource, params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ids, _b, data, query, paths, response;
            return __generator(this, function (_c) {
                _a = params.ids, ids = _a === void 0 ? [] : _a, _b = params.data, data = _b === void 0 ? {} : _b;
                if (!(ids === null || ids === void 0 ? void 0 : ids.length)) {
                    throw getError({ message: '[updateMany] No IDs to execute update!' });
                }
                query = {
                    filter: { where: { id: { inq: ids } } },
                };
                paths = [resource];
                response = doRequest({
                    type: UPDATE_MANY,
                    baseUrl: opts.baseUrl,
                    method: 'patch',
                    paths: paths,
                    params: params,
                    query: query,
                    body: data,
                });
                return [2 /*return*/, response];
            });
        });
    },
    // -------------------------------------------------------------
    // DELETE
    // -------------------------------------------------------------
    delete: function (resource, params) {
        var paths = [resource, params.id];
        var response = doRequest({ type: DELETE, baseUrl: opts.baseUrl, method: 'delete', paths: paths, params: params });
        return response;
    },
    // -------------------------------------------------------------
    // DELETE_MANY
    // -------------------------------------------------------------
    deleteMany: function (resource, params) {
        var request = getRequestProps(params);
        var paths = [resource];
        var response = doRequest(__assign({ type: DELETE_MANY, baseUrl: opts.baseUrl, method: 'delete', paths: paths, params: params }, request));
        return response;
    },
    // -------------------------------------------------------------
    // SEND
    // -------------------------------------------------------------
    send: function (resource, params) {
        if (!(params === null || params === void 0 ? void 0 : params.method)) {
            throw getError({ message: '[send] Invalid http method to send request!' });
        }
        var method = params.method, rest = __rest(params, ["method"]);
        var request = getRequestProps(rest);
        var paths = [resource];
        var response = doRequest(__assign({ type: SEND, baseUrl: opts.baseUrl, method: method, paths: paths, params: params }, request));
        return response;
    },
}); };

var AuthService = /** @class */ (function () {
    function AuthService() {
        // ------------------------------------------------------------------------------------
        this.getRoles = function () {
            var roles = JSON.parse(localStorage.getItem(LocalStorageKeys.KEY_AUTH_PERMISSION) || '[]');
            return new Set(roles);
        };
    }
    AuthService.getInstance = function () {
        if (!this.instance) {
            this.instance = new AuthService();
        }
        return this.instance;
    };
    // ------------------------------------------------------------------------------------
    AuthService.prototype.getSr = function (user) {
        var _a = user.id, id = _a === void 0 ? 0 : _a, _b = user.username, username = _b === void 0 ? '' : _b, _c = user.email, email = _c === void 0 ? '' : _c, _d = user.status, status = _d === void 0 ? '' : _d;
        return "".concat(id, "_").concat(username, "@@").concat(email, "_").concat(status, "@mT5h");
    };
    // ------------------------------------------------------------------------------------
    AuthService.prototype.getUser = function () {
        return JSON.parse(localStorage.getItem(LocalStorageKeys.KEY_AUTH_IDENTITY) || '{}');
    };
    // ------------------------------------------------------------------------------------
    AuthService.prototype.getToken = function () {
        var _a;
        try {
            var user = this.getUser();
            var sr = this.getSr(user);
            var encryptedToken = (_a = localStorage.getItem(LocalStorageKeys.KEY_AUTH_TOKEN)) !== null && _a !== void 0 ? _a : '';
            var de = decrypt(encryptedToken, sr);
            return JSON.parse(de);
        }
        catch (e) {
            return null;
        }
    };
    // ------------------------------------------------------------------------------------
    AuthService.prototype.getAuthorizationToken = function () { };
    return AuthService;
}());

var DEFAULT_FETCH_METHOD = 'send';
var authService = AuthService.getInstance();
var AuthProviderGetter = function (opts) {
    var dataProvider = opts.dataProvider;
    if (!dataProvider) {
        throw getError({ message: '[AuthProviderGetter] Invalid data provider to init auth provider!' });
    }
    return {
        // -------------------------------------------------------------
        // LOGIN
        // -------------------------------------------------------------
        login: function (params) {
            return new Promise(function (resolve, reject) {
                dataProvider(DEFAULT_FETCH_METHOD, 'login', { method: 'post', body: params })
                    .then(function (rs) {
                    resolve(rs);
                })
                    .catch(function (error) {
                    reject(error);
                });
            });
        },
        // -------------------------------------------------------------
        // CHECK_ERROR
        // -------------------------------------------------------------
        checkError: function (params) {
            var status = params.status;
            if (status === 401 || status === 403) {
                // authService.cleanUpAuth();
                return Promise.reject({ redirectTo: 'login' });
            }
            return Promise.resolve();
        },
        // -------------------------------------------------------------
        // CHECK_AUTH
        // -------------------------------------------------------------
        checkAuth: function () {
            var token = authService.getToken();
            if ((token === null || token === void 0 ? void 0 : token.base) || (token === null || token === void 0 ? void 0 : token.jwt)) {
                return Promise.resolve();
            }
            // authService.cleanUpAuth();
            return Promise.reject({ redirectTo: 'login' });
        },
        // -------------------------------------------------------------
        // LOGOUT
        // -------------------------------------------------------------
        logout: function () { return Promise.resolve(); },
        // -------------------------------------------------------------
        // GET_IDENTIFIER
        // -------------------------------------------------------------
        getIdentity: function () {
            return Promise.resolve({ id: 0, fullName: 'TEST', username: 'TEST' });
        },
        // -------------------------------------------------------------
        // GET_PERMISSIONS
        // -------------------------------------------------------------
        getPermissions: function () { return Promise.resolve(); },
    };
};

var ApplicationContext = React.createContext({
    logger: Logger.getInstance(),
});

var getDataProvider = function (opts) {
    var dataProviderHelper = LbProviderGetter(opts);
    return function (type, resource, params) {
        var fetchType = sanitizeFetchType(type);
        var fetcher = get(dataProviderHelper, fetchType);
        if (!fetcher) {
            throw getError({ message: '[dataProvider] Invalid fetcher to send request' });
        }
        return fetcher === null || fetcher === void 0 ? void 0 : fetcher(resource, params);
    };
};

var language = ((navigator === null || navigator === void 0 ? void 0 : navigator.language) || 'ko-KR').split('-')[0];
var getI18nProvider = function (opts) {
    var i18nSources = opts.i18n;
    return polyglotI18nProvider(function (locale) {
        return get(i18nSources, locale);
    }, language, {
        allowMissing: true,
        onMissingKey: function (key, _, __) { return key; },
    });
};

var getAuthProvider = function (opts) {
    var authProvider = AuthProviderGetter(opts);
    return authProvider;
};

var Application = function (props) {
    var resources = props.resources, restProps = __rest(props, ["resources"]);
    var logger = React.useContext(ApplicationContext).logger;
    var adminProps = React.useMemo(function () {
        var baseUrl = restProps.baseUrl, _a = restProps.i18n, i18n = _a === void 0 ? {} : _a, rest = __rest(restProps, ["baseUrl", "i18n"]);
        var rs = __assign({ i18nProvider: getI18nProvider({ i18n: i18n }) }, rest);
        if (baseUrl && !isEmpty(baseUrl)) {
            var dataProvider = getDataProvider({ baseUrl: baseUrl });
            rs.dataProvider = dataProvider;
            rs.authProvider = getAuthProvider({ dataProvider: dataProvider });
        }
        return rs;
    }, [restProps]);
    React.useEffect(function () {
        logger.info('Mounted RA application');
        return function () {
            logger.info('Unmount RA application');
        };
    }, []);
    return (React.createElement(Admin, __assign({}, adminProps), resources === null || resources === void 0 ? void 0 : resources.map(function (resource) {
        return React.createElement(Resource, __assign({ key: resource.name }, resource));
    })));
};

// -------------------------------------------------------------------------------
var ApplicationWrapper = function (_a) {
    var children = _a.children;
    var logger = React.useMemo(function () { return Logger.getInstance(); }, []);
    return (React.createElement(React.Suspense, { fallback: React.createElement("span", null, "Loading...!") },
        React.createElement(ApplicationContext.Provider, { value: {
                logger: logger,
            } }, children)));
};
// -------------------------------------------------------------------------------
var Ra = function (props) {
    return (React.createElement(ApplicationWrapper, null,
        React.createElement(Application, __assign({}, props))));
};

export { Application, ApplicationContext, ApplicationWrapper, AuthProviderGetter, AuthService, Authentication, CREATE, DELETE, DELETE_MANY, GET_LIST, GET_MANY, GET_MANY_REFERENCE, GET_ONE, LbProviderGetter, LocalStorageKeys, Logger, Ra, SEND, UPDATE, UPDATE_MANY, getAuthProvider, getDataProvider, getI18nProvider };
//# sourceMappingURL=index.js.map
