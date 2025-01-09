import { Result } from "~core/containers";

describe("Result", () => {
   test("should resolve with data", () => {
      const expectedData = 42;
      const result = new Result(() => expectedData);

      result.then((value) => {
         expect(value).toEqual(expectedData);
      });
   });

   test("should not trigger catch for successful result", () => {
      const result = new Result(() => 42);
      let catchInvoked = false;

      result.catch(() => {
         catchInvoked = true;
      });

      expect(catchInvoked).toBe(false);
   });

   test("should handle error correctly", () => {
      const error = new Error("Result error occurred");
      const result = new Result(() => {
         throw error;
      });

      result.catch((err) => {
         expect(err).toEqual(error);
      });
   });

   test("should not trigger then for an error result", () => {
      const result = new Result(() => {
         throw new Error("Result error occurred");
      });

      let thenInvoked = false;

      result.then(() => {
         thenInvoked = true;
      });

      expect(thenInvoked).toBe(false);
   });

   test("should match correctly for successful result", () => {
      const result = Result.Ok("Success");
      const message = result.match(
         (val) => `Result: ${val}`,
         (err) => `Error: ${err.message}`,
      );
      expect(message).toEqual("Result: Success");
   });

   test("should match correctly for error result", () => {
      const error = new Error("An error occurred");
      const result = Result.Err(error);
      const message = result.match(
         (val) => `Result: ${val}`,
         (err) => `Error: ${err.message}`,
      );
      expect(message).toEqual("Error: An error occurred");
   });

   test("should unwrap successfully", () => {
      const result = Result.Ok("Unwrapped value");
      expect(result.unwrap()).toEqual("Unwrapped value");
   });

   test("should unwrap error correctly", () => {
      const error = new Error("Unwrap error");
      const result = Result.Err(error);
      expect(result.unwrap()).toEqual(error);
   });
});
