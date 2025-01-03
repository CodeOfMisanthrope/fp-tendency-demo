/**
 * Returns the first element of the given iterable.
 *
 * @template T - The type of elements in the iterable.
 * @param {Iterable<T>} iterable - The iterable from which to retrieve the first element.
 * @returns {T | undefined} The first element of the iterable, or `undefined` if the iterable is empty.
 *
 * @example
 * const array = [1, 2, 3, 4];
 * const firstElement = first(array);
 * console.log(firstElement); // Output: 1
 *
 * @example
 * const set = new Set(['a', 'b', 'c']);
 * const firstElement = first(set);
 * console.log(firstElement); // Output: 'a'
 *
 * @example
 * const emptyArray: number[] = [];
 * const firstElement = first(emptyArray);
 * console.log(firstElement); // Output: undefined
 */
export function first<T>(iterable: Iterable<T>) {
  const iterator = iterable[Symbol.iterator]();

  return iterator.next().value;
}
