import { Module } from '@nestjs/common';
import { WarehouseProductService } from './warehouse-product.service';
import { WarehouseProductController } from './warehouse-product.controller';

@Module({
  controllers: [WarehouseProductController],
  providers: [WarehouseProductService],
})
export class WarehouseProductModule {}
