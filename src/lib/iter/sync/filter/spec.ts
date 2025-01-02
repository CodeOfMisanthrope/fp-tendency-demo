import { filter } from "~core/iter/sync/filter";

describe("core/iter/filter", () => {
  test("filter [1, 2, 3, 4]", () => {
    const iter = filter([1, 2, 3, 4], (el) => el % 2 === 0);
    expect([...iter]).toEqual([2, 4]);
  });

  test("filter []", () => {
    const iter = filter([], (el) => el % 2 === 0);
    expect([...iter]).toEqual([]);
  });
});
