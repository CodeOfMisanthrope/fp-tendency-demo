/**
 * Creates an iterator that yields a specified number of elements from the given iterable.
 *
 * @template T - The type of elements in the iterable.
 * @param {Iterable<T>} iterable - The iterable from which to take elements.
 * @param {number} count - The number of elements to take from the iterable.
 * @returns {Iterator<T | null>} An iterator that yields up to `count` elements from the iterable.
 *
 * @example
 * const array = [1, 2, 3, 4, 5];
 * const taken = take(array, 3);
 *
 * for (const value of taken) {
 *   console.log(value); // Outputs: 1, 2, 3
 * }
 */
export function take<T>(iterable: Iterable<T>, count: number) {
  const iter = iterable[Symbol.iterator]();

  let i = 0;

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      const res = iter.next();

      if (!res.done && i++ < count) {
        return {
          value: res.value,
          done: res.done,
        };
      }

      return {
        value: null,
        done: true,
      };
    },
  };
}
