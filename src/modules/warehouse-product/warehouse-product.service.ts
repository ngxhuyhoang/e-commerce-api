import { Injectable } from '@nestjs/common';

@Injectable()
export class WarehouseProductService {
  create() {
    return 'This action adds a new warehouseProduct';
  }

  findAll() {
    return `This action returns all warehouseProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} warehouseProduct`;
  }

  update(id: number) {
    return `This action updates a #${id} warehouseProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} warehouseProduct`;
  }
}
