// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/context
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {expect} from '@loopback/testlab';
import {Binding, Context} from '../..';

describe('Context bindings - Tagged bindings', () => {
  let ctx: Context;
  let binding: Binding;
  beforeAll(createContext);
  beforeAll(createBinding);

  describe('tag', () => {
    describe('when the binding is tagged', () => {
      beforeAll(tagBinding);

      it('has a tag name', () => {
        expect(binding.tagNames).to.containEql('controller');
      });

      function tagBinding() {
        binding.tag('controller');
      }
    });

    describe('when the binding is tagged with multiple names', () => {
      beforeAll(tagBinding);

      it('has tags', () => {
        expect(binding.tagNames).to.containEql('controller');
        expect(binding.tagNames).to.containEql('rest');
      });

      function tagBinding() {
        binding.tag('controller', 'rest');
      }
    });

    describe('when the binding is tagged with name/value objects', () => {
      beforeAll(tagBinding);

      it('has tags', () => {
        expect(binding.tagNames).to.containEql('controller');
        expect(binding.tagNames).to.containEql('name');
        expect(binding.tagMap).to.containEql({
          name: 'my-controller',
          controller: 'controller',
        });
      });

      function tagBinding() {
        binding.tag({name: 'my-controller'}, 'controller');
      }
    });
  });

  function createContext() {
    ctx = new Context();
  }
  function createBinding() {
    binding = ctx.bind('foo').to('bar');
  }
});
