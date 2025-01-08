export type Resolver<T> = () => CanVoid<T>;
export type ResolverOk<T, R> = (val: CanVoid<T>) => CanVoid<R>;

export const enum State {
  IDLE = "Idle",
  OK = "Ok",
  ERR = "Err"
}
