/**
 * Merge two objects and their types
 * 
 * @param t First object
 * @param u Second object
 */
export const merge = <T, U>(t: T, u: U): T & U => Object.assign({}, t, u);
