/**
 * Type of path parameters
 */
export type PathParametersType = {
  [index: string]: string;
};

/**
 * Generic path parameters container
 */
export interface PathParameters<
  PATH_PARAMETERS_TYPE extends PathParametersType = PathParametersType
> {
  pathParameters: PATH_PARAMETERS_TYPE;
}

/**
 * Extract path parameters from api
 */
export type ExtractPathParameters<API> = API extends PathParameters
  ? API['pathParameters']
  : undefined;

/**
 * Check if target api has path parameters
 *
 * @param api Target api
 */
export const hasPathParameters = (api: any): api is PathParameters =>
  'pathParameters' in api;
