import { ShortCode } from '../entities/ShortCode';
import * as shortCodeModel from '../model/shortCode.model';
import { intToRadix64 } from '../utils/math';

export async function createShortCodeForUrl(longUrl: string): Promise<ShortCode> {
  const randomCode = Math.floor(Math.random() * 9999999);
  const shortCode = intToRadix64(randomCode);

  // check if shortcode already exists in db
  const fetchedEntry = await shortCodeModel.getByShortCode(shortCode);
  if (fetchedEntry === undefined) {
    // if shortcode does not exists create new entry and return created shortcode
    return shortCodeModel.create({ shortCode, longUrl });
  }
  // if shortcode exists, recursively call createShortCodeForUrl until no collision is found
  return createShortCodeForUrl(longUrl);
}

export interface GetShorttUrlsOptions {
  limit?: number;
  offset?: number;
}

export async function getShortCodes(opts?: GetShorttUrlsOptions) {
  console.log('info::shortenerController:getShortCodes');
  const fetchedData = await shortCodeModel.getAllUrls(opts?.limit, opts?.offset);
  const result = {
    limit: 10,
    offset: 0,
    data: fetchedData,
    ...opts,
  };
  return result;
}

export async function fetchUrl(shortCode: string): Promise<string> {
  console.log('info::shortenerController:fetchUrl');
  const fetchedData = await shortCodeModel.getByShortCode(shortCode);
  if (fetchedData === undefined) {
    throw new Error('Shortcode not found');
  }
  return fetchedData?.longUrl;
}

// performs a soft delete of the shortcode
export async function deleteUrl(shortCode: string): Promise<void> {
  console.log('info::shortenerController:deleteUrl');
  await shortCodeModel.deactivateShortCode(shortCode);
}
