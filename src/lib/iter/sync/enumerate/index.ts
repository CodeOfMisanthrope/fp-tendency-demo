/**
 * Creates a new iterable that yields pairs of index and value from the provided iterable, starting from index 1.
 *
 * @template T
 * @param {Iterable<T>} iterable - The iterable to be enumerated.
 * @returns {{ [Symbol.iterator]: function(): { next: function(): { value: [number, T], done: boolean } } } }}
 * An iterable that produces pairs of the form `[index, value]`, where `index` is the 1-based index of the element in the original iterable.
 *
 * @example
 * const items = ['a', 'b', 'c'];
 * const enumeratedItems = enumerate(items);
 * for (const [index, value] of enumeratedItems) {
 *   console.log(index, value); // Output: 1 'a', 2 'b', 3 'c'
 * }
 */
export function enumerate<T>(iterable: Iterable<T>) {
  const iter = iterable[Symbol.iterator]();

  let count = 1;

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      const res = iter.next();

      if (!res.done) {
        return {
          value: [count++, res.value],
          done: res.done,
        };
      }

      return res;
    },
  };
}
