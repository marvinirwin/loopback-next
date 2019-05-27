// // Copyright IBM Corp. 2019. All Rights Reserved.
// // Node module: @loopback/authentication
// // This file is licensed under the MIT License.
// // License text available at https://opensource.org/licenses/MIT

// import {UserProfile} from '@loopback/authentication';
// import {HttpErrors, Request} from '@loopback/rest';
// import {expect} from '@loopback/testlab';
// import {AuthenticateOptions} from 'passport';
// import {MockPassportStrategy} from './fixtures/mock-passport-strategy';
// import {StrategyAdapter} from '../..';

// describe('Strategy Adapter', () => {
//   const mockUser: UserProfile = {name: 'user-name', id: 'mock-id'};

//   describe('authenticate()', () => {
//     it('calls the authenticate method of the strategy', async () => {
//       let calledFlag = false;
//       // TODO: (as suggested by @bajtos) use sinon spy
//       class Strategy extends MockPassportStrategy {
//         // override authenticate method to set calledFlag
//         async authenticate(req: Request, options?: AuthenticateOptions) {
//           calledFlag = true;
//           await MockPassportStrategy.prototype.authenticate.call(
//             this,
//             req,
//             options,
//           );
//         }
//       }
//       const strategy = new Strategy();
//       const adapter = new StrategyAdapter(strategy, 'mock-strategy');
//       const request = <Request>{};
//       await adapter.authenticate(request);
//       expect(calledFlag).to.be.true();
//     });

//     it('returns a promise which resolves to an object', async () => {
//       const strategy = new MockPassportStrategy();
//       strategy.setMockUser(mockUser);
//       const adapter = new StrategyAdapter(strategy, 'mock-strategy');
//       const request = <Request>{};
//       const user: Object = await adapter.authenticate(request);
//       expect(user).to.be.eql(mockUser);
//     });

//     it('throws Unauthorized error when authentication fails', async () => {
//       const strategy = new MockPassportStrategy();
//       strategy.setMockUser(mockUser);
//       const adapter = new StrategyAdapter(strategy, 'mock-strategy');
//       const request = <Request>{};
//       request.headers = {testState: 'fail'};
//       let error;
//       try {
//         await adapter.authenticate(request);
//       } catch (err) {
//         error = err;
//       }
//       expect(error).to.be.instanceof(HttpErrors.Unauthorized);
//     });

//     it('throws InternalServerError when strategy returns error', async () => {
//       const strategy = new MockPassportStrategy();
//       strategy.setMockUser(mockUser);
//       const adapter = new StrategyAdapter(strategy, 'mock-strategy');
//       const request = <Request>{};
//       request.headers = {testState: 'error'};
//       let error;
//       try {
//         await adapter.authenticate(request);
//       } catch (err) {
//         error = err;
//       }
//       expect(error).to.be.instanceof(HttpErrors.InternalServerError);
//     });
//   });
// });
