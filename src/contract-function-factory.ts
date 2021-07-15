import { ApiHelper } from './api-helper';
import { AtPath } from './at-path';
import { ContractFunction } from './contract-function';
import { HttpClient } from './http-client.interface';
import { RequestOptions } from './request-options';
import { UsesMethod } from './uses-method';

/**
 * Constructor options for contract function factory
 */
export type ContractFunctionFactoryOptions<
  REQUEST_OPTIONS extends RequestOptions = RequestOptions
> = {
  /**
   * Http client to use for underlying requests
   */
  httpClient: HttpClient<REQUEST_OPTIONS>;
  /**
   * Default options for every request
   */
  defaultOptions?: REQUEST_OPTIONS;
  /**
   * Default base url for every request
   */
  baseUrl?: string;
  /**
   * The key to set the query parameters, needs to be set when different than 'params'
   */
  queryParameterKey?: keyof REQUEST_OPTIONS;
};

export class ContractFunctionFactory<
  REQUEST_OPTIONS extends RequestOptions = RequestOptions
> {
  private readonly httpClient: HttpClient<REQUEST_OPTIONS>;
  private readonly defaultOptions?: REQUEST_OPTIONS;
  private readonly baseUrl?: string;
  private readonly queryParameterKey: keyof REQUEST_OPTIONS;

  /**
   * Create a contract function factory
   */
  constructor(options: ContractFunctionFactoryOptions<REQUEST_OPTIONS>) {
    this.httpClient = options.httpClient;
    this.defaultOptions = options.defaultOptions;
    this.baseUrl = options.baseUrl;
    this.queryParameterKey = options.queryParameterKey || 'params';
  }

  /**
   * Create a contract function for given API contract
   *
   * @param api API contract
   * @param baseUrl BaseUrl for route path
   */
  create<API extends AtPath & UsesMethod>(
    api: API,
    requestOptions?: REQUEST_OPTIONS,
    baseUrl?: string
  ) {
    return ((...args: any) => {
      const [pathParameters, queryParameters, requestBody, options] =
        ApiHelper.extractApiParameters(api, ...args);
      const path = ApiHelper.constructApiPath(api.path, pathParameters);

      if (ApiHelper.isRequestBodyApi(api)) {
        const methodFunction = {
          patch: this.httpClient.patch,
          post: this.httpClient.post,
          put: this.httpClient.put,
        }[api.method];

        return methodFunction.call(
          this.httpClient,
          (baseUrl || this.baseUrl) + path,
          requestBody,
          {
            ...this.defaultOptions,
            ...requestOptions,
            ...options,
            [this.queryParameterKey]: queryParameters,
          } as REQUEST_OPTIONS
        );
      } else if (ApiHelper.isQueryParameterApi(api)) {
        const methodFunction = {
          get: this.httpClient.get,
          delete: this.httpClient.delete,
        }[api.method];

        return methodFunction.call(
          this.httpClient,
          (baseUrl || this.baseUrl) + path,
          {
            ...this.defaultOptions,
            ...requestOptions,
            ...options,
            [this.queryParameterKey]: queryParameters,
          } as REQUEST_OPTIONS
        );
      } else {
        throw new Error(
          `Unexpected http method ${api.method} => only supports GET | DELETE | PATCH | POST | PUT at the moment.`
        );
      }
    }) as ContractFunction<API>;
  }
}
