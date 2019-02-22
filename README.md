# millennium-node-falcon

[![CircleCI](https://circleci.com/gh/PaulKariukiRimiru/millennium-node-falcon/tree/develop.svg?style=svg)](https://circleci.com/gh/PaulKariukiRimiru/millennium-node-falcon/tree/develop)
[![Coverage Status](https://coveralls.io/repos/github/PaulKariukiRimiru/millennium-node-falcon/badge.svg?branch=develop)](https://coveralls.io/github/PaulKariukiRimiru/millennium-node-falcon?branch=develop)

This is a utility library that aims at making your end-points neater by organising them in classes.

## How to get setup

### Installation

Run `npm i millennium-node-falcon` or `yarn add millennium-node-falcon`

### Hello world

In your entry point file:

- import `import * as falcon from 'millennium-node-falcon';`
- import a resource class. (Creation demonstrated below)
- add `await falcon.createFalconApp();`
- create a self-invoking function and thats it.

The file should look like this.

```
import * as falcon from 'millennium-node-falcon';
import { Users } from './Users';

(async () => {
  await falcon.createFalconApp();
  new Users();
})();
```

Next step create a resource class

- Create a nomal ES6 class
- `@method(MethodType, url)` decorator class funtions
- The functions should receive two parameters

  - `body` for `POST, PUT, DELETE` or `params` for `GET`
  - express response

Sample of a class

```
import { MethodTypes, method } from 'millennium-node-falcon';

export class Users {
  constructor(){}

  @method(MethodTypes.get, '/')
  helloSample(req, res) {
    res.send({ message: 'hello from falcon' })
  }
}

```

And thats it you are ready to code, give it a star if you like it :-)
