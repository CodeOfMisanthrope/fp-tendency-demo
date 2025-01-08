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

   public then<R>(resolver: ResolverOk<T, R>) {
                if (this.state !== State.OK) {
         return this;
      }

      return new Result<R>(() => {
         return resolver(this.val);
      });
   }

   public catch<R>(resolver: ResolverErr<R>) {
      if (this.state !== State.ERR) {
         return this;
      }

      return new Result<R>(() => {
         return resolver(this.err);
      });
   }
}
