/**
 * Type of request body
 */
export type RequestBodyType = {
  [index: string]: any;
};

/**
 * Generic request body container
 */
export interface RequestBody<
  REQUEST_BODY_TYPE extends RequestBodyType = RequestBodyType
> {
  body: REQUEST_BODY_TYPE;
}

/**
 * Extract request body type from api
 */
export type ExtractRequestBody<API> = API extends RequestBody
  ? API['body']
  : undefined;

/**
 * Check if target api has a request body
 *
 * @param api Target api
 */
export const hasRequestBody = (api: any): api is RequestBody => 'body' in api;
