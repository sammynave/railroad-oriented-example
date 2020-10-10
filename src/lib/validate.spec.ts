import test from 'ava';

import { createValidator, dig, last, validate } from './validate';

const isEven = createValidator({
  assert: (x) => x % 2 === 0,
  errorMessage: 'is not even',
});

const isFour = createValidator({
  assert: (x) => x === 4,
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

const isEvenAtPath = createValidator({
  assert: (x) => x.y.z % 2 === 0,
  path: ['y', 'z'],
  errorMessage: 'is not even',
});

const isFourAtPath = createValidator({
  assert: (x) => x.a === 4,
  path: ['a'],
  errorMessage: 'is not four',
});

test('test 1 validation passes with path', (t) => {
  const obj = { a: 5, y: { z: 1 } };
  const result = validate(obj).with([isEvenAtPath, isFourAtPath]);
  t.deepEqual(result, {
    error: {
      input: obj,
      messages: [
        { message: 'is not even', key: 'z', value: 1 },
        { message: 'is not four', key: 'a', value: 5 },
      ],
    },
    kind: 'failure',
  });
});

test('dig', (t) => {
  t.is(dig({ a: { b: { c: 1 } } }, ['a', 'b', 'c']), 1);
});

test('dig with invalid path', (t) => {
  t.is(dig({ a: { b: { c: 1 } } }, ['a', 'd', 'c']), undefined);
});

test('last', (t) => {
  t.is(last(['a', 'b', 'c']), 'c');
});

test('last on empty array', (t) => {
  t.is(last([]), undefined);
});
