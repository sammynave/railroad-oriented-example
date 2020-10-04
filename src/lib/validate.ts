import { fail, Failure } from './fail';
import { pass, Success } from './pass';
import { pipe } from './pipe';

type Result<ok, err> = Success<ok> | Failure<err>;

export function createValidator({
  check,
  errorMessage,
}: {
  readonly check: (y: any) => boolean;
  readonly errorMessage: string;
}) {
  return function validation<s, f>(x: Result<s, f>): Result<s | f, s | f> {
    if (x.kind === 'success') {
      return check(x.value)
        ? pass(x.value)
        : fail({
            input: x.value,
            messages: [{ message: errorMessage }],
          });
    } else {
      if (check(x.error.input)) {
        return x;
      }
    }
    return fail({
      input: x.error.input,
      messages: x.error.messages.concat([{ message: errorMessage }]),
    });
  };
}

export const validate = <t>(value: t) => ({
  with: (validators: readonly any[]) => pipe(validators)(pass(value)),
});
