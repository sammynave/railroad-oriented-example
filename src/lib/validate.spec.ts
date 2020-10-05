import test from 'ava';

import { createValidator, validate } from './validate';

const isEven = createValidator({
  check: (x) => x % 2 === 0,
  errorMessage: 'is not even',
});

const isFour = createValidator({
  check: (x) => x === 4,
  errorMessage: 'is not four',
});

test('test validation passes', (t) => {
  const result = validate(4).with([isEven, isFour]);
  t.deepEqual(result, { kind: 'success', value: 4 });
});

test('test 1 validation passes', (t) => {
  const result = validate(1).with([isEven, isFour]);
  t.deepEqual(result, {
    error: {
      input: 1,
      messages: [{ message: 'is not even' }, { message: 'is not four' }],
    },
    kind: 'failure',
  });
});
