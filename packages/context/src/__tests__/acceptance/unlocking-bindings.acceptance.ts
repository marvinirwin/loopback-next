// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/context
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {expect} from '@loopback/testlab';
import {Binding, Context} from '../..';

describe(`Context bindings - Unlocking bindings`, () => {
  describe('Unlocking a locked binding', () => {
    let ctx: Context;
    let binding: Binding;
    beforeAll(createContext);
    beforeAll(createLockedBinding);

    describe('when the binding', () => {
      describe('is unlocked', () => {
        beforeAll(unlockBinding);

        it("sets it's lock state to false", () => {
          expect(binding.isLocked).to.be.false();
        });

        function unlockBinding() {
          binding.unlock();
        }
      });
    });

    describe('when the context', () => {
      describe('rebinds the duplicate key with an unlocked binding', () => {
        it('does not throw a rebinding error', () => {
          const operation = () => ctx.bind('foo').to('baz');
          expect(operation).to.not.throw();
        });

        it('binds the duplicate key to the new value', async () => {
          const result = await ctx.get('foo');
          expect(result).to.equal('baz');
        });
      });
    });

    function createContext() {
      ctx = new Context();
    }
    function createLockedBinding() {
      binding = ctx.bind('foo').to('bar');
      binding.lock();
    }
  });
});
