import { enumerate } from "~core/iter/sync/enumerate";

describe("enumerate", () => {
  test("enumerate [1, 2, 3, 4]", () => {
    const iter = enumerate([1, 2, 3, 4]);
    expect([...iter]).toEqual([
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
    ]);
  });

  test("enumerate []", () => {
    const iter = enumerate([]);
    expect([...iter]).toEqual([]);
  });
});
