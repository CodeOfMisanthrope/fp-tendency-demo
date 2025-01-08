import { Result } from "~core/containers";

describe("Result", () => {
   test("result with data", () => {
      const data = 42;
      const res = new Result(() => data);

      res.then((val) => {
         expect(val).toEqual(data);
      });
   });

   test("result with data catch", () => {
      const res = new Result(() => 42);
      let catchCalled = false;

      res.catch((_) => {
         catchCalled = true;
      });

      expect(catchCalled).toBe(false);
   });

   test("result with error", () => {
     const error = new Error("Result error");
      const res = new Result(() => {
         throw error;
      });

      res.catch((err) => {
        expect(err).toEqual(error);
      });
   });

   test("result with error then", () => {
      const res = new Result(() => {
         throw new Error("Result error");
      });

      let thenCalled = false;

      res.then((_) => {
         thenCalled = true;
      });

      expect(thenCalled).toBe(false);
   });
});
