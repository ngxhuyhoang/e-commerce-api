import { Injectable } from '@nestjs/common';
import { CreateWarehouseProductDto } from './dto/create-warehouse-product.dto';
import { UpdateWarehouseProductDto } from './dto/update-warehouse-product.dto';

@Injectable()
export class WarehouseProductService {
  create(createWarehouseProductDto: CreateWarehouseProductDto) {
    return 'This action adds a new warehouseProduct';
  }

  findAll() {
    return `This action returns all warehouseProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} warehouseProduct`;
  }

  update(id: number, updateWarehouseProductDto: UpdateWarehouseProductDto) {
    return `This action updates a #${id} warehouseProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} warehouseProduct`;
  }
}
