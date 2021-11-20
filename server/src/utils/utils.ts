/* istanbul ignore next */
import * as express from 'express';

// eslint-disable-next-line @typescript-eslint/ban-types
export function wrapAsync(fn: Function): express.RequestHandler {
  return function (req: express.Request, res: express.Response, next: express.NextFunction): void {
    // tslint:disable-next-line: no-unsafe-any
    fn(req, res, next).catch(next);
  };
}
