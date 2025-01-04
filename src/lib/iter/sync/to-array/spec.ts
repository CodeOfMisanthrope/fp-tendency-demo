import { toArray } from "~core/iter/sync/to-array";

describe("iToArray", () => {
  test("converts generator to array", () => {
    const generator = function* () {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    };
    const result = toArray(generator());
    expect(result).toEqual([1, 2, 3]);
  });

  test("works with empty generator", () => {
    const generator = function* () {};
    const result = toArray(generator());
    expect(result).toEqual([]);
  });
});
