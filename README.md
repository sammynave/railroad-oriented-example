# railroad-oriented-example

```js
import { createValidator, validate } from './validate';

const isEven = createValidator({
  check: (x) => x % 2 === 0,
  errorMessage: 'is not even',
});

const isDivisibleByFour = createValidator({
  check: (x) => x % 4 === 0,
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

## improvements

- Failure object

  - maybe have optional path ex:

  ```js
  const validators = [
    createValidator({
      check: (x) => x.y.z === 1,
      path: ['y', 'z'], // could this be inferred?
      errorMessage: 'is not 1',
    }),
  ];

  validate({ y: { z: 2 } }).with(validators);
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
