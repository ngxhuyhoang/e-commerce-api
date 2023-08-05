import { PartialType } from '@nestjs/swagger';
import { CreateWarehouseProductDto } from './create-warehouse-product.dto';

export class UpdateWarehouseProductDto extends PartialType(CreateWarehouseProductDto) {}
