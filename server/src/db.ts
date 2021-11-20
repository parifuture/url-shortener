import 'reflect-metadata';
import { createConnection, ConnectionOptions, Connection } from 'typeorm';
import { ShortCode } from './entities/ShortCode';

export const createConnectionConfig = (): ConnectionOptions => {
  const coreOptions: ConnectionOptions = {
    name: 'default',
    type: 'sqlite',
    // database: ':memory:',
    database: 'src/../data/url.sqlite',
    entities: [ShortCode],
    migrations: [`${__dirname}/migrations/*.js`],
    cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/migrations',
    },
    logging: ['warn', 'error'],
    synchronize: true,
  };
  return coreOptions;
};

export const createPostgresConnectionConfig = (): ConnectionOptions => {
  const coreOptions: ConnectionOptions = {
    host: 'localhost',
    port: 5432,
    password: '',
    database: 'url',
    name: 'default',
    type: 'postgres',
    entities: [ShortCode],
    migrations: [`${__dirname}/migrations/*.js`],
    cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/migrations',
    },
    logging: ['warn', 'error'],
    synchronize: true,
  };
  return coreOptions;
};

export const init = async (): Promise<Connection> => createConnection(createConnectionConfig());
