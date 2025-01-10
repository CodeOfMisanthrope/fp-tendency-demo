import {
   Resolver,
   ResolverNone,
   ResolverSome,
   State,
} from "~core/containers/option/interfaces";

/**
 * Represents an optional value that can either be present (Some) or absent (None).
 * Instances of Option are thenable, meaning they can be used in a similar way to Promises,
 * having `then` and `catch` methods.
 *
 * @template T - The type of the value contained in the Option.
 */
export default class Option<T> {
   /**
    * The current state of the Option, which can be one of the following:
    * - State.IDLE: The Option has not yet been resolved.
    * - State.SOME: When the Option has data.
    * - State.NONE: When the Option has no data.
    *
    * @protected
    * @type {State}
    */
   protected state: State;

   /**
    * The value contained in the Option.
    *
    * @protected
    * @type {T}
    */
   protected val!: T;

   /**
    * The current state of the Option.
    *
    * @readonly
    * @returns {State} The current state of the Option.
    *
    * @example
    * const result = new Option(() => 42);
    * console.log(result.status); // "Some"
    */
   get status() {
      return this.state;
   }

   /**
    * Creates an Option instance representing an absence of value.
    *
    * @static
    * @returns {Option<T>} A new Option instance in the None state.
    *
    * @example
    * const noneOption = Option.None();
    * console.log(noneOption.status); // "None"
    */
   static None<T>() {
      return new Option(() => null);
   }

   /**
    * Creates an Option instance representing a presence of value.
    *
    * @static
    * @param {T} val - The value to be represented by the Option.
    * @returns {Option<T>} A new Option instance in the Some state.
    *
    * @example
    * const someOption = Option.Some(42);
    * console.log(someOption.status); // "Some"
    */
   static Some<T>(val: T) {
      return new Option(() => val);
   }

   /**
    * Executes a generator function that yields Option instances.
    * This allows for asynchronous workflows using the Option type.
    *
    * @template T - The type of the value contained in the Option.
    *
    * @param {() => Generator<Option<T>>} executor - A generator function to be executed.
    *
    * @example
    * Option.exec(function* main() {
    *    const res1 = new Option(() => 42);
    *    console.log(yield res1); // 42
    *
    *    const res2 = yield new Option(() => null);
    *    console.log(res2); // null
    * });
    */
   static exec<T>(executor: () => Generator<Option<T>>) {
      const generator = executor();

      let next = generator.next();

      while (!next.done) {
         const result = next.value;

         result
            .then((value) => {
               next = generator.next(value);
            })
            .catch(() => {
               next = generator.next(null);
            });
      }
   }

   constructor(executor: Resolver<T>) {
      this.state = State.IDLE;

      const res = executor();

      if (res == null) {
         this.state = State.NONE;
      } else {
         this.state = State.SOME;
         this.val = res;
      }
   }

   /**
    * Creates a new Option based on the outcome of the provided resolver functions.
    * If the Option is in the `Some` state, the `some` resolver is called; if it
    * is in the `None` state, the `none` resolver (if provided) is called.
    *
    * @template R - The type of the value returned by the resolver for Some.
    * @template E - The type of the value returned by the resolver for None.
    *
    * @param {ResolverSome<T, R>} resolverSome - Handler for Some case.
    * @param {ResolverNone<E>} [resolverNone] - Optional handler for None case.
    *
    * @returns {Option<R | E>} A new Option instance.
    *
    * @example
    * const option = new Option(() => 42);
    * const result = option.then(val => val * 2); // Returns an Option containing 84
    */
   public then<R, E>(
      resolverSome: ResolverSome<T, R>,
      resolverNone?: ResolverNone<E>,
   ) {
      if (this.state === State.SOME) {
         return new Option<R>(() => {
            return resolverSome(this.val);
         });
      }

      if (resolverNone && this.state === State.NONE) {
         return new Option<E>(() => {
            return resolverNone();
         });
      }

      return this;
   }

   /**
    * Adds a rejection handler to the Option.
    * Similar to Promise's `catch` method.
    *
    * @template R - The type of the value returned by the resolver for None.
    *
    * @param {ResolverNone<R>} resolver - Handler for None case.
    *
    * @returns {Option<R>} A new Option instance.
    *
    * @example
    * const option = new Option(() => null);
    * option.catch(() => 'No value'); // Returns an Option containing 'No value'
    */
   public catch<R>(resolver: ResolverNone<R>) {
      if (this.state !== State.NONE) {
         return this;
      }

      return new Option<R>(() => {
         return resolver();
      });
   }

   /**
    * Matches the Option's state and executes the corresponding handler.
    *
    * @template R - The type of the value returned by the handler for Some.
    * @template E - The type of the value returned by the handler for None.
    *
    * @param {ResolverSome<T, R>} some - Handler for Some case.
    * @param {ResolverNone<E>} none - Handler for None case.
    *
    * @returns {R | E} The result of the executed handler.
    *
    * @example
    * const option = new Option(() => 42);
    * const result = option.match(
    *    (val) => val * 2,
    *    () => 0
    * ); // result will be 84
    */
   public match<R, E>(some: ResolverSome<T, R>, none: ResolverNone<E>) {
      if (this.state === State.SOME) {
         return some(this.val);
      }

      if (this.state === State.NONE) {
         return none();
      }
   }

   /**
    * Returns the value contained in the Option if present, otherwise returns null.
    *
    * @returns {T | null} The contained value or null if None.
    *
    * @example
    * const optionSome = new Option(() => 42);
    * const some = optionSome.unwrap(); // 42
    *
    * const optionNone = new Option(() => null);
    * const none = optionNone.unwrap(); // null
    */
   public unwrap() {
      if (this.state === State.SOME) {
         return this.val;
      }

      if (this.state === State.NONE) {
         return null;
      }
   }
}
