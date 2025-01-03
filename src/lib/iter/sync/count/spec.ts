import { count } from "~core/iter/sync/count";

describe("iCount", () => {
  test("counts elements in iterable", () => {
    expect(count([1, 2, 3, 4, 5])).toBe(5);
  });

  test("returns 0 for empty iterable", () => {
    expect(count([])).toBe(0);
  });
});
