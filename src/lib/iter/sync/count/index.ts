/**
 * Counts the number of elements in the given iterable.
 *
 * @template T - The type of elements in the iterable.
 * @param {Iterable<T>} iterable - The iterable to count elements from.
 * @returns {number} The count of elements in the iterable.
 *
 * @example
 * const array = [1, 2, 3, 4];
 * const count = count(array);
 * console.log(count); // Output: 4
 *
 * @example
 * const set = new Set(['a', 'b', 'c']);
 * const count = count(set);
 * console.log(count); // Output: 3
 */
export function count<T>(iterable: Iterable<T>) {
  let
    counter = 0;

  for (const _ of iterable) {
    counter++;
  }

  return counter;
}
