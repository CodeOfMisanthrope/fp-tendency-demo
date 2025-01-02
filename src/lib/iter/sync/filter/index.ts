/**
 * Creates a new iterable that filters the elements of the provided iterable based on a predicate function.
 *
 * @template T
 * @param {Iterable<T>} iterable - The iterable to be filtered.
 * @param {(value: T, index?: number, iterable?: Iterable<T>) => boolean} predicate - A function that determines whether
 * the given element should be included in the new iterable. It receives the current element, its index, and the original iterable
 * as arguments.
 * @param {unknown} [thisArg] - An optional value to use as `this` when executing the predicate function.
 * @returns {Iterable<T>} A new iterable containing the elements that satisfy the predicate function.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * const evenNumbers = filter(numbers, (num) => num % 2 === 0);
 * for (const num of evenNumbers) {
 *   console.log(num); // Output: 2, 4
 * }
 */
export function filter<T>(
  iterable: Iterable<T>,
  predicate: (value: T, index?: number, iterable?: Iterable<T>) => boolean,
  thisArg?: unknown,
) {
  const iter = iterable[Symbol.iterator]();

  let i = 0;

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      let res = iter.next(),
        isCondition = predicate.call(thisArg, res.value, i++, iterable);

      while (!res.done && !isCondition) {
        res = iter.next();
        isCondition = predicate.call(thisArg, res.value, i++, iterable);
      }

      return res;
    },
  };
}
