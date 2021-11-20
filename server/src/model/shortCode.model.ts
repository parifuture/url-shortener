/* istanbul ignore next */
import { getConnection } from 'typeorm';
import { ShortCodeCreationOptions, ShortCode } from '../entities/ShortCode';

export async function create(opts: ShortCodeCreationOptions): Promise<ShortCode> {
  const orm = await getRepository();
  let fetchedUrl = await getByShortCode(opts.shortCode);
  if (fetchedUrl === undefined) {
    fetchedUrl = await orm.save(opts);
  }
  return fetchedUrl;
}

export async function getById(id: number): Promise<ShortCode | undefined> {
  const orm = await getRepository();
  return orm.findOne({ id });
}

export async function getByShortCode(shortCode: string): Promise<ShortCode | undefined> {
  const orm = await getRepository();
  return orm.findOne({ where: [{ shortCode, active: true }] });
}

export async function getAllUrls(limit = 10, offset = 0): Promise<ShortCode[]> {
  const shortCodes = await getRepository();
  return shortCodes
    .createQueryBuilder('shortcode')
    .where('active = :active', { active: true })
    .limit(limit)
    .offset(offset)
    .getMany();
}

export async function deactivateShortCode(shortCode: string): Promise<void> {
  const shortCodes = await getRepository();
  await shortCodes.createQueryBuilder().update().set({ active: false }).where({ shortCode }).execute();
}

function getRepository() {
  const connection = getConnection();
  if (!connection.isConnected) {
    throw new Error('Database connection is not established');
  }
  return connection.getRepository(ShortCode);
}