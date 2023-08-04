import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RoleEntity } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseResponse } from '@common/base-response.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly _roleRepository: Repository<RoleEntity>,
  ) {}

  async create() {
    try {
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const result = await this._roleRepository.find();
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const result = await this._roleRepository.findOne({ where: { id } });
      if (!result) throw new BadRequestException('Role not found');
      return new BaseResponse<RoleEntity>(result, { page: 1 });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  update(id: number) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
