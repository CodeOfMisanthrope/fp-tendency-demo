/**
 * Creates an iterator that repeats the elements of a given iterable a specified number of times.
 *
 * @template T - The type of elements in the iterable.
 * @param {Iterable<T>} iterable - The iterable whose elements will be repeated.
 * @param {number} count - The number of times to repeat the elements of the iterable.
 * @returns {Iterator<T | null>} An iterator that yields the elements of the iterable, repeated `count` times.
 *
 * @example
 * const array = [1, 2, 3];
 * const repeated = repeat(array, 2);
 *
 * for (const value of repeated) {
 *   console.log(value); // Outputs: 1, 2, 3, 1, 2, 3
 * }
 *
 * @example
 * const emptyRepeat = repeat(array, 0);
 *
 * for (const value of emptyRepeat) {
 *   console.log(value); // No output, as the iterator is done immediately.
 * }
 */
export function repeat<T>(iterable: Iterable<T>, count: number) {
  if (count === 0) {
    return {
      [Symbol.iterator]() {
        return this;
      },

      next() {
        return {
          value: null,
          done: true,
        };
      },
    };
  }

  let iter = iterable[Symbol.iterator]();

  let i = 1;

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      let res = iter.next();

      if (res.done && i >= count) {
        return {
          value: null,
          done: true,
        };
      }

      if (res.done) {
        i++;
        iter = iterable[Symbol.iterator]();
        res = iter.next();
      }

      return {
        value: res.value,
        done: false,
      };
    },
  };
}
