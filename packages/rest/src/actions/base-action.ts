// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Next} from '@loopback/context';
import {HttpContext, RestAction} from '../types';

export class BaseRestAction implements RestAction {
  async run(ctx: HttpContext, next: Next) {
    return await next();
  }
}
