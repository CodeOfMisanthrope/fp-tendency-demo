import { Option } from "~core/containers";

describe("Option", () => {
   test("should resolve with data", () => {
      const expectedData = 42;
      const option = new Option(() => expectedData);

      option.then((val) => {
         expect(val).toEqual(expectedData);
      });
   });

   test("should not trigger catch for successful result", () => {
      const option = new Option(() => 42);
      let catchInvoked = false;

      option.catch(() => {
         catchInvoked = true;
      });

      expect(catchInvoked).toBe(false);
   });

   test("should handle error correctly", () => {
      const option = new Option(() => {});

      option.catch(() => {
         expect(null).toEqual(null);
      });
   });

  test("should not trigger then for an error result", () => {
    const result = new Option(() => {});

    let thenInvoked = false;

    result.then(() => {
      thenInvoked = true;
    });

    expect(thenInvoked).toBe(false);
  });
});
