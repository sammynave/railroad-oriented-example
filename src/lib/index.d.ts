type Success<ok> = {
  readonly kind: 'success';
  readonly value: ok;
};

type Failure<err> = {
  readonly kind: 'failure';
  readonly error: err;
};

type Result<ok, err> = Success<ok> | Failure<err>;
type fn = <T>(x: T) => Result<Success<T>, Failure<T>>;
