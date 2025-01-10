import { Option } from "~core/containers";

describe("Option", () => {
   test("should resolve with data", () => {
      const expectedData = 42;
      const option = new Option(() => expectedData);

      option.then((val) => {
         expect(val).toEqual(expectedData);
      });
   });

   test("should not invoke catch for successful resolution", () => {
      const option = new Option(() => 42);
      let catchInvoked = false;

      option.catch(() => {
         catchInvoked = true;
      });

      expect(catchInvoked).toBe(false);
   });

   test("should handle absence of value correctly", () => {
      const option = new Option(() => {});

      option.catch(() => {
         expect(null).toEqual(null);
      });
   });

   test("should not invoke then for an absent value", () => {
      const result = new Option(() => {});

      let thenInvoked = false;

      result.then(() => {
         thenInvoked = true;
      });

      expect(thenInvoked).toBe(false);
   });

   test("should match Some case correctly", () => {
      const option = new Option(() => 42);

      const result = option.match(
         (val) => val * 2,
         () => 0,
      );

      expect(result).toBe(84);
   });

   test("should match None case correctly", () => {
      const option = new Option<number>(() => null);

      const result = option.match(
         (val) => val * 2,
         () => -1,
      );

      expect(result).toBe(-1);
   });

   test("should unwrap the value correctly when present", () => {
      const option = new Option(() => 42);
      const value = option.unwrap();
      expect(value).toBe(42);
   });

   test("should return null when unwrapping an absent value", () => {
      const option = new Option(() => null);
      const value = option.unwrap();
      expect(value).toBeNull();
   });

   test("should execute a generator function using exec", () => {
      const mockLog = jest.spyOn(console, "log").mockImplementation(() => {});

      Option.exec(function* main() {
         const res1 = new Option(() => 42);
         console.log(yield res1); // 42

         const res2 = yield new Option(() => {
            return null;
         });
         console.log(res2); // null
      });

      expect(mockLog).toHaveBeenCalledWith(42);
      expect(mockLog).toHaveBeenCalledWith(null);
      mockLog.mockRestore();
   });
});
