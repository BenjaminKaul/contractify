import { AtPath } from "./at-path";
import { UsesMethod } from "./uses-method";

/**
 * Cache defined api contracts as strings
 */
const routeSet = new Set<string>();

/**
 * Create a key for an api
 * 
 * @param api API contract
 */
const mapApiToKey = <API extends AtPath & UsesMethod>(api: API) => `${api.method}${api.path}`;

/**
 * Keep a map of api contracts
 */
export const ContractMap = {
  /**
   * Check if an api contract has already been defined
   * 
   * @param api API contract
   */
  apiContractAlreadyDefined: <API extends AtPath & UsesMethod>(api: API) => routeSet.has(mapApiToKey(api)),
  /**
   * Assert no duplicate api contract, otherwise throw
   * 
   * @param api API contract
   */
  assertNoDuplicateApiContract: <API extends AtPath & UsesMethod>(api: API) => {
    if (ContractMap.apiContractAlreadyDefined(api)) {
      throw new Error(`There is a defined contract for ${api.method} and ${api.path} already.`);
    }
  },
  /**
   * Define an api contract
   * 
   * @param api API contract
   */
  defineApiContract: <API extends AtPath & UsesMethod>(api: API) => {
    ContractMap.assertNoDuplicateApiContract(api);
    routeSet.add(mapApiToKey(api));
  },
};
