import { Application } from 'express';

import * as shortener from './shortener.router';

function addRouting(app: Application): void {
  app.use('/api/shortener', shortener.ROUTER);
}

export { addRouting };
