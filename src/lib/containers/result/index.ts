import {
   Resolver,
   ResolverErr,
   ResolverOk,
   State,
} from "~core/containers/result/interfaces";

export default class Result<T> {
   protected state: State;
   protected err!: Error;
   protected val!: CanVoid<T>;

   static Err<T>(err: Error | string) {
      return new Result<T>(() => {
         throw err;
      });
   }

   static Ok<T>(val: T) {
      return new Result<T>(() => val);
   }

   get status() {
      return this.state;
   }

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

  public then<R, E>(resolverOk: ResolverOk<T, R>, resolverErr?: ResolverErr<E>) {
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

   public catch<R>(resolver: ResolverErr<R>) {
      if (this.state !== State.ERR) {
         return this;
      }

      return new Result<R>(() => {
         return resolver(this.err);
      });
   }

  public match<R, E>(ok: ResolverOk<T, R>, err: ResolverErr<E>) {
    if (this.state === State.OK) {
      return ok(this.val);
    }

    if (this.state === State.ERR) {
      return err(this.err);
    }
  }

  public unwrap() {
    if (this.state === State.OK) {
      return this.val;
    }

    if (this.state === State.ERR) {
      return this.err;
    }
  }
}
