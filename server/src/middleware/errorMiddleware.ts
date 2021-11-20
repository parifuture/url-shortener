/* istanbul ignore next */
import * as express from 'express';
import { ValidationError } from 'express-validation';

const GENERIC_ERROR = 'Internal Server Error';

function getErrorStatus(err: Error): number {
  if (err instanceof ValidationError) {
    return err.statusCode;
  }
  return 500;
}

function getErrorMessage(err: Error, errorStatus: number): string {
  if (errorStatus === 500) {
    return GENERIC_ERROR;
  }
  if (err instanceof ValidationError) {
    return err.message;
  }
  return GENERIC_ERROR;
}

export function errorMiddleware(
  err: Error,
  req: express.Request,
  res: express.Response,
  // eslint-disable-next-line no-unused-vars
  _next: express.NextFunction,
): void {
  const logErrorMessage = `Error with API call at route ${req.path}: `;
  const logMessageDetails = err;
  console.error(logErrorMessage, logMessageDetails);

  const errorStatus = getErrorStatus(err);
  const errorMessage = getErrorMessage(err, errorStatus);

  res.status(errorStatus).send(errorMessage);
}
