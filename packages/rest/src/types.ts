// Copyright IBM Corp. 2018,2019. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  bind,
  BindingSpec,
  BindingTemplate,
  Context,
  GenericInterceptor,
  InvocationArgs,
  InvocationResult,
} from '@loopback/context';
import {ReferenceObject, SchemaObject} from '@loopback/openapi-v3-types';
import * as ajv from 'ajv';
import {
  Options,
  OptionsJson,
  OptionsText,
  OptionsUrlencoded,
} from 'body-parser';
import {Request, Response} from 'express';
// export all errors from external http-errors package
import * as HttpErrors from 'http-errors';
import {RestTags} from './keys';
import {ResolvedRoute, RouteEntry} from './router';

export {Request, Response};
export {HttpErrors};

/**
 * An object holding HTTP request, response and other data
 * needed to handle an incoming HTTP request.
 */
export interface HandlerContext {
  readonly request: Request;
  readonly response: Response;
}

/**
 * Find a route matching the incoming request.
 * Throw an error when no route was found.
 */
export type FindRoute = (request: Request) => ResolvedRoute;

/**
 * Parse parameters for an OpenAPI operation
 */
export type ParseParams = (
  request: Request,
  route: ResolvedRoute,
) => Promise<OperationArgs>;

/**
 * Invokes a method defined in the Application Controller
 *
 * @param controller - Name of end-user's application controller
 *  class which defines the methods.
 * @param method - Method name in application controller class
 * @param args - Operation arguments for the method
 * @returns OperationRetval Result from method invocation
 */
export type InvokeMethod = (
  route: RouteEntry,
  args: OperationArgs,
) => Promise<OperationRetval>;

/**
 * Send the operation response back to the client.
 *
 * @param response - The response the response to send to.
 * @param result - The operation result to send.
 */
export type Send = (response: Response, result: OperationRetval) => void;

/**
 * Reject the request with an error.
 *
 * @param handlerContext - The context object holding HTTP request, response
 * and other data  needed to handle an incoming HTTP request.
 * @param err - The error.
 */
export type Reject = (handlerContext: HandlerContext, err: Error) => void;

/**
 * Log information about a failed request.
 *
 * @param err - The error reported by request handling code.
 * @param statusCode - Status code of the HTTP response
 * @param request - The request that failed.
 */
export type LogError = (
  err: Error,
  statusCode: number,
  request: Request,
) => void;

/**
 * Options for request body validation using AJV
 */
export interface RequestBodyValidationOptions extends ajv.Options {
  /**
   * Custom cache for compiled schemas by AJV. This setting makes it possible
   * to skip the default cache.
   */
  compiledSchemaCache?: WeakMap<
    SchemaObject | ReferenceObject,
    ajv.ValidateFunction
  >;
}

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Options for request body parsing
 * See https://github.com/expressjs/body-parser/#options
 *
 * Built-in parsers retrieve their own options from the request body parser
 * options. The parser specific properties override common ones.
 */
export interface RequestBodyParserOptions extends Options {
  /**
   * Options for json parser
   */
  json?: OptionsJson;
  /**
   * Options for urlencoded parser
   */
  urlencoded?: OptionsUrlencoded;
  /**
   * Options for text parser
   */
  text?: OptionsText;
  /**
   * Options for raw parser
   */
  raw?: Options;
  /**
   * Validation options for AJV, see https://github.com/epoberezkin/ajv#options
   * This setting is global for all request body parsers and it cannot be
   * overridden inside parser specific properties such as `json` or `text`.
   */
  validation?: RequestBodyValidationOptions;
  /**
   * Common options for all parsers
   */
  [name: string]: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PathParameterValues = {[key: string]: any};
export type OperationArgs = InvocationArgs;

/**
 * Return value of a controller method (a function implementing an operation).
 * This is a type alias for "any", used to distinguish
 * operation results from other "any" typed values.
 */
export type OperationRetval = InvocationResult;

/**
 * Http context for each request/response
 */
export type HttpContext = HandlerContext & Context;

/**
 * Action for REST request/response processing sequence
 */
export interface RestAction {
  action: GenericInterceptor<HandlerContext & Context>;
}

/**
 * A binding template to configure an action
 * @param phase
 */
export function asRestAction(phase?: string) {
  const template: BindingTemplate = binding => {
    binding.tag(RestTags.ACTION);
    if (phase) binding.tag({[RestTags.ACTION_PHASE]: phase});
  };
  return template;
}

/**
 * `@restAction` decorator to mark a provider class as RestAction
 * @param phase - Phase name
 * @param specs - Binding specs
 */
export function restAction(phase?: string, ...specs: BindingSpec[]) {
  return bind(asRestAction(phase), ...specs);
}
