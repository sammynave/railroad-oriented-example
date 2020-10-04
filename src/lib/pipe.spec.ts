import test from 'ava';

import { pipe } from './pipe';
test('test pipe passes', (t) => {
  const result = pipe([(x: number) => x + 1, (x: number) => x * 2])(1);
  t.deepEqual(result, 4);
});
