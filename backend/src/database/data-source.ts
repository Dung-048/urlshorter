import 'reflect-metadata';
import { DataSource } from 'typeorm';
import type { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from '../configuration/snake-naming.strategy';

// Load biến môi trường từ .env
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any, // TypeORM yêu cầu kiểu cụ thể, nên cần ép kiểu
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number.parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dropSchema: false,
  keepConnectionAlive: true,
  namingStrategy: new SnakeNamingStrategy(),
  logging: process.env.NODE_ENV !== 'production',
  entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '/migrations/**/*{.ts,.js}')],
  seeds: [path.join(__dirname, '/seeds/*{.ts,.js}')],
  cli: {
    entitiesDir: 'src',
    subscribersDir: 'subscriber',
  },
} as DataSourceOptions);
