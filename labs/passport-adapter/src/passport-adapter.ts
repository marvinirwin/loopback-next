// Copyright IBM Corp. 2017,2019. All Rights Reserved.
// Node module: @loopback/authentication
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { AuthenticationStrategy, UserProfile } from '@loopback/authentication';
import { HttpErrors, Request, Response } from '@loopback/rest';
import { Passport, Strategy } from 'passport';

const passportRequestMixin = require('passport/lib/http/request');

/**
 * Adapter class that implements `AuthenticationStrategy` from `@loopback/authentication`
 * and invokes the authenticate function from `passport` under the hood.
 * see: https://github.com/jaredhanson/passport
 */
export class PassportAdapter implements AuthenticationStrategy {
  _passportStrategy: Strategy;


  // Ideally the constructor should be
  // constructor(private passport: Passport) {
  //  this._passport = passport;
  // }
  // The reason why temporarily it takes in a strategys is explained in
  // authentication-with-passport-adapter.acceptance Line 76
  /**
   * @param strategy instance of a class which implements a passport-strategy;
   * @description http://passportjs.org/
   */
  constructor(private strategy: Strategy, readonly name: string) {
    this._passportStrategy = strategy;
    this.name = name;
  }

  /**
   * The function to invoke the contained passport strategy.
   *     1. Create an instance of the strategy
   *     2. add success and failure state handlers
   *     3. authenticate using the strategy
   * @param request The incoming request.
   */
  async authenticate(request: Request): Promise<UserProfile> {
    return new Promise<UserProfile>((resolve, reject) => {
      // The following 2 lines should be created in the strategy provider
      // and call `new PassportAdapter(passport)` to instantiate the adapter class
      // The reason why temporarily put it here is explained in
      // authentication-with-passport-adapter.acceptance Line 76
      const passport = new Passport();
      passport.use(this._passportStrategy);
      for (const key in passportRequestMixin) {
        // tslint:disable-next-line:no-any
        (request as any)[key] = passportRequestMixin[key];
      }

      const response = ({} as any) as Response;
      const cb = (err: Error, user: UserProfile, challenge: string) => {
        // TBD: support multiple strategies
        // reject internal server errors
        if (err) return reject(new HttpErrors.InternalServerError(err.message));

        // reject credential validation errors
        if (challenge) return reject(new HttpErrors.Unauthorized(challenge));

        resolve(user);
      };

      const authFn = passport.authenticate(this.strategy.name || this.name, cb);
      try {
        authFn(request, response);
      } catch {
        (err: Error) => {
          reject(new HttpErrors.Unauthorized(err.message));
        };
      }
    });
  }
}
