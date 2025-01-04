export function curry(fn: Function) {
   return function curryFn(this: unknown, ...args: unknown[]) {
      if (fn.length <= args.length) {
         return fn.apply(this, args);
      }

      return function (this: unknown, ...newArgs: unknown[]) {
         return curryFn.apply(this, [...args, ...newArgs]);
      };
   };
}
