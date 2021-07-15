export interface HttpClient<REQUEST_OPTIONS> {
  /**
   * Execute a get request
   */
  get: (url: string, options?: REQUEST_OPTIONS) => any;
  /**
   * Execute a delete request
   */
  delete: (url: string, options?: REQUEST_OPTIONS) => any;
  /**
   * Execute a patch request
   */
  patch: (url: string, body?: any, options?: REQUEST_OPTIONS) => any;
  /**
   * Execute a post request
   */
  post: (url: string, body?: any, options?: REQUEST_OPTIONS) => any;
  /**
   * Execute a put request
   */
  put: (url: string, body?: any, options?: REQUEST_OPTIONS) => any;
}
