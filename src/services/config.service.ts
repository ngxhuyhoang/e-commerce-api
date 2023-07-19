import { SnakeNamingStrategy } from '@databases/snake-naming.strategy';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class ConfigService {
  get typeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
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
      autoLoadEntities: false,
    };
  }
}
