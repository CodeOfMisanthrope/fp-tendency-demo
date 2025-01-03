/**
 * Returns the last element of the given iterable.
 *
 * @template T - The type of elements in the iterable.
 * @param {Iterable<T>} iterable - The iterable from which to retrieve the last element.
 * @returns {T | undefined} The last element of the iterable, or `undefined` if the iterable is empty.
 *
 * @example
 * const array = [1, 2, 3, 4];
 * const lastElement = last(array);
 * console.log(lastElement); // Output: 4
 *
 * @example
 * const set = new Set(['a', 'b', 'c']);
 * const lastElement = last(set);
 * console.log(lastElement); // Output: 'c'
 *
 * @example
 * const emptyArray: number[] = [];
 * const lastElement = last(emptyArray);
 * console.log(lastElement); // Output: undefined
 */
export function last<T>(iterable:Iterable<T>) {
  let result;

  for (const value of iterable) {
    result = value;
  }

  return result;
}
