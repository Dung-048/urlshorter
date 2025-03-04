import 'reflect-metadata';

import type { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';

import { SnakeNamingStrategy } from '../configuration/snake-naming.strategy';

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number.parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dropSchema: false,
  keepConnectionAlive: true,
  namingStrategy: new SnakeNamingStrategy(),
  logging: process.env.NODE_ENV !== 'production',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  seeds: [__dirname + '/seeds/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src',
    subscribersDir: 'subscriber',
  },
} as DataSourceOptions);
