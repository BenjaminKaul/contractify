import { AtPath } from './at-path';
import { ContractMap } from './contract-map';
import { ResultEncoding } from './encoding.enum';
import { HttpMethod } from './http-method.enum';
import {
  PathParameters,
  PathParametersType,
} from './path-parameters.interface';
import {
  QueryParameters,
  QueryParametersType,
} from './query-parameters.interface';
import { RequestBody, RequestBodyType } from './request-body.interface';
import {
  Returns,
  ReturnsJSON,
  ReturnsRaw,
  ReturnsStream,
} from './returns.interface';
import { UsesMethod } from './uses-method';
import { merge } from './util';

/**
 * Api constructor object
 */
export type ApiBuilder<API extends AtPath & UsesMethod> = {
  /**
   * Specify a return type
   */
  returns<RESULT_TYPE>(): API & Returns<RESULT_TYPE>;
  /**
   * Specify a json encoded return type
   */
  returnsJSON<RESULT_TYPE>(): API & ReturnsJSON<RESULT_TYPE>;
  /**
   * Specify a raw return type
   */
  returnsRaw<RESULT_TYPE extends string>(): API & ReturnsRaw<RESULT_TYPE>;
  /**
   * Specify a stream return type
   */
  returnsStream(): API & ReturnsStream;
} & {
  /**
   * Specify query parameters as an object of properties
   */
  queryParameters<QUERY_PARAMETERS extends QueryParametersType>(): ApiBuilder<
    API & QueryParameters<QUERY_PARAMETERS>
  >;
} & {
  /**
   * Specify path parameters as an object of properties
   */
  pathParameters<PATH_PARAMETERS extends PathParametersType>(): ApiBuilder<
    API & PathParameters<PATH_PARAMETERS>
  >;
} & {
  /**
   * Specify a request body as an object of properties
   */
  requestBody<REQUEST_BODY extends RequestBodyType>(): ApiBuilder<
    API & RequestBody<REQUEST_BODY>
  >;
};

/**
 * Construct an api builder for an api contract
 *
 * @param api API contract
 */
export const constructApiBuilder = <
  API extends AtPath &
    UsesMethod &
    ({} | PathParameters | QueryParameters | RequestBody)
>(
  api: API
): ApiBuilder<API> => {
  return {
    /**
     * Specify a return type
     */
    returns: <RESULT_TYPE>() =>
      merge(api, {
        result: {},
      } as Returns<RESULT_TYPE>),
    /**
     * Specify a json encoded return type
     */
    returnsJSON: <RESULT_TYPE>() =>
      merge(api, {
        result: {},
        resultEncoding: ResultEncoding.JSON,
      } as ReturnsJSON<RESULT_TYPE>),
    /**
     * Specify a raw return type
     */
    returnsRaw: <RESULT_TYPE extends string>() =>
      merge(api, {
        result: {},
        resultEncoding: ResultEncoding.Raw,
      } as ReturnsRaw<RESULT_TYPE>),
    /**
     * Specify a stream return type
     */
    returnsStream: () => merge(api, { result: {} } as ReturnsStream),
    /**
     * Specify query parameters as an object of properties
     */
    queryParameters: <QUERY_PARAMETERS extends QueryParametersType>() =>
      constructApiBuilder(
        merge(api, { queryParameters: {} } as QueryParameters<QUERY_PARAMETERS>)
      ),
    /**
     * Specify path parameters as an object of properties
     */
    pathParameters: <PATH_PARAMETERS extends PathParametersType>() =>
      constructApiBuilder(
        merge(api, { pathParameters: {} } as PathParameters<PATH_PARAMETERS>)
      ),
    /**
     * Specify a request body as an object of properties
     */
    requestBody: <REQUEST_BODY extends RequestBodyType>() =>
      constructApiBuilder(
        merge(api, { body: {} } as RequestBody<REQUEST_BODY>)
      ),
  } as ApiBuilder<API>;
};

/**
 * Construct an api builder for an api contract
 *
 * @param api API contract
 */
export const constructApiContract = <API extends AtPath & UsesMethod>(
  api: API
) => {
  ContractMap.defineApiContract(api);
  return constructApiBuilder(api);
};

/**
 * Facade for API constructor
 */
export const API = {
  /**
   * Construct a GET contract
   *
   * @param path Route path (including path parameters)
   */
  get: <PATH extends string>(path: PATH) =>
    constructApiContract({ method: HttpMethod.Get, path: path }),
  /**
   * Construct a DELETE contract
   *
   * @param path Route path (including path parameters)
   */
  delete: <PATH extends string>(path: PATH) =>
    constructApiContract({ method: HttpMethod.Delete, path: path }),
  /**
   * Construct a PATCH contract
   *
   * @param path  Route path (including path parameters)
   */
  patch: <PATH extends string>(path: PATH) =>
    constructApiContract({ method: HttpMethod.Patch, path: path }),
  /**
   * Construct a POST contract
   *
   * @param path Route path (including path parameters)
   */
  post: <PATH extends string>(path: PATH) =>
    constructApiContract({ method: HttpMethod.Post, path: path }),
  /**
   * Construct a PUT contract
   *
   * @param path Route path (including path parameters)
   */
  put: <PATH extends string>(path: PATH) =>
    constructApiContract({ method: HttpMethod.Put, path: path }),
};
