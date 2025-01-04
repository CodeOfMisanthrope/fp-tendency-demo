import { toSet } from "~core/iter/sync/to-set";

describe("toSet", () => {
  test("converts generator to set", () => {
    const generator = function* () {
      yield 1;
      yield 2;
      yield 3;
    };
    const result = toSet(generator());
    expect(result).toEqual(new Set([1, 2, 3]));
  });

  test("works with empty generator", () => {
    const generator = function* () {};
    const result = toSet(generator());
    expect(result).toEqual(new Set());
  });
});
