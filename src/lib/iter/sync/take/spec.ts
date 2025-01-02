import { take } from "~core/iter/sync/take";

describe("core/iter/take", () => {
  test("take [1, 2, 3, 4] 3", () => {
    const iter = take([1, 2, 3, 4], 3);
    expect([...iter]).toEqual([1, 2, 3]);
  });

  test("take [1, 2, 3, 4] 4", () => {
    const iter = take([1, 2, 3, 4], 4);
    expect([...iter]).toEqual([1, 2, 3, 4]);
  });

  test("take [1, 2, 3, 4] 0", () => {
    const iter = take([1, 2, 3, 4], 0);
    expect([...iter]).toEqual([]);
  });
});
