import { repeat } from "~core/iter/sync/repeat";

describe("core/iter/repeat", () => {
  test("repeat [1, 2, 3, 4] 2", () => {
    const iter = repeat([1, 2, 3, 4], 2);
    expect([...iter]).toEqual([1, 2, 3, 4, 1, 2, 3, 4]);
  });

  test("repeat [1, 2, 3, 4] 0", () => {
    const iter = repeat([1, 2, 3, 4], 0);
    expect([...iter]).toEqual([]);
  });
});
