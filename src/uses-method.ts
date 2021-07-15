import { HttpMethod, MethodSupportingQueryParameter, MethodSupportingRequestBody } from "./http-method.enum";

/**
 * An api with an http method
 */
export interface UsesMethod<METHOD extends HttpMethod = HttpMethod> {
  method: METHOD;
}

/**
 * An api supporting query parameters
 */
export type UsesMethodSupportingQueryParameter = UsesMethod<MethodSupportingQueryParameter>;

/**
 * An api supporting a request body
 */
export type UsesMethodSupportingRequestBody = UsesMethod<MethodSupportingRequestBody>;
