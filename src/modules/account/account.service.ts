import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
  create() {
    return 'This action adds a new account';
  }

  findAll() {
    return `This action returns all account`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
