# railroad-oriented-example

```js
import { createValidator, validate } from './validate';

const isEven = createValidator({
  assert: (x) => x % 2 === 0,
  errorMessage: 'is not even',
});

const isDivisibleByFour = createValidator({
  assert: (x) => x % 4 === 0,
  errorMessage: 'is not divisible by four',
});

const validators = [isEven, isNotFour];

validate(2).with(validators); // { kind: 'success', input: 2 }
validate(10).with(validators);
/*
{
  kind: 'failure',
  error: {
    input: 10,
    messages: [
      { message: 'is not divisible by four' },
      {message: 'is even' }
    ]
  }
}
/
```

Optional path argument for validating objects

```js
const validators = [
  createValidator({
    assert: (x) => x.y.z === 1,
    path: ['y', 'z'],
    errorMessage: 'is not 1',
  }),
];

const formResults = { a: 1, y: { z: 2 } };
validate(formResults).with(validators);
/*
{
  kind: 'failure',
  error: {
    input: {y: {z: 2 }},
    messages: [
      { message: 'is not 1', value: 2, key: 'z' }
    ]
  }
}
*/
```
