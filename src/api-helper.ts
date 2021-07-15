import { ApiParameters } from './api-parameters';
import { HttpMethod } from './http-method.enum';
import {
  ExtractPathParameters,
  hasPathParameters,
} from './path-parameters.interface';
import {
  ExtractQueryParameters,
  hasQueryParameters,
} from './query-parameters.interface';
import { ExtractRequestBody, hasRequestBody } from './request-body.interface';
import {
  UsesMethod,
  UsesMethodSupportingQueryParameter,
  UsesMethodSupportingRequestBody,
} from './uses-method';

/**
 * Extract all parameters from a list of arguments via an api contract
 *
 * @param api API contract
 * @param args List of arguments
 */
const extractApiParameters = <API>(
  api: API,
  ...args: any[]
): ApiParameters<API> => {
  const pathParameters = (
    hasPathParameters(api) ? args.shift() : undefined
  ) as ExtractPathParameters<API>;
  const queryParameters = (
    hasQueryParameters(api) ? args.shift() : undefined
  ) as ExtractQueryParameters<API>;
  const requestBody = (
    hasRequestBody(api) ? args.shift() : undefined
  ) as ExtractRequestBody<API>;
  const options = args.shift() || {};

  return [pathParameters, queryParameters, requestBody, options];
};

/**
 * Construct a path with its parameters
 *
 * @param path Route path
 * @param parameters Path parameters
 */
const constructApiPath = <API>(
  path: string,
  parameters: ExtractPathParameters<API>
) => {
  if (parameters) {
    Object.entries(parameters).forEach(([key, value]) => {
      path = path.replace(`:${key}`, encodeURIComponent(value));
    });
  }
  return path;
};

/**
 * Check if target api contract is using query parameters
 *
 * @param api API contract
 */
const isQueryParameterApi = (
  api: UsesMethod
): api is UsesMethodSupportingQueryParameter =>
  api.method === HttpMethod.Get || api.method === HttpMethod.Delete;

/**
 * Check if target api contract is using a request body
 *
 * @param api API contract
 */
const isRequestBodyApi = (
  api: UsesMethod
): api is UsesMethodSupportingRequestBody =>
  api.method === HttpMethod.Patch ||
  api.method === HttpMethod.Post ||
  api.method === HttpMethod.Put;

/**
 * Api helper facade
 */
export const ApiHelper = {
  extractApiParameters,
  constructApiPath,
  isQueryParameterApi,
  isRequestBodyApi,
};
