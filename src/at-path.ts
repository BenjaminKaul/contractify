/**
 * An api with a path
 */
export interface AtPath<PATH extends string = string> {
  path: PATH;
}
