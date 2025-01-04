import { count } from "~core/iter/sync/count";

describe("count", () => {
  test("counts elements in [1, 2, 3, 4, 5]", () => {
    expect(count([1, 2, 3, 4, 5])).toBe(5);
  });

  test("returns 0 for empty iterable", () => {
    expect(count([])).toBe(0);
  });
});
