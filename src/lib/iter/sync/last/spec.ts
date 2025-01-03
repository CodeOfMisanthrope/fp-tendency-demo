import { last } from "~core/iter/sync/last";

describe("iLast", () => {
  test("returns last element of non-empty iterable", () => {
    expect(last([1, 2, 3])).toBe(3);
  });

  test("returns undefined for empty iterable", () => {
    expect(last([])).toBeUndefined();
  });
});
