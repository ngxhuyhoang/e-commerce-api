import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '@databases/type-orm-config.service';
import { AccountModule } from './modules/account/account.module';
import { ProfileModule } from './modules/profile/profile.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { ProductModule } from './modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.development', '.env.production', '.env.staging'] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: TypeOrmConfigService,
    }),
    AccountModule,
    ProfileModule,
    RoleModule,
    PermissionModule,
    ProductModule,
    CartModule,
  ],
})
export class AppModule {}
