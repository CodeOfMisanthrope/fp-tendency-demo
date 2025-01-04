import { slice } from "~core/iter/sync/slice";

describe("slice", () => {
  test("extracts a portion of the iterable", () => {
    const result = [...slice([0, 1, 2, 3, 4, 5], 1, 4)];
    expect(result).toEqual([1, 2, 3]);
  });

  test("manages indices that exceed the iterable's length", () => {
    const result = [...slice([0, 1, 2, 3, 4], 2, 10)];
    expect(result).toEqual([2, 3, 4]);
  });

  test("returns an empty iterable for an invalid range", () => {
    const result = [...slice([0, 1, 2, 3, 4], 4, 2)];
    expect(result).toEqual([]);
  });
});
