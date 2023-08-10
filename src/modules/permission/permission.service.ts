import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { RoleEntity } from '@modules/role/entities/role.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly _roleRepository: Repository<RoleEntity>,

    @InjectRepository(PermissionEntity)
    private readonly _permissionRepository: Repository<PermissionEntity>,
  ) {}

  async create(body: CreatePermissionDto) {
    try {
      await this._permissionRepository.save(body);
      return 'Thành công';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return `This action returns all permission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }

  async assignToRole(roleId: number) {
    try {
      const existedRole = await this._roleRepository.findOneBy({ id: roleId });
      if (!existedRole) {
        throw new NotFoundException('Role is not exist');
      }
      await this._permissionRepository.save({ roles: [existedRole] });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
