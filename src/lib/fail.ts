type ErrorMessage<T> = {
  readonly message: string;
  readonly value?: T;
};

type ErrorMessages<T> = {
  readonly messages: readonly ErrorMessage<T>[];
  readonly input: T;
};

export type Failure<err> = {
  readonly kind: 'failure';
  readonly error: ErrorMessages<err>;
};

export const fail = <e>(err: ErrorMessages<e>): Failure<e> => ({
  kind: 'failure',
  error: err,
});
