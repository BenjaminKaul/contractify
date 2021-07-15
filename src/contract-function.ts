import { AtPath } from './at-path';
import {
  ExtractPathParameters,
  PathParameters,
} from './path-parameters.interface';
import {
  ExtractQueryParameters,
  QueryParameters,
} from './query-parameters.interface';
import { ExtractRequestBody, RequestBody } from './request-body.interface';
import { ExtractResult } from './returns.interface';
import { UsesMethod } from './uses-method';

/**
 * Function enforcing given api contract
 */
export type ContractFunction<
  API extends AtPath & UsesMethod,
  REQUEST_OPTIONS = {}
> = API extends PathParameters & RequestBody & QueryParameters
  ? (
      pathParameters: ExtractPathParameters<API>,
      queryParameters: ExtractQueryParameters<API>,
      requestBody: ExtractRequestBody<API>,
      options?: REQUEST_OPTIONS
    ) => ExtractResult<API>
  : API extends PathParameters & RequestBody
  ? (
      pathParameters: ExtractPathParameters<API>,
      requestBody: ExtractRequestBody<API>,
      options?: REQUEST_OPTIONS
    ) => ExtractResult<API>
  : API extends PathParameters & QueryParameters
  ? (
      pathParameters: ExtractPathParameters<API>,
      queryParameters: ExtractQueryParameters<API>,
      options?: REQUEST_OPTIONS
    ) => ExtractResult<API>
  : API extends QueryParameters & RequestBody
  ? (
      queryParameters: ExtractQueryParameters<API>,
      requestBody: ExtractRequestBody<API>,
      options?: REQUEST_OPTIONS
    ) => ExtractResult<API>
  : API extends PathParameters
  ? (
      pathParameters: ExtractPathParameters<API>,
      options?: REQUEST_OPTIONS
    ) => ExtractResult<API>
  : API extends QueryParameters
  ? (
      queryParameters: ExtractQueryParameters<API>,
      options?: REQUEST_OPTIONS
    ) => ExtractResult<API>
  : API extends RequestBody
  ? (
      requestBody: ExtractRequestBody<API>,
      options?: REQUEST_OPTIONS
    ) => ExtractResult<API>
  : (options?: REQUEST_OPTIONS) => ExtractResult<API>;
