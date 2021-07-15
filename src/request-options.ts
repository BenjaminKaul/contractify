import { QueryParametersType } from './query-parameters.interface';

/**
 * Request options type
 */
export type RequestOptions<
  QUERY_PARAMETERS_TYPE extends QueryParametersType = QueryParametersType
> = {
  params?: QUERY_PARAMETERS_TYPE;
};
