type fn<arg, r> = (x: arg | r) => r;
export function pipe<T, R>(fns: readonly fn<T, R>[]): (arg: T | R) => T | R {
  return (arg) => fns.reduce((prev, fn) => fn(prev), arg);
}
