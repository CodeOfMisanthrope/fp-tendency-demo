import { first } from "~core/iter/sync/first";

describe("iFirst", () => {
  test("first element of [1, 2, 3]", () => {
    expect(first([1, 2, 3])).toBe(1);
  });

  test("returns undefined for empty iterable", () => {
    expect(first([])).toBeUndefined();
  });
});
