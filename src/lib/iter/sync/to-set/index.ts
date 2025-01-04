/**
 * Converts an iterable object into a Set.
 *
 * @template T - The type of the elements in the iterable.
 * @param {Iterable<T>} iterable - The iterable object to convert into a Set.
 * @returns {Set<T>} A Set containing all unique elements from the iterable.
 *
 * @example
 * const array = [1, 2, 2, 3];
 * const set = toSet(array);
 * console.log(set); // Output: Set { 1, 2, 3 }
 */
export function toSet<T>(iterable:Iterable<T>) {
  return new Set(iterable);
}
