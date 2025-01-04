/**
 * Creates a new iterable that represents a slice of the provided iterable.
 *
 * @template T - The type of the elements in the iterable.
 * @param {Iterable<T>} iterable - The iterable object to slice.
 * @param {number} from - The starting index of the slice (inclusive).
 * @param {number} to - The ending index of the slice (exclusive).
 * @returns {Iterable<T>} An iterable that contains the elements from the specified range.
 *
 * @example
 * const result = [...slice([0, 1, 2, 3, 4, 5], 1, 4)];
 * console.log(result); // Output: [1, 2, 3]
 */
export function slice<T>(iterable: Iterable<T>, from: number, to: number) {
   const iterator = iterable[Symbol.iterator]();
   let cursor = 0;

   return {
      [Symbol.iterator]() {
         return this;
      },

      next() {
         let current = iterator.next();

         while (cursor < from && !current.done) {
            current = iterator.next();
            cursor++;
         }

         if (cursor >= to || current.done) {
            return {
               value: undefined,
               done: true,
            };
         }

         cursor++;

         return current;
      },
   };
}
