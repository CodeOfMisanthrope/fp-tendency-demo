import { curry } from "~core/utils/curry";

describe("curry", () => {
   test("should return correct results for two-argument functions", () => {
      const add = (x: number, y: number) => x + y;
      const add2 = (x: number, y: number, z: number) => x + y + z;

      const res1 = curry(add)(1)(2);
      const res2 = curry(add)(1)(3);
      const res3 = curry(add2)(1)(3)(3);

      expect([res1, res2, res3]).toEqual([3, 4, 7]);
   });

   test("should return a functions when not all arguments are provided", () => {
      const add = (x: number, y: number) => x + y;
      const add2 = (x: number, y: number, z: number) => x + y + z;

      expect([
         typeof curry(add)(1)(2),
         typeof curry(add)(1)(3),
         typeof curry(add2)(1)(3),
      ]).toEqual(["number", "number", "function"]);
   });

  test("should return a function when not all arguments are provided", () => {
    const multiply = (x: number, y: number) => x * y;

    const curriedMultiply = curry(multiply)(2); // только один аргумент передан
    expect(typeof curriedMultiply).toBe("function");
  });

   test("curry with two arguments", () => {
      const add = (x: number, y: number) => x + y;
      const res1 = curry(add)(1)(2);
      const res2 = curry(add)(1)(3);
      const res3 = curry(add)(1, 2); // вариант с передачей обоих аргументов сразу

      expect([res1, res2, res3]).toEqual([3, 4, 3]);
   });

   test("curry with insufficient arguments", () => {
      const add = (x: number, y: number) => x + y;

      const curriedAdd = curry(add)(1); // только один аргумент передан
      const res = curriedAdd(2); // передаем второй аргумент позже

      expect(res).toEqual(3);
   });

   test("curry with no arguments", () => {
      const add = (x: number, y: number) => x + y;

      const curriedAdd = curry(add)(); // вызываем без аргументов
      const res = curriedAdd(2)(3); // передаем аргументы позже

      expect(res).toEqual(5);
   });

   test("curry with context", () => {
      const obj = {
         value: 5,
         add: function (x: number) {
            return this.value + x;
         },
      };

      const curriedAdd = curry(obj.add.bind(obj)); // привязываем контекст
      const res = curriedAdd(3); // передаем аргумент

      expect(res).toEqual(8); // 5 + 3
   });
});
