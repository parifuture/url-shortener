import * as bodyParser from 'body-parser';
import * as express from 'express';
import { errorMiddleware } from './middleware/errorMiddleware';

import { addRouting } from './routes';
import { wrapAsync } from './utils/utils';

export function createApp(): express.Express {
  const app = express();

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
  /* -------  Routes that require authentication ------ */
  // app.use(authMiddleware)

  app.get(
    '/status',
    wrapAsync(
      async (_req: express.Request, res: express.Response): Promise<void> => {
        res.json({
          status: 'ok',
        });
      },
    ),
  );

  addRouting(app);
  app.use(errorMiddleware);
  return app;
}
