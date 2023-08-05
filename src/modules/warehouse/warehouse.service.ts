import { Injectable } from '@nestjs/common';

@Injectable()
export class WarehouseService {
  create() {
    return 'This action adds a new warehouse';
  }

  findAll() {
    return `This action returns all warehouse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} warehouse`;
  }

  update(id: number) {
    return `This action updates a #${id} warehouse`;
  }

  remove(id: number) {
    return `This action removes a #${id} warehouse`;
  }
}
