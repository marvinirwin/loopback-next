# @loopback/repository-tests

A test suite verifying functionality of `@loopback/repository` in a
connector-independent way.

## Overview

The module provides test-suite factories to define standardized test suite
capable of testing any combination of a Repository class and a corresponding
connector, for example `DefaultCrudRepository` with connectors like `memory`,
`mysql` and `mongodb`.

## Installation

```sh
npm install --save @loopback/repository-testsuite
```

## Basic use

Add the following file to your test suite, and make the following changes:

- Replace `DefaultCrudRepository` with the repository class you want to test.
- Replace the string `'memory'` with the default export of the connector to use,
  e.g. `require('loopback-connector-mysql')`.
- If your database uses string primary keys (e.g. GUID/UUID), then change
  `idType` to `'string'`.

```ts
import {DefaultCrudRepository} from '@loopback/repository';
import {
  CrudRepositoryCtor,
  crudRepositoryTestSuite,
} from '@loopback/repository-tests';

describe('DefaultCrudRepository + memory connector', () => {
  crudRepositoryTestSuite(
    {
      connector: 'memory',
      // add any database-specific configuration, e.g. credentials & db name
    },
    // Workaround for the following TypeScript error
    //   Type 'DefaultCrudRepository<T, ID, {}>' is not assignable to
    //     type 'EntityCrudRepository<T, ID, Relations>'.
    // See https://github.com/microsoft/TypeScript/issues/31840
    DefaultCrudRepository as CrudRepositoryCtor,
    {
      idType: 'number',
    },
  );
});
```

## Contributions

- [Guidelines](https://github.com/strongloop/loopback-next/blob/master/docs/CONTRIBUTING.md)
- [Join the team](https://github.com/strongloop/loopback-next/issues/110)

## Tests

Run `npm test` from the root folder.

## Contributors

See
[all contributors](https://github.com/strongloop/loopback-next/graphs/contributors).

## License

MIT
