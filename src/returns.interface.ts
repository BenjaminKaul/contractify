import { Readable } from 'stream';
import { ResultEncoding } from "./encoding.enum";

/**
 * Return value container
 */
export interface Returns<RESULT_TYPE = any> {
  result: RESULT_TYPE
}

/**
 * JSON return value container
 */
export interface ReturnsJSON<RESULT_TYPE = any> extends Returns<RESULT_TYPE> {
  resultEncoding: ResultEncoding.JSON;
  contentType?: string;
}

/**
 * Raw return value container
 */
export interface ReturnsRaw<RESULT_TYPE extends string = string> extends Returns<RESULT_TYPE> {
  resultEncoding: ResultEncoding.Raw;
  contentType?: string;
}

/**
 * Steam return value container
 */
export interface ReturnsStream extends Returns<Readable> {}

/**
 * Extract result from an api contract
 */
export type ExtractResult<API> = API extends Returns<infer R> ? R : void;
