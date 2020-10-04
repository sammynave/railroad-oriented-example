import test from 'ava';

import { pass } from './pass';

test('test fail passes', (t) => {
  const result = pass(4);
  t.deepEqual(result, { kind: 'success', value: 4 });
});
