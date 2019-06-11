// Copyright IBM Corp. 2017,2018. All Rights Reserved.
// Node module: @loopback/repository-tests
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {DefaultCrudRepository} from '@loopback/repository';
import {
  CrudRepositoryCtor,
  crudRepositoryTestSuite,
} from '@loopback/repository-tests';

const connector = require('loopback-connector-mongodb');

describe('MongoDB + DefaultCrudRepository', () => {
  crudRepositoryTestSuite(
    {connector},
    // Workaround for https://github.com/microsoft/TypeScript/issues/31840
    DefaultCrudRepository as CrudRepositoryCtor,
    {
      idType: 'string',
    },
  );
});
