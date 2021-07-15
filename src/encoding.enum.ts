/**
 * Encoding for result
 */
export enum ResultEncoding {
  JSON = 'json',
  Raw = 'raw'
}

/**
 * Check if api returns a json encoded response
 * 
 * @param api API contract
 */
export const isJsonEncoded = (api: any) => ('resultEncoding' in api) && api.resultEncoding === ResultEncoding.JSON;

/**
 * Check if api returns a raw response
 * 
 * @param api API contract
 */
export const isRaw = (api: any) => ('resultEncoding' in api) && api.resultEncoding === ResultEncoding.Raw;
