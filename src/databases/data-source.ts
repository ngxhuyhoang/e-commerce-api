import { SnakeNamingStrategy } from './snake-naming.strategy';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
});

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  extra: { charset: 'utf8mb4_unicode_ci' },
  entities: ['dist/**/*.entity{.ts,.js}'],
  subscribers: ['dist/**/*.subscriber{.ts,.js}'],
  migrations: ['dist/databases/migrations/**/*{.ts,.js}'],
  logging: true,
  migrationsTableName: '__migrations',
  namingStrategy: new SnakeNamingStrategy(),
  // autoLoadEntities: false,
});

dataSource
  .initialize()
  .then(() => {
    console.info('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.info('Error during Data Source initialization', error);
  });

export default dataSource;
