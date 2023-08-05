import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { AccountEntity } from '@modules/account/entities/account.entity';
import { ProductEntity } from '@modules/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity, AccountEntity, ProductEntity])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
