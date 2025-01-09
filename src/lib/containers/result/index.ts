import {
   Resolver,
   ResolverErr,
   ResolverOk,
   State,
} from "~core/containers/result/interfaces";

/**
 * Represents the outcome of an operation that can either be a success or an error.
 * This class is inspired by the Result type in Rust and is designed to work similarly
 * to a Promise, providing methods for handling success and error cases. Instances of
 * Result are thenable, meaning they support `then` and `catch` methods.
 *
 * @template T - The type of the value contained in the Result if it is successful.
 */
export default class Result<T> {
   /**
    * The current state of the Result, which can be one of the following:
    * - State.IDLE: The Result has not yet been resolved.
    * - State.OK: The Result represents a successful operation.
    * - State.ERR: The Result represents an error.
    *
    * @protected
    * @type {State}
    */
   protected state: State;

   /**
    * The error associated with the Result if it is in the ERR state.
    *
    * @protected
    * @type {Error}
    */
   protected err!: Error;

   /**
    * The value contained in the Result if it is in the OK state.
    *
    * @protected
    * @type {CanVoid<T>}
    */
   protected val!: CanVoid<T>;

   /**
    * Creates a Result instance representing an error.
    *
    * @static
    * @param {Error|string} err - The error to be represented by the Result.
    * @returns {Result<T>} A Result instance in the error state.
    *
    * @example
    * const errorResult = Result.Err('An error occurred');
    * console.log(errorResult.status); // "Err"
    */
   static Err<T>(err: Error | string) {
      return new Result<T>(() => {
         throw err;
      });
   }

   /**
    * Creates a Result instance representing a successful operation.
    *
    * @static
    * @param {T} val - The value to be represented by the Result.
    * @returns {Result<T>} A Result instance in the success state.
    *
    * @example
    * const successResult = Result.Ok(42);
    * console.log(successResult.status); // "Ok"
    */
   static Ok<T>(val: T) {
      return new Result<T>(() => val);
   }

   /**
    * The current state of the Result.
    *
    * @readonly
    * @returns {State} The current state of the Result.
    *
    * @example
    * const result = new Result(() => 42);
    * console.log(result.status); // "Ok"
    */
   get status() {
      return this.state;
   }

   /**
    * Executes the provided generator function, managing the Result's state
    * and handling asynchronous operations.
    *
    * @static
    * @param {() => Generator<Result<T>>} executor - A generator function that yields Results.
    *
    * @example
    * Result.exec(function* main() {
    *   const res1 = new Result(() => 42);
    *   console.log(yield res1); // 42
    *
    *   try {
    *     const res2 = yield new Result(() => {
    *       throw 'Boom!';
    *     });
    *   } catch (err) {
    *     console.error(err); // "Boom!" (Error)
    *   }
    * });
    */
   static exec<T>(executor: () => Generator<Result<T>>) {
      const generator = executor();

      let next = generator.next();

      while (!next.done) {
         const result = next.value;

         result
            .then((value) => {
               next = generator.next(value);
            })
            .catch((err) => {
               next = generator.throw(err);
            });
      }
   }

   constructor(executor: Resolver<T>) {
      this.state = State.IDLE;

      try {
         this.val = executor();
         this.state = State.OK;
      } catch (err) {
         this.err = err as Error;
         this.state = State.ERR;
      }
   }

   /**
    * Creates a new Result based on the outcome of the provided resolver functions.
    * If the Result is in the OK state, the success resolver is called; if it is in
    * the ERR state, the error resolver (if provided) is called.
    *
    * @template R
    * @template E
    *
    * @param {ResolverOk<T, R>} resolverOk - The function to call if the Result is successful.
    * @param {ResolverErr<E>} [resolverErr] - The function to call if the Result is an error.
    * @returns {Result<R | E>} A new Result instance representing the outcome.
    *
    * @example
    * const result = new Result(() => 42);
    * result.then(value => {
    *   console.log(value); // 42
    * }).catch(err => {
    *   console.error(err);
    * });
    */
   public then<R, E>(
      resolverOk: ResolverOk<T, R>,
      resolverErr?: ResolverErr<E>,
   ) {
      if (this.state === State.OK) {
         return new Result<R>(() => {
            return resolverOk(this.val);
         });
      }

      if (resolverErr && this.state === State.ERR) {
         return new Result<E>(() => {
            return resolverErr(this.err);
         });
      }

      return this;
   }

   /**
    * Calls the provided error resolver function if the Result is in the ERR state.
    *
    * @template R
    *
    * @param {ResolverErr<R>} resolver - The function to call with the error if the Result is an error.
    * @returns {Result<R>} A new Result instance representing the outcome or the current Result if not an error.
    *
    * @example
    * const result = Result.Err(new Error('Something went wrong'));
    * result.catch(err => {
    *   console.error(err.message); // "Something went wrong"
    * });
    */
   public catch<R>(resolver: ResolverErr<R>) {
      if (this.state !== State.ERR) {
         return this;
      }

      return new Result<R>(() => {
         return resolver(this.err);
      });
   }

   /**
    * Matches the Result against success and error handlers, returning the result of the corresponding handler.
    *
    * @template R
    * @template E
    *
    * @param {ResolverOk<T, R>} ok - The function to call if the Result is successful.
    * @param {ResolverErr<E>} err - The function to call if the Result is an error.
    * @returns {R | E} The result of the called handler.
    *
    * @example
    * const result = Result.Ok('Success!');
    * const message = result.match(
    *   val => `Success: ${val}`,
    *   err => `Error: ${err.message}`
    * );
    * console.log(message); // "Success: Success!"
    */
   public match<R, E>(ok: ResolverOk<T, R>, err: ResolverErr<E>) {
      if (this.state === State.OK) {
         return ok(this.val);
      }

      if (this.state === State.ERR) {
         return err(this.err);
      }
   }

   /**
    * Unwraps the Result, returning the value if it is successful or the error if it is an error.
    *
    * @returns {CanVoid<T | Error>} The value if the Result is OK, or the error if it is ERR.
    *
    * @example
    * const result = Result.Ok(100);
    * console.log(result.unwrap()); // 100
    *
    * const errorResult = Result.Err(new Error('Failed'));
    * console.error(errorResult.unwrap()); // Error: Failed
    */
   public unwrap() {
      if (this.state === State.OK) {
         return this.val;
      }

      if (this.state === State.ERR) {
         return this.err;
      }
   }
}
