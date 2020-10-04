import test from 'ava';

import { fail } from './fail';

test('test fail passes', (t) => {
  const messages = [{ message: 'input was not 5' }];
  const result = fail({ input: 4, messages });
  t.deepEqual(result, { kind: 'failure', error: { input: 4, messages } });
});
