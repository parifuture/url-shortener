/* istanbul ignore next */
import { Request, Response, Router } from 'express';
import { validate } from 'express-validation';

import * as shortnerSchema from '../schemas/shortner';
import { wrapAsync } from '../utils/utils';
import * as shortenerController from '../controllers/shortener.controller';

export const ROUTER: Router = Router();

ROUTER.post(
  '/',
  validate({
    body: shortnerSchema.PostCreateShortUrlBodySchema.required(),
  }),
  wrapAsync(
    async (req: Request, res: Response): Promise<void> => {
      const payload = req.body;

      const createdEntry = await shortenerController.createShortCodeForUrl(payload.url);
      res.status(200).send(createdEntry);
    },
  ),
);

ROUTER.get(
  '/:id',
  validate({
    params: shortnerSchema.ShortCodeIdParamsSchema.required(),
  }),
  wrapAsync(
    async (req: Request, res: Response): Promise<void> => {
      const shortCode = req.params.id;

      const fetchedUrl = await shortenerController.fetchUrl(shortCode);
      res.redirect(fetchedUrl);
    },
  ),
);

ROUTER.get(
  '/',
  validate({
    query: shortnerSchema.GetShortCodesQuerySchema.required(),
  }),
  wrapAsync(
    async (req: Request, res: Response): Promise<void> => {
      const query = req.query as shortenerController.GetShorttUrlsOptions;

      const fetchedUrl = await shortenerController.getShortCodes(query);
      res.status(200).send(fetchedUrl);
    },
  ),
);

ROUTER.delete(
  '/:id',
  validate({
    params: shortnerSchema.ShortCodeIdParamsSchema.required(),
  }),
  wrapAsync(
    async (req: Request, res: Response): Promise<void> => {
      const shortCode = req.params.id;

      await shortenerController.deleteUrl(shortCode);
      res.status(204).send();
    },
  ),
);
