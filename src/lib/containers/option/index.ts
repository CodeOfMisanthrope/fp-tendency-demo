import {
   Resolver,
   ResolverNone,
   ResolverSome,
   State,
} from "~core/containers/option/interfaces";

export default class Option<T> {
   protected state: State;

   // protected none = null;

   protected val!: T;

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
               next = generator.throw(null);
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

   public then<R, N>(
      resolverSome: ResolverSome<T, R>,
      resolverNone?: ResolverNone<N>,
   ) {
      if (this.state === State.SOME) {
         return new Option<R>(() => {
            return resolverSome(this.val);
         });
      }

      if (resolverNone && this.state === State.NONE) {
         return new Option<N>(() => {
            return resolverNone();
         });
      }

      return this;
   }

   public catch<R>(resolver: ResolverNone<R>) {
      if (this.state !== State.NONE) {
         return this;
      }

      return new Option<R>(() => {
         return resolver();
      });
   }

   public match<R, E>(some: ResolverSome<T, R>, none: ResolverNone<E>) {
      if (this.state === State.SOME) {
         return some(this.val);
      }

      if (this.state === State.NONE) {
         return none();
      }
   }

   public unwrap() {
      if (this.state === State.SOME) {
         return this.val;
      }

      if (this.state === State.NONE) {
         return null;
      }
   }
}
