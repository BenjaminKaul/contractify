/**
 * Type of query parameters available
 */
export type QueryParametersType = {
  [index: string]: string | string[] | undefined
};

/**
 * Generic query parameters container
 */
export interface QueryParameters<QUERY_PARAMETERS_TYPE extends QueryParametersType = QueryParametersType> {
  queryParameters: QUERY_PARAMETERS_TYPE
}

/**
 * Extract query parameters from api
 */
export type ExtractQueryParameters<API> = API extends QueryParameters ? API['queryParameters'] : undefined;

/**
 * Check if target api has query parameters
 * 
 * @param api Target api
 */
export const hasQueryParameters = (api: any): api is QueryParameters => 'queryParameters' in api;
