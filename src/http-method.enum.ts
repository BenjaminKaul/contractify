/**
 * Http methods
 */
export enum HttpMethod {
  Get = 'get',
  Patch = 'patch',
  Post = 'post',
  Put = 'put',
  Delete = 'delete',
}

/**
 * Http methods supporting query parameters (?query)
 */
export type MethodSupportingQueryParameter = HttpMethod.Get | HttpMethod.Delete;

/**
 * Http methods supporting a request body
 */
export type MethodSupportingRequestBody =
  | HttpMethod.Patch
  | HttpMethod.Post
  | HttpMethod.Put;
