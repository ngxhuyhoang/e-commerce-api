import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RoleEntity } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseResponse } from '@common/base-response.dto';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly _roleRepository: Repository<RoleEntity>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      const result = await this._roleRepository.save({
        name: createRoleDto.name,
        permissions: createRoleDto.permissions,
      });
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const [result, count] = await this._roleRepository.findAndCount();
      return new BaseResponse<RoleEntity>(result, { page: 1, totalRecord: count });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const result = await this._roleRepository.findOne({ where: { id } });
      if (!result) throw new BadRequestException('Role not found');
      return new BaseResponse<RoleEntity>(result, { page: 1, totalRecord: 1 });
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
