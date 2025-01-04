/**
 * Converts an iterable object into an array.
 *
 * @template T - The type of the elements in the iterable.
 * @param {Iterable<T>} iterable - The iterable object to convert into an array.
 * @returns {T[]} An array containing all elements from the iterable.
 *
 * @example
 * const set = new Set([1, 2, 3]);
 * const array = toArray(set);
 * console.log(array); // Output: [1, 2, 3]
 */
export function toArray<T>(iterable:Iterable<T>):T[] {
  return [...iterable];
}
