/**
 * Applies a given function to each element of an iterable and returns a new iterator with transformed values.
 *
 * @template T - The type of elements in the input iterable.
 * @template U - The type of elements in the output iterator.
 *
 * @param {Iterable<T>} iterable - The iterable object whose elements will be transformed.
 * @param {(v: T, index?: number, iterable?: Iterable<T>) => U} fn - The function to apply to each element.
 * It takes three arguments:
 * - `v` - The current element of the iterator.
 * - `index` - The index of the current element (starting from 0).
 * - `iterable` - The original iterable object.
 * @param {unknown} [thisArg] - The value to use as `this` when calling the function `fn`.
 *
 * @returns {{ [Symbol.iterator]: function(): { next: function(): { value: U, done: boolean } } }} - A new iterator that yields the transformed values.
 *
 * @example
 * const numbers = [1, 2, 3];
 * const doubled = map(numbers, (num) => num * 2);
 * for (const value of doubled) {
 *     console.log(value); // 2, 4, 6
 * }
 */
export default function map<T, U>(
    iterable: Iterable<T>,
    fn: (v: T, index?: number, iterable?: Iterable<T>) => U,
    thisArg?: unknown
) {
    const iter = iterable[Symbol.iterator]();

    let i = 0;

    return {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            const res = iter.next();

            if (!res.done) {
                return {
                    value: fn.call(thisArg, res.value, i++, iterable),
                    done: res.done,
                };
            }

            return res;
        },
    };
};
