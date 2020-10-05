import { fail, Failure } from './fail';
import { pass, Success } from './pass';
import { pipe } from './pipe';

type Result<ok, err> = Success<ok> | Failure<err>;

function ifElse<s, f>(condition: boolean, onTrue: () => s, onFalse: () => f) {
  return condition ? onTrue() : onFalse();
}

export function createValidator({
  check,
  errorMessage,
}: {
  readonly check: (y: any) => boolean;
  readonly errorMessage: string;
}) {
  return function validation<s, f>(x: Result<s, f>): Result<s | f, s | f> {
    function onSuccess(x: Success<s>) {
      return ifElse<Success<s>, Failure<s>>(
        check(x.value),
        () => pass(x.value),
        () =>
          fail({
            input: x.value,
            messages: [{ message: errorMessage }],
          })
      );
    }
    function onFailure(x: Failure<f>) {
      return ifElse<Failure<f>, Failure<f>>(
        check(x.error.input),
        () => x,
        () =>
          fail({
            input: x.error.input,
            messages: x.error.messages.concat([{ message: errorMessage }]),
          })
      );
    }

    return ifElse<Success<s> | Failure<s>, Failure<f>>(
      x.kind === 'success',
      () => onSuccess(x as Success<s>),
      () => onFailure(x as Failure<f>)
    );
  };
}

export const validate = <t>(value: t) => ({
  with: (validators: readonly any[]) => pipe(validators)(pass(value)),
});
