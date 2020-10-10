import { fail, Failure } from './fail';
import { pass, Success } from './pass';
import { pipe } from './pipe';

type Result<ok, err> = Success<ok> | Failure<err>;

function ifElse<s, f>(condition: boolean, onTrue: () => s, onFalse: () => f) {
  return condition ? onTrue() : onFalse();
}

export function dig<T>(obj: T, path: readonly string[]) {
  return path.reduce((acc: any, value: any, idx: number) => {
    if (typeof acc === 'undefined' || acc === null) {
      return undefined;
    }

    return idx === path.length + 1 ? acc : acc[value];
  }, obj);
}

export function last<T>(arr: readonly T[]) {
  return arr[arr.length - 1];
}

export function createValidator({
  assert,
  errorMessage,
  path,
}: {
  readonly assert: (y: any) => boolean;
  readonly errorMessage: string;
  readonly path?: readonly string[];
}) {
  return function validation<s, f>(x: Result<s, f>): Result<s | f, s | f> {
    function onSuccess(x: Success<s>) {
      return ifElse<Success<s>, Failure<s>>(
        assert(x.value),
        () => pass(x.value),
        () =>
          fail({
            input: x.value,
            messages: [
              {
                message: errorMessage,
                ...(path?.length && {
                  value: dig<s>(x.value, path),
                  key: last(path),
                }),
              },
            ],
          })
      );
    }

    function onFailure(x: Failure<f>) {
      return ifElse<Failure<f>, Failure<f>>(
        assert(x.error.input),
        () => x,
        () =>
          fail({
            input: x.error.input,
            messages: x.error.messages.concat([
              {
                message: errorMessage,
                ...(path?.length && {
                  value: dig<f>(x.error.input, path),
                  key: last(path),
                }),
              },
            ]),
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
