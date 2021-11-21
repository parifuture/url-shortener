/* istanbul ignore next */
import * as Joi from '@hapi/joi';

export const PostCreateShortUrlBodySchema = Joi.object({
  url: Joi.string().uri().label('url').required(),
}).unknown(false);

export const GetShortCodesQuerySchema = Joi.object({
  pageIndex: Joi.number().integer().min(0).required(),
  pageSize: Joi.number().integer().min(0).required(),
}).unknown(false);

export const ShortCodeIdParamsSchema = Joi.object({
  id: Joi.string().required(),
}).unknown(false);
