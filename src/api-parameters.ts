import { ExtractPathParameters } from './path-parameters.interface';
import { ExtractQueryParameters } from './query-parameters.interface';
import { ExtractRequestBody } from './request-body.interface';

/**
 * All combined parameters for an api contract
 */
export type ApiParameters<API, REQUEST_OPTIONS = {}> = [
  ExtractPathParameters<API>,
  ExtractQueryParameters<API>,
  ExtractRequestBody<API>,
  REQUEST_OPTIONS
];
