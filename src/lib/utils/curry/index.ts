/**
 * Creates a curried version of a given function.
 *
 * A curried function is a function that can be called with fewer arguments
 * than it expects. When called with fewer arguments, it returns a new function
 * that takes the remaining arguments. When called with the correct number of
 * arguments, it executes the original function.
 *
 * @param {Function} fn - The function to be curried. The function should accept
 * a number of arguments that can be partially applied.
 * @returns {Function} A new function that takes arguments one at a time or in
 * groups, returning the result when all arguments have been provided.
 *
 * @example
 * const add = (x: number, y: number) => x + y;
 * const curriedAdd = curry(add);
 * const result = curriedAdd(1)(2); // returns 3
 * const result2 = curriedAdd(1, 2); // also returns 3
 */
export function curry(fn: Function) {
   return function curryFn(this: unknown, ...args: unknown[]) {
      if (fn.length <= args.length) {
         return fn.apply(this, args);
      }

      return function (this: unknown, ...newArgs: unknown[]) {
         return curryFn.apply(this, [...args, ...newArgs]);
      };
   };
}
