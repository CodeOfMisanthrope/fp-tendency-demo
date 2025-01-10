export type Resolver<T> = () => Nullable<T>;
export type ResolverSome<T, R> = (val: T) => Nullable<R>;
export type ResolverNone<R> = () => Nullable<R>;

export const enum State {
   IDLE = "Idle",
   SOME = "Some",
   NONE = "None",
}
